<template>
  <v-container fluid>
    <v-toolbar dense>
      <v-toolbar-title>
        Create Lot
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
        <v-form v-model="valid" ref="form" lazy-validation>
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
  readonly linkRules = [];
  readonly purposeRules = [];

  valid = false;
  cloneId: number | null = null;
  reagentId: number | null = null;
  providerId: number | null = null;
  number = "Pending";
  link: string | null = null;
  purpose: string | null = null;
  price: string | null = null;
  note: string | null = null;

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
    this.link = null;
    this.purpose = null;
    this.price = null;
    this.note = null;
    (this.$refs.form as any).resetValidation();
  }

  async mounted() {
    await Promise.all([
      this.cloneContext.actions.getGroupClones(+this.$router.currentRoute.params.groupId),
      this.reagentContext.actions.getGroupReagents(+this.$router.currentRoute.params.groupId),
      this.providerContext.actions.getGroupProviders(+this.$router.currentRoute.params.groupId),
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
        link: this.link,
        purpose: this.purpose,
        price: this.price,
        note: this.note,
      };
      await this.lotContext.actions.createLot(data);
      this.$router.back();
    }
  }
}
</script>
