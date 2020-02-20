<template>
  <v-card flat>
    <v-card-title>Tag: {{ tag.name }}</v-card-title>
    <v-card-subtitle>Conjugates</v-card-subtitle>
    <v-card-text>
      <div v-for="conjugate in conjugates" :key="conjugate.id" class="item-view">
        <ConjugateView :group-id="activeGroupId" :conjugate="conjugate" />
      </div>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { TagDto } from "@airlab/shared/lib/tag/dto";
import { groupModule } from "@/modules/group";
import { ConjugateDto } from "@airlab/shared/lib/conjugate/dto";
import { tagModule } from "@/modules/tag";
import ConjugateView from "@/views/main/group/conjugates/ConjugateView.vue";

@Component({
  components: { ConjugateView },
})
export default class TagDetailsView extends Vue {
  readonly groupContext = groupModule.context(this.$store);
  readonly tagContext = tagModule.context(this.$store);

  @Prop({
    type: Object,
    required: true,
  })
  readonly tag!: TagDto;

  conjugates: ConjugateDto[] = [];

  get activeGroupId() {
    return this.groupContext.getters.activeGroupId;
  }

  async mounted() {
    this.conjugates = await this.tagContext.actions.getTagConjugates(this.tag.id);
  }
}
</script>

<style scoped>
.item-view {
  margin-bottom: 10px;
}
</style>
