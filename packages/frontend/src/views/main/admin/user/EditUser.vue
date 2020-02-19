<template>
  <v-container fluid>
    <v-toolbar dense>
      <v-toolbar-title>
        Edit User
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
          <v-form v-model="valid" ref="form">
            <v-text-field label="Name" v-model="name" />
            <v-text-field label="E-mail" type="email" v-model="email" :rules="emailRules" />
            <v-checkbox label="Active" v-model="isActive" />
            <v-checkbox label="Admin" v-model="isAdmin" />
            <v-row align="center">
              <v-col class="shrink">
                <v-checkbox v-model="setPassword" />
              </v-col>
              <v-col>
                <v-text-field
                  :disabled="!setPassword"
                  type="password"
                  ref="password"
                  label="Set Password"
                  :rules="password1Rules"
                  v-model="password1"
                >
                </v-text-field>
                <v-text-field
                  v-show="setPassword"
                  type="password"
                  label="Confirm Password"
                  :rules="password2Rules"
                  v-model="password2"
                >
                </v-text-field>
              </v-col>
            </v-row>
          </v-form>
        </template>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { userModule } from "@/modules/user";
import { email, required } from "@/utils/validators";
import { Component, Vue } from "vue-property-decorator";
import { UpdateUserDto } from "@airlab/shared/lib/user/dto";

@Component
export default class EditUser extends Vue {
  readonly userContext = userModule.context(this.$store);

  readonly emailRules = [required, email];
  readonly password1Rules = [this.passwordRequired];
  readonly password2Rules = [this.passwordRequired, this.passwordIsEqual];

  passwordRequired(v) {
    return this.setPassword && !v ? "Required" : true;
  }

  passwordIsEqual(v) {
    return this.setPassword && v !== this.password1 ? "Password should be the same" : true;
  }

  valid = true;
  name = "";
  email = "";
  isActive = false;
  isAdmin = false;
  setPassword = false;
  password1 = "";
  password2 = "";

  async mounted() {
    await this.userContext.actions.getUser(+this.$router.currentRoute.params.id);
    this.reset();
  }

  reset() {
    this.setPassword = false;
    this.password1 = "";
    this.password2 = "";
    if (this.user) {
      this.email = this.user.email;
      this.name = this.user.name;
      this.isActive = this.user.isActive;
      this.isAdmin = this.user.isAdmin;
    }
    if (this.$refs.form) {
      (this.$refs.form as any).resetValidation();
    }
  }

  cancel() {
    this.$router.back();
  }

  async submit() {
    if ((this.$refs.form as any).validate()) {
      const data: UpdateUserDto = {
        email: this.email,
        name: this.name,
        password: this.password1,
        isActive: this.isActive,
        isAdmin: this.isAdmin,
      };
      await this.userContext.actions.updateUser({
        id: this.user!.id,
        user: data,
      });
      this.$router.back();
    }
  }

  get user() {
    return this.userContext.getters.getUser(+this.$router.currentRoute.params.id);
  }
}
</script>
