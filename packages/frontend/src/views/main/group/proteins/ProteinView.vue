<template>
  <LoadingView v-if="!protein" text="Loading protein details..." />
  <v-card v-else tile elevation="1">
    <v-card-text>
      <div><span class="subheader">ID: </span>{{ protein.id }}</div>
      <div><span class="subheader">Name: </span>{{ protein.name }}</div>
      <div><span class="subheader">Description: </span>{{ protein.description }}</div>
      <div><span class="subheader">Created: </span>{{ new Date(protein.createdAt).toUTCString() }}</div>
    </v-card-text>
    <v-card-actions>
      <v-btn
        color="primary"
        text
        :to="{
          name: 'main-group-proteins-edit',
          params: {
            groupId: activeGroupId,
            id: protein.id,
          },
        }"
      >
        Edit
      </v-btn>
      <v-btn v-if="isGroupAdmin" color="secondary" text @click="deleteProtein()">Delete</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { groupModule } from "@/modules/group";
import LoadingView from "@/components/LoadingView.vue";
import { proteinModule } from "@/modules/protein";

@Component({
  components: { LoadingView },
})
export default class ProteinView extends Vue {
  private readonly groupContext = groupModule.context(this.$store);
  private readonly proteinContext = proteinModule.context(this.$store);

  @Prop({
    type: Number,
    required: true,
  })
  readonly proteinId!: number;

  private get isGroupAdmin() {
    return this.groupContext.getters.isGroupAdmin;
  }

  private get activeGroupId() {
    return this.groupContext.getters.activeGroupId;
  }

  private get protein() {
    return this.proteinContext.getters.getProtein(this.proteinId);
  }

  private async deleteProtein() {
    if (self.confirm("Are you sure you want to delete the protein?")) {
      if (self.confirm("All children entities will be deleted!")) {
        await this.proteinContext.actions.deleteProtein(this.proteinId);
      }
    }
  }

  async mounted() {
    await this.proteinContext.actions.getProtein(this.proteinId);
  }
}
</script>

<style scoped>
.subheader {
  font-weight: bold;
}
</style>
