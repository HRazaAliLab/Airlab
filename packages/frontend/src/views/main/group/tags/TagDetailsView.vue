<template>
  <v-card flat>
    <v-list-item>
      <v-list-item-icon>
        <v-icon>mdi-information-outline</v-icon>
      </v-list-item-icon>
      <v-list-item-content>
        <v-list-item-title>Conjugates</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-card-text>
      <ConjugateView
        v-for="conjugate in conjugates"
        :key="conjugate.id"
        :group-id="activeGroupId"
        :api-url="apiUrl"
        :conjugate="conjugate"
      />
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { TagDto } from "@airlab/shared/lib/tag/dto";
import { groupModule } from "@/modules/group";
import { apiUrl } from "@/env";
import { ConjugateDto } from "@airlab/shared/lib/conjugate/dto";
import { tagModule } from "@/modules/tag";
import ConjugateView from "@/views/main/group/conjugates/ConjugateView.vue";

@Component({
  components: { ConjugateView },
})
export default class TagDetailsView extends Vue {
  readonly groupContext = groupModule.context(this.$store);
  readonly tagContext = tagModule.context(this.$store);
  readonly apiUrl = apiUrl;

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
