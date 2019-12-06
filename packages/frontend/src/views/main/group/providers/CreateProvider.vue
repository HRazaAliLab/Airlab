<template>
  <v-container fluid>
    <v-card class="ma-4 pa-4">
      <v-card-title primary-title>
        <div class="headline primary--text">Create Provider</div>
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
import { CreateProviderDto } from "@airlab/shared/lib/provider/dto";
import { groupModule } from "@/modules/group";

@Component
export default class CreateProvider extends Vue {
  readonly groupContext = groupModule.context(this.$store);
  readonly providerContext = providerModule.context(this.$store);

  readonly nameRules = [required];

  valid = true;
  name = "";

  get activeGroupId() {
    return this.groupContext.getters.activeGroupId;
  }

  reset() {
    this.name = "";
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
      };
      await this.providerContext.actions.createProvider(data);
      this.$router.back();
    }
  }
}
</script>
