<template>
  <v-container fluid>
    <v-card class="ma-4 pa-4">
      <v-card-title primary-title>
        <div class="headline primary--text">Edit Lot</div>
      </v-card-title>
      <v-card-text>
        <v-form v-model="valid" ref="form">
          <v-autocomplete
            label="Clone"
            v-model="cloneId"
            :items="clones"
            item-text="name"
            item-value="id"
            :rules="cloneRules"
            dense
          />
          <v-autocomplete
            label="Reagent"
            v-model="reagentId"
            :items="reagents"
            item-text="name"
            item-value="id"
            :rules="reagentRules"
            dense
          />
          <v-autocomplete
            label="Provider"
            v-model="providerId"
            :items="providers"
            item-text="name"
            item-value="id"
            :rules="providerRules"
            dense
          />
          <v-text-field label="Lot Number" v-model="number" :rules="numberRules" />
          <v-text-field label="Datasheet Link" v-model="link" :rules="linkRules" />
          <v-text-field label="Purpose" v-model="purpose" :rules="purposeRules" />
        </v-form>
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
import { lotModule } from "@/modules/lot";
import { reagentModule } from "@/modules/reagent";
import { providerModule } from "@/modules/provider";
import { UpdateLotDto } from "@airlab/shared/lib/lot/dto";

@Component
export default class EditLot extends Vue {
  readonly groupContext = groupModule.context(this.$store);
  readonly lotContext = lotModule.context(this.$store);
  readonly cloneContext = cloneModule.context(this.$store);
  readonly reagentContext = reagentModule.context(this.$store);
  readonly providerContext = providerModule.context(this.$store);

  readonly cloneRules = [required];
  readonly reagentRules = [required];
  readonly providerRules = [required];
  readonly numberRules = [required];
  readonly linkRules = [];
  readonly purposeRules = [];

  valid = false;
  cloneId: number | null = null;
  reagentId: number | null = null;
  providerId: number | null = null;
  number = "Pending";
  link: string | null = null;
  purpose: string | null = null;

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

  get lot() {
    return this.lotContext.getters.getLot(+this.$router.currentRoute.params.id);
  }

  cancel() {
    this.$router.back();
  }

  reset() {
    if (this.$refs.form) {
      (this.$refs.form as any).resetValidation();
    }
    if (this.lot) {
      this.cloneId = this.lot.cloneId;
      this.reagentId = this.lot.reagentId;
      this.providerId = this.lot.providerId;
      this.number = this.lot.number;
      this.link = this.lot.link;
      this.purpose = this.lot.purpose;
    }
  }

  async submit() {
    if ((this.$refs.form as any).validate() && this.lot) {
      const data: UpdateLotDto = {
        cloneId: Number(this.cloneId),
        reagentId: Number(this.reagentId),
        providerId: Number(this.providerId),
        number: this.number,
        link: this.link,
        purpose: this.purpose,
      };
      await this.lotContext.actions.updateLot({
        id: this.lot.id,
        data: data,
      });
      this.$router.back();
    }
  }

  async mounted() {
    await Promise.all([
      this.lotContext.actions.getLot(+this.$router.currentRoute.params.id),
      this.cloneContext.actions.getGroupClones(+this.$router.currentRoute.params.groupId),
      this.reagentContext.actions.getGroupReagents(+this.$router.currentRoute.params.groupId),
      this.providerContext.actions.getGroupProviders(+this.$router.currentRoute.params.groupId),
    ]);
    this.reset();
  }
}
</script>
