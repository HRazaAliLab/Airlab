<template>
  <v-card flat>
    <v-card-title>Tag Details</v-card-title>
    <v-card-text>
      <v-tabs v-model="tab">
        <v-tab>Info</v-tab>
        <v-tab-item>
          <TagView :tag-id="tag.id" />
        </v-tab-item>
      </v-tabs>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { TagDto } from "@airlab/shared/lib/tag/dto";
import TagView from "@/views/main/group/tags/TagView.vue";

@Component({
  components: { TagView },
})
export default class TagDetailsView extends Vue {
  @Prop(Object) readonly tag!: TagDto;

  private tab = 0;
}
</script>
