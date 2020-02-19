<template>
  <v-container fluid>
    <v-toolbar dense>
      <v-toolbar-title>
        Edit Protein
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
          <v-text-field label="Description" v-model="description" />
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { required } from "@/utils/validators";
import { Component, Vue } from "vue-property-decorator";
import { proteinModule } from "@/modules/protein";
import { UpdateProteinDto } from "@airlab/shared/lib/protein/dto";

@Component
export default class EditProtein extends Vue {
  readonly proteinContext = proteinModule.context(this.$store);

  readonly nameRules = [required];

  valid = false;
  name = "";
  description = "";

  get protein() {
    return this.proteinContext.getters.getProtein(+this.$router.currentRoute.params.id);
  }

  reset() {
    if (this.$refs.form) {
      (this.$refs.form as any).resetValidation();
    }
    if (this.protein) {
      this.name = this.protein.name;
      this.description = this.protein.description;
    }
  }

  cancel() {
    this.$router.back();
  }

  async mounted() {
    await this.proteinContext.actions.getProtein(+this.$router.currentRoute.params.id);
    this.reset();
  }

  async submit() {
    if ((this.$refs.form as any).validate()) {
      const data: UpdateProteinDto = {
        name: this.name,
        description: this.description,
      };
      await this.proteinContext.actions.updateProtein({
        id: this.protein!.id,
        data: data,
      });
      this.$router.back();
    }
  }
}
</script>
