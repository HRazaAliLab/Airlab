<template>
  <v-container fluid>
    <v-toolbar dense>
      <v-toolbar-title>
        Create Reagent
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
        <v-form v-model="valid" ref="form" lazy-validation>
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
import { Component, Vue } from "vue-property-decorator";
import { reagentModule } from "@/modules/reagent";
import { CreateReagentDto } from "@airlab/shared/lib/reagent/dto";
import { groupModule } from "@/modules/group";
import { providerModule } from "@/modules/provider";

@Component
export default class CreateReagent extends Vue {
  readonly groupContext = groupModule.context(this.$store);
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

  get activeGroupId() {
    return this.groupContext.getters.activeGroupId;
  }

  get providers() {
    return this.providerContext.getters.providers;
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
    this.name = "";
    this.reference = "";
    this.providerId = null;
    this.fields = [];
    (this.$refs.form as any).resetValidation();
  }

  async submit() {
    if ((this.$refs.form as any).validate() && this.activeGroupId) {
      const meta = {};
      for (const field of this.fields) {
        if (field.name) {
          meta[field.name] = field.value;
        }
      }
      const data: CreateReagentDto = {
        groupId: this.activeGroupId,
        providerId: Number(this.providerId),
        name: this.name,
        reference: this.reference,
        meta: this.fields.length > 0 ? meta : null,
      };
      await this.reagentContext.actions.createReagent(data);
      this.$router.back();
    }
  }

  async mounted() {
    await this.providerContext.actions.getGroupProviders(+this.$router.currentRoute.params.groupId);
  }
}
</script>
