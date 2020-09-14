<template>
  <v-container fluid>
    <v-card class="ma-4 pa-4">
      <v-card-title primary-title>
        <div class="text-h5 primary--text">Edit User Profile</div>
      </v-card-title>
      <v-card-text>
        <v-form v-model="valid" ref="form" lazy-validation>
          <v-text-field label="Name" v-model="name" />
          <v-text-field label="E-mail" type="email" v-model="email" :rules="emailRules" />
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn @click="cancel">Cancel</v-btn>
        <v-btn @click="reset">Reset</v-btn>
        <v-btn @click="submit" :disabled="!valid">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { mainModule } from "@/modules/main";
import { email, required } from "@/utils/validators";
import { Component, Vue } from "vue-property-decorator";
import { UpdateProfileDto } from "@airlab/shared/lib/user/dto";

@Component
export default class UserProfileEdit extends Vue {
  readonly mainContext = mainModule.context(this.$store);

  readonly emailRules = [required, email];

  valid = true;
  name = "";
  email = "";

  get userProfile() {
    return this.mainContext.getters.userProfile;
  }

  reset() {
    if (this.userProfile) {
      this.name = this.userProfile.name;
      this.email = this.userProfile.email;
    }
  }

  cancel() {
    this.$router.back();
  }

  async submit() {
    if ((this.$refs.form as any).validate()) {
      const updatedProfile: UpdateProfileDto = {
        name: this.name,
        email: this.email,
      };
      await this.mainContext.actions.updateUserProfile(updatedProfile);
      this.$router.push("/main/profile", () => {});
    }
  }

  async mounted() {
    this.reset();
  }
}
</script>
