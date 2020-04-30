<template>
  <LoadingView v-if="!tag" text="Loading tag details..." />
  <v-card v-else tile elevation="1">
    <v-card-text>
      <div><span class="subheader">ID: </span>{{ tag.id }}</div>
      <div><span class="subheader">Name: </span>{{ tag.name }}</div>
      <div><span class="subheader" v-if="tag.isMetal">MW: </span>{{ tag.mw }}</div>
      <div><span class="subheader" v-if="tag.isFluorophore">Emission: </span>{{ tag.emission }}</div>
      <div><span class="subheader" v-if="tag.isFluorophore">Excitation: </span>{{ tag.excitation }}</div>
      <div><span class="subheader">Created: </span>{{ new Date(tag.createdAt).toUTCString() }}</div>
      <v-checkbox label="Metal" v-model="tag.isMetal" readonly hide-details />
      <v-checkbox label="Fluorophore" v-model="tag.isFluorophore" readonly hide-details />
      <v-checkbox label="Enzyme" v-model="tag.isEnzyme" readonly hide-details />
      <v-checkbox label="Biotin" v-model="tag.isBiotin" readonly hide-details />
      <v-checkbox label="Other" v-model="tag.isOther" readonly hide-details />
      <div><span class="subheader">Description: </span>{{ tag.description }}</div>
    </v-card-text>
    <v-card-actions>
      <v-btn
        color="primary"
        text
        :to="{
          name: 'main-group-tags-edit',
          params: {
            groupId: activeGroupId,
            id: tag.id,
          },
        }"
      >
        Edit
      </v-btn>
      <v-btn v-if="isGroupAdmin" color="secondary" text @click="deleteTag()">
        Delete
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { groupModule } from "@/modules/group";
import LoadingView from "@/components/LoadingView.vue";
import { tagModule } from "@/modules/tag";

@Component({
  components: { LoadingView },
})
export default class TagView extends Vue {
  private readonly groupContext = groupModule.context(this.$store);
  private readonly tagContext = tagModule.context(this.$store);

  @Prop({
    type: Number,
    required: true,
  })
  readonly tagId!: number;

  private get isGroupAdmin() {
    return this.groupContext.getters.isGroupAdmin;
  }

  private get activeGroupId() {
    return this.groupContext.getters.activeGroupId;
  }

  private get tag() {
    return this.tagContext.getters.getTag(this.tagId);
  }

  private async deleteTag() {
    if (self.confirm("Are you sure you want to delete the tag?")) {
      await this.tagContext.actions.deleteTag(this.tagId);
    }
  }

  async mounted() {
    await this.tagContext.actions.getTag(this.tagId);
  }
}
</script>

<style scoped>
.subheader {
  font-weight: bold;
}
</style>
