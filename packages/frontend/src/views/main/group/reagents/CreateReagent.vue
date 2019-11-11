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
            <v-text-field label="Description" v-model="description" />
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

@Component
export default class CreateReagent extends Vue {
  readonly reagentContext = reagentModule.context(this.$store);

  readonly nameRules = [required];

  valid = true;
  name = "";
  description = "";

  reset() {
    this.name = "";
    this.description = "";
    (this.$refs.form as any).resetValidation();
  }

  cancel() {
    this.$router.back();
  }

  async submit() {
    if ((this.$refs.form as any).validate()) {
      const data: CreateReagentDto = {
        name: this.name,
      };
      await this.reagentContext.actions.createReagent(data);
      this.$router.back();
    }
  }
}
</script>
