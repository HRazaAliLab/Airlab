<template>
  <v-content>
    <v-container fluid fill-height>
      <v-row align="center" justify="center">
        <v-col xs="12" sm="8" md="4">
          <v-card elevation="12">
            <v-toolbar dark color="primary">
              <v-toolbar-title>{{ appName }} - Password Recovery</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <p class="subtitle-3">
                A password recovery email will be sent to the registered account
              </p>
              <v-form @keyup.enter="submit" v-model="valid" ref="form" @submit.prevent="" lazy-validation>
                <v-text-field
                  @keyup.enter="submit"
                  label="Email"
                  type="text"
                  prepend-icon="mdi-account"
                  v-model="email"
                  :rules="emailRules"
                />
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn @click="cancel">Cancel</v-btn>
              <v-btn @click.prevent="submit" :disabled="!valid">
                Recover Password
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-content>
</template>

<script lang="ts">
import { appName } from "@/env";
import { mainModule } from "@/modules/main";
import { email, required } from "@/utils/validators";
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Login extends Vue {
  readonly mainContext = mainModule.context(this.$store);

  readonly appName = appName;
  readonly emailRules = [required, email];

  valid = true;
  email = "";

  cancel() {
    this.$router.back();
  }

  submit() {
    this.mainContext.actions.passwordRecovery({ username: this.email });
  }
}
</script>
