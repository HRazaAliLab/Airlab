<template>
  <v-container fluid>
    <v-card class="ma-4 pa-4">
      <v-card-title primary-title>
        <div class="headline primary--text">Edit Provider</div>
      </v-card-title>
      <v-card-text>
        <template>
          <v-form v-model="valid" ref="form" lazy-validation>
            <v-text-field label="Name" v-model="name" :rules="nameRules" />
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
import { providerModule } from "@/modules/provider";
import { UpdateProviderDto } from "@airlab/shared/lib/provider/dto";

@Component
export default class EditProvider extends Vue {
  readonly providerContext = providerModule.context(this.$store);

  readonly nameRules = [required];

  valid = true;
  name = "";

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
    }
  }

  cancel() {
    this.$router.back();
  }

  async submit() {
    if ((this.$refs.form as any).validate()) {
      const data: UpdateProviderDto = {
        name: this.name,
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
