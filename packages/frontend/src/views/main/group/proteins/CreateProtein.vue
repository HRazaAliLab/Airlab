<template>
  <v-container fluid>
    <v-card class="ma-4 pa-4">
      <v-card-title primary-title>
        <div class="headline primary--text">Create Protein</div>
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
import { proteinModule } from "@/modules/protein";
import { CreateProteinDto } from "@airlab/shared/lib/protein/dto";

@Component
export default class CreateProtein extends Vue {
  readonly proteinContext = proteinModule.context(this.$store);

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
      const data: CreateProteinDto = {
        name: this.name,
        description: this.description,
      };
      await this.proteinContext.actions.createProtein(data);
      this.$router.back();
    }
  }
}
</script>
