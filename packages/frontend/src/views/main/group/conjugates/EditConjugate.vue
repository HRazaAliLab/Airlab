<template>
  <v-container fluid>
    <v-toolbar dense>
      <v-toolbar-title>
        Edit Conjugate
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
        <v-form v-model="valid" ref="form">
          <v-autocomplete
            label="Lot"
            v-model="lotId"
            :items="lots"
            item-text="name"
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
          <v-text-field
            label="Concentration (in µg/mL)"
            v-model.number="concentration"
            :rules="concentrationRules"
            type="number"
          />
          <v-autocomplete
            label="Labeled by"
            v-model="labeledBy"
            :items="members"
            item-text="user.name"
            item-value="id"
            dense
            clearable
            open-on-clear
          />
          <v-text-field label="Description" v-model="description" />
          <v-text-field label="Custom ID" v-model="customId" />
        </v-form>
      </v-card-text>
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
import { memberModule } from "@/modules/member";

@Component
export default class EditConjugate extends Vue {
  readonly groupContext = groupModule.context(this.$store);
  readonly lotContext = lotModule.context(this.$store);
  readonly tagContext = tagModule.context(this.$store);
  readonly conjugateContext = conjugateModule.context(this.$store);
  readonly memberContext = memberModule.context(this.$store);

  readonly lotRules = [required];
  readonly tagRules = [required];
  readonly concentrationRules = [required];
  readonly descriptionRules = [];

  valid = false;
  lotId: number | null = null;
  tagId: number | null = null;
  labeledBy: number | null = null;
  concentration: number | null = null;
  description: string | null = null;
  customId: string | null = null;

  get activeGroupId() {
    return this.groupContext.getters.activeGroupId;
  }

  get lots() {
    return this.lotContext.getters.lots;
  }

  get members() {
    return this.memberContext.getters.members;
  }

  get tags() {
    return this.tagContext.getters.tags.map((item) => ({
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
      this.labeledBy = this.conjugate.labeledBy;
      this.concentration = this.conjugate.concentration;
      this.description = this.conjugate.description;
      this.customId = this.conjugate.customId;
    }
  }

  async mounted() {
    await Promise.all([
      this.conjugateContext.actions.getConjugate(+this.$router.currentRoute.params.id),
      this.lotContext.actions.getGroupLots({ groupId: +this.$router.currentRoute.params.groupId }),
      this.tagContext.actions.getGroupTags(+this.$router.currentRoute.params.groupId),
      this.memberContext.actions.getGroupMembers(+this.$router.currentRoute.params.groupId),
    ]);
    this.reset();
  }

  async submit() {
    if ((this.$refs.form as any).validate() && this.conjugate) {
      const data: UpdateConjugateDto = {
        lotId: Number(this.lotId),
        tagId: Number(this.tagId),
        concentration: this.concentration,
        description: this.description,
        customId: this.customId,
        labeledBy: this.labeledBy ? Number(this.labeledBy) : null,
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
