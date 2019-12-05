<template>
  <v-container fluid>
    <v-card class="ma-4 pa-4">
      <v-card-title primary-title>
        <div class="headline primary--text">Edit Conjugate</div>
      </v-card-title>
      <v-card-text>
        <v-form v-model="valid" ref="form">
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
          <v-checkbox label="Is Low" v-model="isLow" />
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
import { groupModule } from "@/modules/group";
import { lotModule } from "@/modules/lot";
import { tagModule } from "@/modules/tag";
import { conjugateModule } from "@/modules/conjugate";
import { UpdateConjugateDto } from "@airlab/shared/lib/conjugate/dto";

@Component
export default class EditConjugate extends Vue {
  readonly groupContext = groupModule.context(this.$store);
  readonly lotContext = lotModule.context(this.$store);
  readonly tagContext = tagModule.context(this.$store);
  readonly conjugateContext = conjugateModule.context(this.$store);

  readonly lotRules = [required];
  readonly tagRules = [required];
  readonly tubeNumberRules = [required];
  readonly concentrationRules = [required];
  readonly descriptionRules = [];

  valid = false;
  lotId: number | null = null;
  tagId: number | null = null;
  tubeNumber: number | null = null;
  concentration = "";
  description = "";
  isLow = false;

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

  get conjugate() {
    return this.conjugateContext.getters.getConjugate(+this.$router.currentRoute.params.id);
  }

  cancel() {
    this.$router.back();
  }

  reset() {
    if (this.$refs.form) {
      (this.$refs.form as any).resetValidation();
    }
    if (this.conjugate) {
      this.lotId = this.conjugate.lotId;
      this.tagId = this.conjugate.tagId;
      this.tubeNumber = this.conjugate.tubeNumber;
      this.concentration = this.conjugate.concentration;
      this.description = this.conjugate.description;
      this.isLow = this.conjugate.isLow;
    }
  }

  async mounted() {
    await Promise.all([
      this.conjugateContext.actions.getConjugate(+this.$router.currentRoute.params.id),
      this.lotContext.actions.getGroupLots(+this.$router.currentRoute.params.groupId),
      this.tagContext.actions.getGroupTags(+this.$router.currentRoute.params.groupId),
    ]);
    this.reset();
  }

  async submit() {
    if ((this.$refs.form as any).validate() && this.conjugate) {
      const data: UpdateConjugateDto = {
        lotId: Number(this.lotId),
        tagId: Number(this.tagId),
        tubeNumber: Number(this.tubeNumber),
        concentration: this.concentration,
        description: this.description,
        isLow: this.isLow,
      };
      await this.conjugateContext.actions.updateConjugate({
        id: this.conjugate.id,
        data: data,
      });
      this.$router.back();
    }
  }
}
</script>
