<template>
  <v-container fluid>
    <v-toolbar dense>
      <v-toolbar-title>Edit Lot</v-toolbar-title>
      <v-spacer />
      <v-toolbar-items>
        <v-btn @click="cancel" text color="primary">Cancel</v-btn>
        <v-btn @click="reset" text color="primary">Reset</v-btn>
        <v-btn @click="submit" text :disabled="!valid" color="primary">Save</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-card class="mt-4 px-4">
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
            label="Provider"
            v-model="providerId"
            :items="providers"
            item-text="name"
            item-value="id"
            :rules="providerRules"
            dense
          />
          <v-text-field label="Name" v-model="name" :rules="nameRules" />
          <v-text-field label="Catalog Number" v-model="reference" :rules="referenceRules" />
          <v-text-field label="Lot Number" v-model="number" :rules="numberRules" />
          <v-text-field label="URL" v-model="url" :rules="urlRules" />
          <v-text-field label="Purpose" v-model="purpose" :rules="purposeRules" />
          <v-text-field label="Price" v-model="price" />
          <v-text-field label="Note" v-model="note" />
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { required } from "@/utils/validators";
import { Component, Vue } from "vue-property-decorator";
import { cloneModule } from "@/modules/clone";
import { groupModule } from "@/modules/group";
import { lotModule } from "@/modules/lot";
import { UpdateLotDto } from "@airlab/shared/lib/lot/dto";
import { providerModule } from "@/modules/provider";

@Component
export default class EditLot extends Vue {
  readonly groupContext = groupModule.context(this.$store);
  readonly lotContext = lotModule.context(this.$store);
  readonly cloneContext = cloneModule.context(this.$store);
  readonly providerContext = providerModule.context(this.$store);

  readonly cloneRules = [required];
  readonly nameRules = [required];
  readonly referenceRules = [required];
  readonly providerRules = [required];
  readonly numberRules = [required];
  readonly urlRules = [];
  readonly purposeRules = [];

  valid = false;
  cloneId: number | null = null;
  name = "";
  reference = "";
  providerId: number | null = null;
  number = "Pending";
  url: string | null = null;
  purpose: string | null = null;
  price: string | null = null;
  note: string | null = null;

  get activeGroupId() {
    return this.groupContext.getters.activeGroupId;
  }

  get clones() {
    return this.cloneContext.getters.clones;
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
      this.name = this.lot.name;
      this.reference = this.lot.reference;
      this.providerId = this.lot.providerId;
      this.number = this.lot.number;
      this.url = this.lot.url;
      this.purpose = this.lot.purpose;
      this.price = this.lot.price;
      this.note = this.lot.note;
    }
  }

  async submit() {
    if ((this.$refs.form as any).validate() && this.lot) {
      const data: UpdateLotDto = {
        cloneId: Number(this.cloneId),
        name: this.name,
        reference: this.reference,
        providerId: Number(this.providerId),
        number: this.number,
        url: this.url,
        purpose: this.purpose,
        price: this.price,
        note: this.note,
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
      this.providerContext.actions.getGroupProviders(+this.$router.currentRoute.params.groupId),
    ]);
    this.reset();
  }
}
</script>
