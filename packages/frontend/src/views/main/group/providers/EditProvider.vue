<template>
  <v-container fluid>
    <v-toolbar dense>
      <v-toolbar-title>Edit Provider</v-toolbar-title>
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
          <v-text-field label="Description" v-model="description" />
          <v-text-field label="URL" v-model="url" :rules="urlRules" />
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { required } from "@/utils/validators";
import { Component, Vue } from "vue-property-decorator";
import { providerModule } from "@/modules/provider";
import { UpdateProviderDto } from "@airlab/shared/lib/provider/dto";

@Component
export default class EditProvider extends Vue {
  readonly providerContext = providerModule.context(this.$store);

  readonly nameRules = [required];
  readonly urlRules = [];

  valid = true;
  name = "";
  description: string | null = null;
  url: string | null = null;

  get provider() {
    return this.providerContext.getters.getProvider(+this.$router.currentRoute.params.id);
  }

  async mounted() {
    await this.providerContext.actions.getProvider(+this.$router.currentRoute.params.id);
    this.reset();
  }

  reset() {
    this.name = "";
    if (this.$refs.form) {
      (this.$refs.form as any).resetValidation();
    }
    if (this.provider) {
      this.name = this.provider.name;
      this.description = this.provider.description;
      this.url = this.provider.url;
    }
  }

  cancel() {
    this.$router.back();
  }

  async submit() {
    if ((this.$refs.form as any).validate()) {
      const data: UpdateProviderDto = {
        name: this.name,
        description: this.description,
        url: this.url,
      };
      await this.providerContext.actions.updateProvider({
        id: this.provider!.id,
        data: data,
      });
      this.$router.back();
    }
  }
}
</script>
