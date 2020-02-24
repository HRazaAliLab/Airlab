<template>
  <v-card flat>
    <v-card-title>Protein: {{ protein.name }}</v-card-title>
    <v-card-text>
      <v-tabs v-model="tab">
        <v-tab>Clones</v-tab>
        <v-tab v-if="protein.meta">Metadata</v-tab>
        <v-tab-item>
          <div v-for="clone in clones" :key="clone.id" class="mb-3">
            <CloneView :group-id="activeGroupId" :clone="clone" />
          </div>
        </v-tab-item>
        <v-tab-item>
          <InfoView :item="protein" />
        </v-tab-item>
      </v-tabs>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { groupModule } from "@/modules/group";
import CloneView from "@/views/main/group/clones/CloneView.vue";
import { CloneDto } from "@airlab/shared/lib/clone/dto";
import { ProteinDto } from "@airlab/shared/lib/protein/dto";
import { proteinModule } from "@/modules/protein";
import InfoView from "@/components/InfoView.vue";

@Component({
  components: { InfoView, CloneView },
})
export default class ProteinDetailsView extends Vue {
  readonly groupContext = groupModule.context(this.$store);
  readonly proteinContext = proteinModule.context(this.$store);

  @Prop({
    type: Object,
    required: true,
  })
  readonly protein!: ProteinDto;

  tab = 0;
  clones: CloneDto[] = [];

  get activeGroupId() {
    return this.groupContext.getters.activeGroupId;
  }

  async mounted() {
    this.clones = await this.proteinContext.actions.getProteinClones(this.protein.id);
  }
}
</script>
