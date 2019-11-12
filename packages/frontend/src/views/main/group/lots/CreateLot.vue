<template>
  <v-container fluid>
    <v-card class="ma-4 pa-4">
      <v-card-title primary-title>
        <div class="headline primary--text">Create Lot</div>
      </v-card-title>
      <v-card-text>
        <template>
          <v-form v-model="valid" ref="form" lazy-validation>
            <v-select
              label="Clone"
              v-model="cloneId"
              :items="clones"
              item-text="name"
              item-value="id"
              :rules="cloneRules"
              dense
            />
            <v-select
              label="Reagent"
              v-model="reagentId"
              :items="reagents"
              item-text="name"
              item-value="id"
              :rules="reagentRules"
              dense
            />
            <v-select
              label="Provider"
              v-model="providerId"
              :items="providers"
              item-text="name"
              item-value="id"
              :rules="providerRules"
              dense
            />
            <v-text-field label="Lot Number" v-model="number" :rules="numberRules" />
            <v-text-field label="Datasheet URL" v-model="url" :rules="urlRules" />
            <v-text-field label="Purpose" v-model="purpose" :rules="purposeRules" />
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
import { cloneModule } from "@/modules/clone";
import { groupModule } from "@/modules/group";
import { reagentModule } from "@/modules/reagent";
import { providerModule } from "@/modules/provider";
import { lotModule } from "@/modules/lot";
import { CreateLotDto } from "@airlab/shared/lib/lot/dto";

@Component
export default class CreateLot extends Vue {
  readonly groupContext = groupModule.context(this.$store);
  readonly lotContext = lotModule.context(this.$store);
  readonly cloneContext = cloneModule.context(this.$store);
  readonly reagentContext = reagentModule.context(this.$store);
  readonly providerContext = providerModule.context(this.$store);

  readonly cloneRules = [required];
  readonly reagentRules = [required];
  readonly providerRules = [required];
  readonly numberRules = [required];
  readonly urlRules = [];
  readonly purposeRules = [];

  valid = false;
  cloneId: number | null = null;
  reagentId: number | null = null;
  providerId: number | null = null;
  number = "Pending";
  url = null;
  purpose = null;

  get activeGroupId() {
    return this.groupContext.getters.activeGroupId;
  }

  get clones() {
    return this.cloneContext.getters.clones;
  }

  get reagents() {
    return this.reagentContext.getters.reagents;
  }

  get providers() {
    return this.providerContext.getters.providers;
  }

  cancel() {
    this.$router.back();
  }

  reset() {
    this.cloneId = null;
    this.reagentId = null;
    this.providerId = null;
    this.number = "Pending";
    this.url = null;
    this.purpose = null;
    (this.$refs.form as any).resetValidation();
  }

  async mounted() {
    await Promise.all([
      this.cloneContext.actions.getAllClonesForUser(),
      this.reagentContext.actions.getAllReagentsForGroup(+this.$router.currentRoute.params.groupId),
      this.providerContext.actions.getProviders(),
    ]);
  }

  async submit() {
    if ((this.$refs.form as any).validate() && this.activeGroupId) {
      const data: CreateLotDto = {
        groupId: this.activeGroupId,
        cloneId: Number(this.cloneId),
        reagentId: Number(this.reagentId),
        providerId: Number(this.providerId),
        number: this.number,
        url: this.url,
        purpose: this.purpose,
      };
      await this.lotContext.actions.createLot(data);
      this.$router.back();
    }
  }
}
</script>
