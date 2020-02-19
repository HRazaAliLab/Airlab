<template>
  <v-container fluid>
    <v-toolbar dense>
      <v-toolbar-title>
        Edit Reagent
      </v-toolbar-title>
      <v-spacer />
      <v-toolbar-items>
        <v-btn @click="cancel" text color="primary">Cancel</v-btn>
        <v-btn @click="reset" text color="primary">Reset</v-btn>
        <v-btn @click="submit" text :disabled="!valid" color="primary">Save</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-card class="mt-4 px-4">
      <v-card-text>
        <v-form v-model="valid" ref="form">
          <v-text-field label="Name" v-model="name" :rules="nameRules" />
          <v-text-field label="Catalog Number" v-model="reference" :rules="referenceRules" />
          <v-autocomplete
            label="Provider"
            v-model="providerId"
            :items="providers"
            item-text="name"
            item-value="id"
            :rules="providerRules"
            dense
          />
          <v-card>
            <v-card-title>Metadata</v-card-title>
            <v-list dense>
              <template v-for="(field, index) in fields">
                <v-list-item dense two-line :key="index">
                  <v-col cols="3">
                    <v-text-field label="Name" v-model="field.name" dense />
                  </v-col>
                  <v-col>
                    <v-text-field label="Value" v-model="field.value" dense />
                  </v-col>
                  <v-col cols="1">
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on }">
                        <v-btn v-on="on" fab x-small color="secondary lighten-3" @click.stop="deleteField(field)">
                          <v-icon>mdi-minus</v-icon>
                        </v-btn>
                      </template>
                      <span>Delete field</span>
                    </v-tooltip>
                  </v-col>
                </v-list-item>
              </template>
            </v-list>
            <v-card-actions>
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-btn v-on="on" fab color="primary lighten-1" @click.stop="addField()" class="ml-4 mb-4">
                    <v-icon>mdi-plus</v-icon>
                  </v-btn>
                </template>
                <span>Add field</span>
              </v-tooltip>
            </v-card-actions>
          </v-card>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { required } from "@/utils/validators";
import { Component, Vue, Watch } from "vue-property-decorator";
import { reagentModule } from "@/modules/reagent";
import { UpdateReagentDto } from "@airlab/shared/lib/reagent/dto";
import { providerModule } from "@/modules/provider";

@Component
export default class EditReagent extends Vue {
  readonly reagentContext = reagentModule.context(this.$store);
  readonly providerContext = providerModule.context(this.$store);

  readonly nameRules = [required];
  readonly referenceRules = [required];
  readonly providerRules = [required];

  valid = false;
  name = "";
  reference = "";
  providerId: number | null = null;

  fields: { name: string; value: any }[] = [];

  get reagent() {
    return this.reagentContext.getters.getReagent(+this.$router.currentRoute.params.id);
  }

  get providers() {
    return this.providerContext.getters.providers;
  }

  @Watch("reagent")
  generateFields() {
    if (this.reagent && this.reagent.meta) {
      const items = Object.entries(this.reagent.meta);
      this.fields = items.map(item => {
        return {
          name: item[0],
          value: item[1],
        };
      });
    } else {
      this.fields = [];
    }
  }

  deleteField(field: { name: string; value: any }) {
    this.fields = this.fields.filter(item => item.name !== field.name);
  }

  addField() {
    this.fields = this.fields.concat({ name: "", value: "" });
  }

  cancel() {
    this.$router.back();
  }

  reset() {
    if (this.$refs.form) {
      (this.$refs.form as any).resetValidation();
    }
    if (this.reagent) {
      this.name = this.reagent.name;
      this.reference = this.reagent.reference;
      this.providerId = this.reagent.providerId;
      this.generateFields();
    }
  }

  async submit() {
    if ((this.$refs.form as any).validate() && this.reagent) {
      const meta = {};
      for (const field of this.fields) {
        if (field.name) {
          meta[field.name] = field.value;
        }
      }
      const data: UpdateReagentDto = {
        name: this.name,
        reference: this.reference,
        providerId: Number(this.providerId),
        meta: this.fields.length > 0 ? meta : null,
      };
      await this.reagentContext.actions.updateReagent({
        id: this.reagent.id,
        data: data,
      });
      this.$router.back();
    }
  }

  async mounted() {
    await Promise.all([
      this.reagentContext.actions.getReagent(+this.$router.currentRoute.params.id),
      this.providerContext.actions.getGroupProviders(+this.$router.currentRoute.params.groupId),
    ]);
    this.reset();
  }
}
</script>
