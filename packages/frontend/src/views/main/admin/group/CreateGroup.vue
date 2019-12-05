<template>
  <v-container fluid>
    <v-card class="ma-4 pa-4">
      <v-card-title primary-title>
        <div class="headline primary--text">Create Group</div>
      </v-card-title>
      <v-card-text>
        <template>
          <v-form v-model="valid" ref="form" lazy-validation>
            <v-text-field label="Name" v-model="name" :rules="nameRules" />
            <v-text-field label="Institution" v-model="institution" />
            <v-text-field label="URL" v-model="url" />
            <v-checkbox label="Open" v-model="isOpen" />
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
import { groupModule } from "@/modules/group";
import { CreateGroupDto } from "@airlab/shared/lib/group/dto";

@Component
export default class CreateGroup extends Vue {
  readonly groupContext = groupModule.context(this.$store);

  readonly nameRules = [required];

  valid = true;
  name = "";
  institution = "";
  url = null;
  isOpen = false;

  reset() {
    this.name = "";
    this.institution = "";
    this.url = null;
    this.isOpen = false;
    (this.$refs.form as any).resetValidation();
  }

  cancel() {
    this.$router.back();
  }

  async submit() {
    if ((this.$refs.form as any).validate()) {
      const params: CreateGroupDto = {
        name: this.name,
        institution: this.institution,
        url: this.url,
        isOpen: this.isOpen,
      };
      await this.groupContext.actions.createGroup(params);
      this.$router.back();
    }
  }
}
</script>
