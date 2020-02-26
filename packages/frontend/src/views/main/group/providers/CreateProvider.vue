<template>
  <v-container fluid>
    <v-toolbar dense>
      <v-toolbar-title>
        Create Provider
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
        <template>
          <v-form v-model="valid" ref="form" lazy-validation>
            <v-text-field label="Name" v-model="name" :rules="nameRules" />
            <v-text-field label="Description" v-model="description" />
            <v-text-field label="URL" v-model="url" :rules="urlRules" />
          </v-form>
        </template>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { required } from "@/utils/validators";
import { Component, Vue } from "vue-property-decorator";
import { providerModule } from "@/modules/provider";
import { CreateProviderDto } from "@airlab/shared/lib/provider/dto";
import { groupModule } from "@/modules/group";

@Component
export default class CreateProvider extends Vue {
  readonly groupContext = groupModule.context(this.$store);
  readonly providerContext = providerModule.context(this.$store);

  readonly nameRules = [required];
  readonly urlRules = [];

  valid = true;
  name = "";
  description: string | null = null;
  url: string | null = null;

  get activeGroupId() {
    return this.groupContext.getters.activeGroupId;
  }

  reset() {
    this.name = "";
    this.description = null;
    this.url = null;
    (this.$refs.form as any).resetValidation();
  }

  cancel() {
    this.$router.back();
  }

  async submit() {
    if ((this.$refs.form as any).validate() && this.activeGroupId) {
      const data: CreateProviderDto = {
        groupId: this.activeGroupId,
        name: this.name,
        description: this.description,
        url: this.url,
      };
      await this.providerContext.actions.createProvider(data);
      this.$router.back();
    }
  }
}
</script>
