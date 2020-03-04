<template>
  <v-container fluid>
    <v-toolbar dense>
      <v-toolbar-title>
        Create Conjugate
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
          <v-text-field label="Description" v-model="description" :rules="descriptionRules" />
        </v-form>
      </v-card-text>
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
import { memberModule } from "@/modules/member";

@Component
export default class CreateConjugate extends Vue {
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
  description = "";

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
    return this.tagContext.getters.tags.map(item => ({
      id: item.id,
      name: item.mw ? item.name + item.mw : item.name,
    }));
  }

  cancel() {
    this.$router.back();
  }

  reset() {
    this.lotId = this.$router.currentRoute.params.lotId ? +this.$router.currentRoute.params.lotId : null;
    this.tagId = null;
    this.labeledBy = null;
    this.concentration = null;
    this.description = "";
    (this.$refs.form as any).resetValidation();
  }

  async mounted() {
    this.reset();
    await Promise.all([
      this.lotContext.actions.getGroupLots(+this.$router.currentRoute.params.groupId),
      this.tagContext.actions.getGroupTags(+this.$router.currentRoute.params.groupId),
      this.memberContext.actions.getGroupMembers(+this.$router.currentRoute.params.groupId),
    ]);
  }

  async submit() {
    if ((this.$refs.form as any).validate() && this.activeGroupId) {
      const data: CreateConjugateDto = {
        groupId: this.activeGroupId,
        lotId: Number(this.lotId),
        tagId: Number(this.tagId),
        concentration: this.concentration ? Number(this.concentration) : null,
        description: this.description,
        labeledBy: this.labeledBy ? Number(this.labeledBy) : null,
      };
      await this.conjugateContext.actions.createConjugate(data);
      this.$router.back();
    }
  }
}
</script>
