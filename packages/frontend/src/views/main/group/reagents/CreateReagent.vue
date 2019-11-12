<template>
  <v-container fluid>
    <v-card class="ma-4 pa-4">
      <v-card-title primary-title>
        <div class="headline primary--text">Create Reagent</div>
      </v-card-title>
      <v-card-text>
        <template>
          <v-form v-model="valid" ref="form" lazy-validation>
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

  get activeGroupId() {
    return this.groupContext.getters.activeGroupId;
  }

  get providers() {
    return this.providerContext.getters.providers;
  }

  cancel() {
    this.$router.back();
  }

  reset() {
    this.name = "";
    this.reference = "";
    this.providerId = null;
    (this.$refs.form as any).resetValidation();
  }

  async submit() {
    if ((this.$refs.form as any).validate() && this.activeGroupId) {
      const data: CreateReagentDto = {
        groupId: this.activeGroupId,
        providerId: Number(this.providerId),
        name: this.name,
        reference: this.reference,
      };
      await this.reagentContext.actions.createReagent(data);
      this.$router.back();
    }
  }

  async mounted() {
    await this.providerContext.actions.getProviders();
  }
}
</script>
