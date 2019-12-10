<template>
  <v-card flat>
    <v-list-item>
      <v-list-item-icon>
        <v-icon>mdi-information-outline</v-icon>
      </v-list-item-icon>
      <v-list-item-content>
        <v-list-item-title>Clone: {{ item.name }}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-card-text>
      <v-tabs v-model="tab">
        <v-tab>Lots</v-tab>
        <v-tab>Validations</v-tab>
        <v-tab-item>
          <LotView v-for="lot in lots" :key="lot.id" :group-id="activeGroupId" :lot="lot" />
        </v-tab-item>
        <v-tab-item>
          <ValidationView
            v-for="validation in validations"
            :key="validation.id"
            :group-id="activeGroupId"
            :validation="validation"
          />
        </v-tab-item>
      </v-tabs>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { cloneModule } from "@/modules/clone";
import { CloneDto } from "@airlab/shared/lib/clone/dto";
import LotView from "@/views/main/group/lots/LotView.vue";
import { LotDto } from "@airlab/shared/lib/lot/dto";
import { groupModule } from "@/modules/group";
import { ValidationDto } from "@airlab/shared/lib/validation/dto";
import ValidationView from "@/views/main/group/validations/ValidationView.vue";
@Component({
  components: { ValidationView, LotView },
})
export default class CloneDetailsView extends Vue {
  readonly groupContext = groupModule.context(this.$store);
  readonly cloneContext = cloneModule.context(this.$store);

  @Prop(Object) readonly item!: CloneDto;

  tab = 0;
  lots: LotDto[] = [];
  validations: ValidationDto[] = [];

  get activeGroupId() {
    return this.groupContext.getters.activeGroupId;
  }

  async mounted() {
    [this.lots, this.validations] = await Promise.all([
      this.cloneContext.actions.getCloneLots(this.item.id),
      this.cloneContext.actions.getCloneValidations(this.item.id),
    ]);
  }
}
</script>
