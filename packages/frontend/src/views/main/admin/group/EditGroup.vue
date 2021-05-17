<template>
  <v-container fluid>
    <v-toolbar dense>
      <v-toolbar-title>Edit Group</v-toolbar-title>
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
          <v-text-field label="Institution" v-model="institution" />
          <v-text-field label="URL" v-model="url" />
          <v-checkbox label="Public" v-model="isOpen" />
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { required } from "@/utils/validators";
import { Component, Vue } from "vue-property-decorator";
import { groupModule } from "@/modules/group";
import { UpdateGroupDto } from "@airlab/shared/lib/group/dto";

@Component
export default class EditGroup extends Vue {
  readonly groupContext = groupModule.context(this.$store);

  readonly nameRules = [required];

  valid = true;
  name = "";
  institution = "";
  url = "";
  isOpen = false;

  get group() {
    return this.groupContext.getters.getGroup(+this.$router.currentRoute.params.id);
  }

  async mounted() {
    await this.groupContext.actions.getGroup(+this.$router.currentRoute.params.id);
    this.reset();
  }

  reset() {
    this.name = "";
    this.institution = "";
    this.url = "";
    this.isOpen = false;
    if (this.$refs.form) {
      (this.$refs.form as any).resetValidation();
    }
    if (this.group) {
      this.name = this.group.name;
      this.institution = this.group.institution;
      this.url = this.group.url;
      this.isOpen = this.group.isOpen;
    }
  }

  cancel() {
    this.$router.back();
  }

  async submit() {
    if ((this.$refs.form as any).validate()) {
      const data: UpdateGroupDto = {
        name: this.name,
        institution: this.institution,
        url: this.url,
        isOpen: this.isOpen,
      };
      await this.groupContext.actions.updateGroup({
        id: this.group!.id,
        data: data,
      });
      this.$router.back();
    }
  }
}
</script>
