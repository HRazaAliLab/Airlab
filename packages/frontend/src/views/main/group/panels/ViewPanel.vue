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
    <v-toolbar dense class="toolbar">
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
        style="width: 50px;"
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
        <v-menu offset-y>
          <template v-slot:activator="{ on }">
            <v-btn text v-on="on" color="primary">
              Export
            </v-btn>
          </template>
          <v-list>
            <v-list-item @click="exportCsv">
              <v-list-item-title>Export CSV</v-list-item-title>
            </v-list-item>
            <v-divider />
            <v-list-item @click="exportCyTOF1">
              <v-list-item-title>Template for CyTOF1</v-list-item-title>
            </v-list-item>
            <v-list-item @click="exportCyTOF2">
              <v-list-item-title>Template for CyTOF2</v-list-item-title>
            </v-list-item>
            <v-list-item @click="exportHelios">
              <v-list-item-title>Template for Helios</v-list-item-title>
            </v-list-item>
            <v-list-item @click="exportHeliosCsv">
              <v-list-item-title>CSV for Helios</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <v-divider vertical />
        <v-btn
          text
          color="primary"
          :to="{
            name: 'main-group-panels-edit',
            params: {
              groupId: activeGroupId,
              id: panel.id,
            },
          }"
          >Edit</v-btn
        >
        <v-divider vertical />
        <v-btn @click="cancel" text color="primary">Cancel</v-btn>
        <v-btn @click="reset" text color="primary">Reset</v-btn>
        <v-btn @click="submit" text color="primary">Save</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-card v-if="panel">
      <v-card-title primary-title>
        <div class="text-h5 primary--text">{{ panel.name }}</div>
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
        <template v-slot:item.tubeNumber="{ item }">
          <router-link
            class="link"
            :to="{
              name: 'main-group-conjugates-edit',
              params: {
                groupId: activeGroupId,
                id: item.id,
              },
            }"
          >
            <span :class="item.status === 2 ? 'empty' : item.status === 1 ? 'low' : ''">{{ item.tubeNumber }}</span>
          </router-link>
        </template>
        <template v-slot:item.label="{ item }">
          <router-link
            v-if="item.tag"
            class="link"
            :to="{
              name: 'main-group-tags-edit',
              params: {
                groupId: activeGroupId,
                id: item.tag.id,
              },
            }"
          >
            <span :class="item.status === 2 ? 'empty' : item.status === 1 ? 'low' : ''">{{ item.label }}</span>
          </router-link>
        </template>
        <template v-slot:item.protein="{ item }">
          <router-link
            v-if="item.lot && item.lot.clone && item.lot.clone.protein"
            class="link"
            :to="{
              name: 'main-group-proteins-edit',
              params: {
                groupId: activeGroupId,
                id: item.lot.clone.protein.id,
              },
            }"
          >
            <span :class="item.status === 2 ? 'empty' : item.status === 1 ? 'low' : ''">{{
              item.lot.clone.protein.name
            }}</span>
          </router-link>
        </template>
        <template v-slot:item.lot="{ item }">
          <router-link
            v-if="item.lot"
            class="link"
            :to="{
              name: 'main-group-lots-edit',
              params: {
                groupId: activeGroupId,
                id: item.lot.id,
              },
            }"
          >
            <span :class="item.status === 2 ? 'empty' : item.status === 1 ? 'low' : ''">{{ item.lot.number }}</span>
          </router-link>
        </template>
        <template v-slot:item.clone="{ item }">
          <router-link
            v-if="item.lot && item.lot.clone"
            class="link"
            :to="{
              name: 'main-group-clones-edit',
              params: {
                groupId: activeGroupId,
                id: item.lot.clone.id,
              },
            }"
          >
            <span :class="item.status === 2 ? 'empty' : item.status === 1 ? 'low' : ''">{{ item.lot.clone.name }}</span>
          </router-link>
        </template>
        <template v-slot:item.validations="{ item }">
          <v-chip
            v-for="validation in item.validations"
            :key="validation.id"
            :color="getStatusColor(validation)"
            class="mr-1"
            x-small
            dark
            @click="showValidation(validation.id)"
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
          <span :class="item.status === 2 ? 'empty' : item.status === 1 ? 'low' : ''">{{
            getAmountAntibodyText(item)
          }}</span>
        </template>
      </v-data-table>
    </v-card>
    <v-navigation-drawer v-model="drawer" right fixed temporary width="600">
      <ValidationDetailsView v-if="drawer" :validation-id="selectedValidationId" />
    </v-navigation-drawer>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { groupModule } from "@/modules/group";
import { panelModule } from "@/modules/panel";
import { PanelElementDataDto, UpdatePanelDto } from "@airlab/shared/lib/panel/dto";
import MetalExpansionPanel from "@/views/main/group/panels/MetalExpansionPanel.vue";
import { conjugateModule } from "@/modules/conjugate";
import { tagModule } from "@/modules/tag";
import { validationModule } from "@/modules/validation";
import { getStatusColor } from "@/utils/converters";
import {
  exportCSVCyTOF201608,
  exportCyTOF1Panel,
  exportCyTOF2Panel,
  exportHeliosPanel,
  exportPanelCsv,
} from "@/utils/exporters";
import ValidationDetailsView from "@/views/main/group/validations/ValidationDetailsView.vue";

@Component({
  components: { ValidationDetailsView, MetalExpansionPanel },
})
export default class ViewPanel extends Vue {
  readonly groupContext = groupModule.context(this.$store);
  readonly panelContext = panelModule.context(this.$store);
  readonly conjugateContext = conjugateModule.context(this.$store);
  readonly validationContext = validationModule.context(this.$store);
  readonly tagContext = tagModule.context(this.$store);

  readonly getStatusColor = getStatusColor;

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
      text: "Validations",
      value: "validations",
      sortable: false,
    },
    {
      text: "Staining Concentration",
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

  drawer = false;
  selectedValidationId: number | null = null;

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
    if (this.panel && this.panel.elements) {
      const items: any[] = [];
      for (const element of this.panel.elements) {
        const conjugate = this.conjugateContext.getters.getConjugate(element.conjugateId);
        if (conjugate) {
          const validations =
            (conjugate as any).lot && (conjugate as any).lot.clone
              ? this.validations.filter((validation) => (validation as any).clone.id == (conjugate as any).lot.clone.id)
              : [];
          const item = {
            ...conjugate,
            label: (conjugate as any).tag
              ? (conjugate as any).tag.mw
                ? (conjugate as any).tag.name + (conjugate as any).tag.mw
                : (conjugate as any).tag.name
              : "unknown",
            validations: validations,
            actualConcentration: element.concentration,
            dilutionType: element.dilutionType,
            pipet: this.getAmountAntibody({
              dilutionType: element.dilutionType,
              actualConcentration: element.concentration,
              concentration: conjugate.concentration,
            }),
          };
          items.push(item);
        }
      }
      return items;
    }
    return [];
  }

  getAmountAntibody(item) {
    const result =
      item.dilutionType === 1
        ? parseFloat(item.actualConcentration) === 0
          ? 0
          : this.totalVolume / parseFloat(item.actualConcentration)
        : this.totalVolume * (parseFloat(item.actualConcentration) / parseFloat(item.concentration));
    return isNaN(result) ? null : result;
  }

  getAmountAntibodyText(item) {
    const amount = this.getAmountAntibody(item);
    return amount === null ? "" : amount.toFixed(2);
  }

  get diluentVolume() {
    let cum = 0.0;
    for (const item of this.items) {
      if (!item.actualConcentration) continue;
      const add = this.getAmountAntibody(item);
      if (this.excludeEmpty && Number(item.finishedBy) > 0) continue;
      if (add !== null) {
        cum = cum + add;
      }
    }
    return (this.totalVolume - cum).toFixed(2);
  }

  closeEditDialog() {
    // TODO: hack to force update diluted volume. Should be refactored.
    this.excludeEmpty = !this.excludeEmpty;
    this.excludeEmpty = !this.excludeEmpty;
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
      const elements: PanelElementDataDto[] = this.items.map((item) => {
        return {
          conjugateId: Number(item.id),
          dilutionType: item.dilutionType ? Number(item.dilutionType) : 0,
          concentration: item.actualConcentration ? Number(item.actualConcentration) : undefined,
        };
      });
      const data: UpdatePanelDto = {
        elements: elements,
      };
      await this.panelContext.actions.updatePanel({
        id: this.panel.id,
        data: data,
      });
      this.$router.back();
    }
  }

  async exportCsv() {
    exportPanelCsv(this.panel, this.items, this.totalVolume);
  }

  async exportHeliosCsv() {
    exportCSVCyTOF201608(this.panel, this.items);
  }

  async exportCyTOF1() {
    exportCyTOF1Panel(this.panel, this.items);
  }

  async exportCyTOF2() {
    exportCyTOF2Panel(this.panel, this.items);
  }

  async exportHelios() {
    exportHeliosPanel(this.panel, this.items);
  }

  showValidation(id: number) {
    this.selectedValidationId = id;
    this.drawer = !this.drawer;
  }

  async mounted() {
    document.onkeydown = (evt) => {
      if (this.drawer && evt.key === "Escape") {
        this.drawer = false;
      }
    };
    await Promise.all([
      this.panelContext.actions.getPanel(+this.$router.currentRoute.params.id),
      this.conjugateContext.actions.getGroupConjugates(+this.$router.currentRoute.params.groupId),
      this.tagContext.actions.getGroupTags(+this.$router.currentRoute.params.groupId),
      this.validationContext.actions.getGroupValidations(+this.$router.currentRoute.params.groupId),
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
.empty {
  text-decoration: line-through;
}
</style>
