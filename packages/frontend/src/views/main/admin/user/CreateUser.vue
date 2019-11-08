<template>
  <v-container fluid>
    <v-card class="ma-4 pa-4">
      <v-card-title primary-title>
        <div class="headline primary--text">Create User</div>
      </v-card-title>
      <v-card-text>
        <template>
          <v-form v-model="valid" ref="form" lazy-validation>
            <v-text-field label="Name" v-model="name" />
            <v-text-field label="E-mail" type="email" v-model="email" :rules="emailRules" />
            <v-row align="center">
              <v-col>
                <v-text-field
                  type="password"
                  ref="password"
                  label="Set Password"
                  :rules="password1Rules"
                  v-model="password1"
                />
                <v-text-field type="password" label="Confirm Password" :rules="password2Rules" v-model="password2" />
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
import { required, email } from "@/utils/validators";
import { Component, Vue } from "vue-property-decorator";
import { CreateUserDto } from "@airlab/shared/lib/user/dto";

@Component
export default class CreateUser extends Vue {
  readonly userContext = userModule.context(this.$store);

  readonly emailRules = [required, email];
  readonly password1Rules = [required];
  readonly password2Rules = [required, this.passwordIsEqual];

  passwordIsEqual(v) {
    return v === this.password1 || "Password should be the same";
  }

  valid = false;
  name = "";
  email = "";
  password1 = "";
  password2 = "";

  mounted() {
    this.reset();
  }

  reset() {
    this.password1 = "";
    this.password2 = "";
    this.name = "";
    this.email = "";
    (this.$refs.form as any).resetValidation();
  }

  cancel() {
    this.$router.back();
  }

  async submit() {
    if ((this.$refs.form as any).validate()) {
      const updatedProfile: CreateUserDto = {
        email: this.email,
        name: this.name,
        password: this.password1,
      };
      await this.userContext.actions.createUser(updatedProfile);
      this.$router.back();
    }
  }
}
</script>
