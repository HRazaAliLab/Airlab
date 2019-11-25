<template>
  <v-container fluid>
    <v-card class="ma-4 pa-4">
      <v-card-title primary-title>
        <div class="headline primary--text">Create Conjugate</div>
      </v-card-title>
      <v-card-text>
        <v-form v-model="valid" ref="form" lazy-validation>
          <v-autocomplete
            label="Lot"
            v-model="lotId"
            :items="lots"
            item-text="number"
            item-value="id"
            :rules="lotRules"
            dense
          />
          <v-autocomplete
            label="Tag"
            v-model="tagId"
            :items="tags"
            item-text="name"
            item-value="id"
            :rules="tagRules"
            dense
          />
          <v-text-field label="Tube Number" v-model.number="tubeNumber" :rules="tubeNumberRules" />
          <v-text-field label="Concentration (in ug/ml)" v-model="concentration" :rules="concentrationRules" />
          <v-text-field label="Description" v-model="description" :rules="descriptionRules" />
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
import { lotModule } from "@/modules/lot";
import { tagModule } from "@/modules/tag";
import { conjugateModule } from "@/modules/conjugate";
import { CreateConjugateDto } from "@airlab/shared/lib/conjugate/dto";
import { groupModule } from "@/modules/group";

@Component
export default class CreateConjugate extends Vue {
  readonly groupContext = groupModule.context(this.$store);
  readonly lotContext = lotModule.context(this.$store);
  readonly tagContext = tagModule.context(this.$store);
  readonly conjugateContext = conjugateModule.context(this.$store);

  readonly lotRules = [required];
  readonly tagRules = [required];
  readonly concentrationRules = [required];
  readonly tubeNumberRules = [required];
  readonly descriptionRules = [];

  valid = false;
  lotId: number | null = null;
  tagId: number | null = null;
  tubeNumber: number | null = null;
  concentration = "";
  description = "";

  get activeGroupId() {
    return this.groupContext.getters.activeGroupId;
  }

  get lots() {
    return this.lotContext.getters.lots;
  }

  get tags() {
    return this.tagContext.getters.tags.map(item => ({
      id: item.id,
      name: item.mw ? item.name + item.mw : item.name,
    }));
  }

  cancel() {
    this.$router.back();
  }

  reset() {
    this.lotId = null;
    this.tagId = null;
    this.tubeNumber = null;
    this.concentration = "";
    this.description = "";
    (this.$refs.form as any).resetValidation();
  }

  async mounted() {
    await Promise.all([
      this.lotContext.actions.getAllLotsForGroup(+this.$router.currentRoute.params.groupId),
      this.tagContext.actions.getTags(),
    ]);
  }

  async submit() {
    if ((this.$refs.form as any).validate() && this.activeGroupId) {
      const data: CreateConjugateDto = {
        groupId: this.activeGroupId,
        lotId: Number(this.lotId),
        tagId: Number(this.tagId),
        tubeNumber: Number(this.tubeNumber),
        concentration: this.concentration,
        description: this.description,
      };
      await this.conjugateContext.actions.createConjugate(data);
      this.$router.back();
    }
  }
}
</script>
