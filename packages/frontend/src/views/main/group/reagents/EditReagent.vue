<template>
  <v-container fluid>
    <v-card class="ma-4 pa-4">
      <v-card-title primary-title>
        <div class="headline primary--text">Edit Reagent</div>
      </v-card-title>
      <v-card-text>
        <template>
          <v-form v-model="valid" ref="form">
            <v-text-field label="Name" v-model="name" :rules="nameRules" />
            <v-text-field label="Reference" v-model="reference" :rules="referenceRules" />
            <v-select
              label="Provider"
              v-model="providerId"
              :items="providers"
              item-text="name"
              item-value="id"
              :rules="providerRules"
              dense
            />
          </v-form>
        </template>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn @click="cancel">Cancel</v-btn>
        <v-btn @click="reset">Reset</v-btn>
        <v-btn @click="submit" :disabled="!valid">
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { required } from "@/utils/validators";
import { Component, Vue } from "vue-property-decorator";
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

  get reagent() {
    return this.reagentContext.getters.getReagent(+this.$router.currentRoute.params.id);
  }

  get providers() {
    return this.providerContext.getters.providers;
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
    }
  }

  async mounted() {
    await Promise.all([
      this.reagentContext.actions.getReagent(+this.$router.currentRoute.params.id),
      this.providerContext.actions.getProviders(),
    ]);
    this.reset();
  }

  async submit() {
    if ((this.$refs.form as any).validate() && this.reagent) {
      const data: UpdateReagentDto = {
        name: this.name,
        reference: this.reference,
        providerId: Number(this.providerId),
      };
      await this.reagentContext.actions.updateReagent({
        id: this.reagent.id,
        data: data,
      });
      this.$router.back();
    }
  }
}
</script>
