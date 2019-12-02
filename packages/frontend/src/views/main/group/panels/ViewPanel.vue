<template>
  <v-container fluid>
    <v-tooltip left>
      <template v-slot:activator="{ on }">
        <v-btn v-on="on" v-scroll="onScroll" v-show="fab" fab fixed bottom right color="primary" @click="toTop">
          <v-icon>mdi-chevron-up</v-icon>
        </v-btn>
      </template>
      <span>Scroll to top</span>
    </v-tooltip>
    <v-toolbar class="toolbar">
      <v-toolbar-title class="toolbar-item-margin">
        Panel View
      </v-toolbar-title>
      <v-spacer />
      <v-text-field
        v-model.number="totalVolume"
        label="Total Volume"
        hide-details
        type="number"
        outlined
        dense
        class="toolbar-text-field toolbar-item-margin"
        style="width: 50px"
      />
      <v-text-field
        :value="diluentVolume"
        label="Diluent Volume"
        hide-details
        outlined
        dense
        disabled
        class="toolbar-text-field toolbar-item-margin"
      />
      <v-switch
        v-model="excludeEmpty"
        label="Exclude volume from empty tubes"
        hide-details
        class="toolbar-item-margin"
      />
      <v-toolbar-items>
        <v-divider vertical />
        <v-btn text>Export CSV</v-btn>
        <v-divider vertical />
        <v-btn @click="cancel" text>Cancel</v-btn>
        <v-btn @click="reset" text>Reset</v-btn>
        <v-btn @click="submit" text>Save</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-card v-if="panel">
      <v-card-title primary-title>
        <div class="headline primary--text">{{ panel.name }}</div>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="items"
        :loading="!items"
        :items-per-page="-1"
        hide-default-footer
        disable-filtering
        disable-pagination
      >
        <template v-slot:item.label="{ item }">
          <span v-if="item.tag">{{ item.label }}</span>
        </template>
        <template v-slot:item.lot="{ item }">
          <span v-if="item.lot" :class="item.isLow ? 'low' : ''">{{ item.lot.number }}</span>
        </template>
        <template v-slot:item.clone="{ item }">
          <span v-if="item.lot && item.lot.clone" :class="item.isLow ? 'low' : ''">{{ item.lot.clone.name }}</span>
        </template>
        <template v-slot:item.protein="{ item }">
          <span v-if="item.lot && item.lot.clone && item.lot.clone.protein" :class="item.isLow ? 'low' : ''">{{
            item.lot.clone.protein.name
          }}</span>
        </template>
        <template v-slot:item.validations="{ item }">
          <v-chip
            v-for="validation in item.validations"
            :key="validation.id"
            :color="getStatusColor(validation)"
            class="mr-1"
            x-small
            dark
          >
            {{ validation.application | applicationToString }}
          </v-chip>
        </template>
        <template v-slot:item.actualConcentration="{ item }">
          <v-edit-dialog :return-value.sync="item.name" @close="closeEditDialog">
            {{ item.actualConcentration }}
            <template v-slot:input>
              <v-text-field v-model.number="item.actualConcentration" label="Concentration" single-line type="number" />
            </template>
          </v-edit-dialog>
        </template>
        <template v-slot:item.dilutionType="{ item }">
          <v-edit-dialog :return-value.sync="item.name">
            {{ item.dilutionType === 1 ? "1/__" : "µg/mL" }}
            <template v-slot:input>
              <v-btn-toggle v-model.number="item.dilutionType">
                <v-btn small value="0">
                  µg/mL
                </v-btn>
                <v-btn small value="1">
                  1/__
                </v-btn>
              </v-btn-toggle>
            </template>
          </v-edit-dialog>
        </template>
        <template v-slot:item.pipet="{ item }">
          <span v-if="item.pipet">{{ item.pipet.toFixed(2) }}</span>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { groupModule } from "@/modules/group";
import { panelModule } from "@/modules/panel";
import { UpdatePanelDto } from "@airlab/shared/lib/panel/dto";
import MetalExpansionPanel from "@/views/main/group/panels/MetalExpansionPanel.vue";
import { conjugateModule } from "@/modules/conjugate";
import { tagModule } from "@/modules/tag";
import { validationModule } from "@/modules/validation";
import { ValidationDto } from "@airlab/shared/lib/validation/dto";

@Component({
  components: { MetalExpansionPanel },
})
export default class ViewPanel extends Vue {
  readonly groupContext = groupModule.context(this.$store);
  readonly panelContext = panelModule.context(this.$store);
  readonly conjugateContext = conjugateModule.context(this.$store);
  readonly validationContext = validationModule.context(this.$store);
  readonly tagContext = tagModule.context(this.$store);

  readonly headers = [
    {
      text: "Tube Number",
      value: "tubeNumber",
      align: "end",
    },
    {
      text: "Tag",
      value: "label",
    },
    {
      text: "Lot",
      value: "lot",
      sort: (a, b) => {
        if (a === null) {
          return 1;
        }
        if (b === null) {
          return -1;
        }
        return a.number.localeCompare(b.number);
      },
    },
    {
      text: "Clone",
      value: "clone",
      sort: (a, b) => {
        if (a === null) {
          return 1;
        }
        if (b === null) {
          return -1;
        }
        return a.number.localeCompare(b.number);
      },
    },
    {
      text: "Protein",
      value: "protein",
      sort: (a, b) => {
        if (a === null) {
          return 1;
        }
        if (b === null) {
          return -1;
        }
        return a.number.localeCompare(b.number);
      },
    },
    {
      text: "Validations",
      value: "validations",
      sortable: false,
    },
    {
      text: "Concentration",
      value: "actualConcentration",
    },
    {
      text: "Type",
      value: "dilutionType",
      sortable: false,
    },
    {
      text: "µL to pipet",
      value: "pipet",
    },
  ];

  fab = false;
  excludeEmpty = false;
  totalVolume = 100;

  get activeGroupId() {
    return this.groupContext.getters.activeGroupId;
  }

  get panel() {
    return this.panelContext.getters.getPanel(+this.$router.currentRoute.params.id);
  }

  get validations() {
    return this.validationContext.getters.validations;
  }

  get items() {
    if (this.panel && this.panel.details) {
      const items: any[] = [];
      for (const item of this.panel.details) {
        const conjugateId = Number(item["plaLabeledAntibodyId"]);
        const conjugate = this.conjugateContext.getters.getConjugate(conjugateId);
        if (conjugate) {
          const validations =
            (conjugate as any).lot && (conjugate as any).lot.clone
              ? this.validations.filter(validation => (validation as any).clone.id == (conjugate as any).lot.clone.id)
              : [];
          const actualConcentration = item["plaActualConc"] ? Number(item["plaActualConc"]) : null;
          const dilutionType = item["dilutionType"] ? Number(item["dilutionType"]) : null;
          items.push({
            ...conjugate,
            label: (conjugate as any).tag
              ? (conjugate as any).tag.mw
                ? (conjugate as any).tag.name + (conjugate as any).tag.mw
                : (conjugate as any).tag.name
              : "unknown",
            validations: validations,
            actualConcentration: actualConcentration,
            dilutionType: dilutionType,
          });
        }
      }
      return items;
    }
    return [];
  }

  getStatusColor(validation: ValidationDto) {
    switch (validation.status) {
      case 0:
        return "green lighten-1";
      case 1:
        return "orange lighten-1";
      case 2:
        return "red lighten-1";
      default:
        return "grey";
    }
  }

  getAmountAntibody(item, dilution: boolean) {
    if (dilution) {
      const res = this.totalVolume / parseFloat(item.actualConcentration);
      item.pipet = res;
      return res;
    }
    const res = this.totalVolume * (parseFloat(item.actualConcentration) / parseFloat(item.concentration));
    item.pipet = res;
    return res;
  }

  get diluentVolume() {
    let cum = 0.0;
    for (const item of this.items) {
      if (!item.actualConcentration) continue;
      const add = this.getAmountAntibody(item, item.dilutionType === 1);
      if (this.excludeEmpty && Number(item.finishedBy) > 0) continue;
      if (!isNaN(add)) {
        cum = cum + add;
      }
    }
    return (this.totalVolume - cum).toFixed(2);
  }

  closeEditDialog() {
  }

  onScroll(e) {
    if (typeof window === "undefined") return;
    const top = window.pageYOffset || e.target.scrollTop || 0;
    this.fab = top > 20;
  }

  toTop() {
    this.$vuetify.goTo(0);
  }

  cancel() {
    this.$router.back();
  }

  async reset() {
    if (this.panel) {
      await this.panelContext.actions.getPanel(this.panel.id);
    }
  }

  async submit() {
    if (this.panel) {
      const details = this.items.map(item => {
        return {
          plaLabeledAntibodyId: item.id,
          plaActualConc: item.actualConcentration ? Number(item.actualConcentration) : null,
          dilutionType: item.dilutionType ? Number(item.dilutionType) : null,
          plaPipet: undefined,
        };
      });
      const data: UpdatePanelDto = {
        details: details,
      };
      await this.panelContext.actions.updatePanel({
        id: this.panel.id,
        data: data,
      });
      this.$router.back();
    }
  }

  async mounted() {
    await Promise.all([
      this.panelContext.actions.getPanel(+this.$router.currentRoute.params.id),
      this.conjugateContext.actions.getConjugates(),
      this.tagContext.actions.getTags(),
      this.validationContext.actions.getValidations(),
    ]);
    this.reset();
  }
}
</script>

<style scoped>
.toolbar {
  margin-bottom: 10px;
}
.toolbar-item-margin {
  margin-right: 20px;
}
.toolbar-text-field {
  width: 100px;
}
.low {
  color: red;
}
</style>
