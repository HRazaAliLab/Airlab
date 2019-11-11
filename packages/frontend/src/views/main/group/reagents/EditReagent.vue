<template>
  <v-container fluid>
    <v-card class="ma-4 pa-4">
      <v-card-title primary-title>
        <div class="headline primary--text">Edit Reagent</div>
      </v-card-title>
      <v-card-text>
        <template>
          <v-form v-model="valid" ref="form" lazy-validation>
            <v-text-field label="Name" v-model="name" :rules="nameRules" />
            <v-text-field label="Description" v-model="description" />
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
import { reagentModule } from "@/modules/reagent";
import { UpdateReagentDto } from "@airlab/shared/lib/reagent/dto";

@Component
export default class EditReagent extends Vue {
  readonly reagentContext = reagentModule.context(this.$store);

  readonly nameRules = [required];

  valid = true;
  name = "";
  description = "";

  get reagent() {
    return this.reagentContext.getters.getReagent(+this.$router.currentRoute.params.id);
  }

  reset() {
    if (this.$refs.form) {
      (this.$refs.form as any).resetValidation();
    }
    if (this.reagent) {
      this.name = this.reagent.name;
    }
  }

  cancel() {
    this.$router.back();
  }

  async mounted() {
    await this.reagentContext.actions.getReagent(+this.$router.currentRoute.params.id);
    this.reset();
  }

  async submit() {
    if ((this.$refs.form as any).validate()) {
      const data: UpdateReagentDto = {
        name: this.name,
      };
      await this.reagentContext.actions.updateReagent({
        id: this.reagent!.id,
        data: data,
      });
      this.$router.back();
    }
  }
}
</script>
