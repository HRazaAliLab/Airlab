<template>
  <v-container fluid>
    <v-card class="ma-4 pa-4">
      <v-card-title primary-title>
        <div class="headline primary--text">Edit User</div>
      </v-card-title>
      <v-card-text>
        <template>
          <v-form v-model="valid" ref="form">
            <v-text-field label="Name" v-model="name" />
            <v-text-field label="Last Name" v-model="lastName" />
            <v-text-field label="E-mail" type="email" v-model="email" :rules="emailRules" />
            <v-checkbox label="Active" v-model="active" />
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
  lastName = "";
  email = "";
  active = false;
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
      this.lastName = this.user.lastName;
      this.active = this.user.active;
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
        lastName: this.lastName,
        password: this.password1,
        active: this.active,
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
