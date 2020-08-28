<template>
  <LoadingView v-if="!species" text="Loading species details..." />
  <v-card v-else tile elevation="1">
    <v-card-text>
      <div><span class="subheader">ID: </span>{{ species.id }}</div>
      <div><span class="subheader">Name: </span>{{ species.name }}</div>
      <div><span class="subheader">Acronym: </span>{{ species.acronym }}</div>
      <div><span class="subheader">Created: </span>{{ new Date(species.createdAt).toUTCString() }}</div>
    </v-card-text>
    <v-card-actions>
      <v-btn
        color="primary"
        text
        :to="{
          name: 'main-group-species-edit',
          params: {
            groupId: activeGroupId,
            id: species.id,
          },
        }"
      >
        Edit
      </v-btn>
      <v-btn v-if="isGroupAdmin" color="secondary" text @click="deleteSpecies()">Delete</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { groupModule } from "@/modules/group";
import LoadingView from "@/components/LoadingView.vue";
import { speciesModule } from "@/modules/species";

@Component({
  components: { LoadingView },
})
export default class SpeciesView extends Vue {
  private readonly groupContext = groupModule.context(this.$store);
  private readonly speciesContext = speciesModule.context(this.$store);

  @Prop({
    type: Number,
    required: true,
  })
  readonly speciesId!: number;

  private get isGroupAdmin() {
    return this.groupContext.getters.isGroupAdmin;
  }

  private get activeGroupId() {
    return this.groupContext.getters.activeGroupId;
  }

  private get species() {
    return this.speciesContext.getters.getSpecies(this.speciesId);
  }

  private async deleteSpecies() {
    if (self.confirm("Are you sure you want to delete the species?")) {
      await this.speciesContext.actions.deleteSpecies(this.speciesId);
    }
  }

  async mounted() {
    await this.speciesContext.actions.getSpecies(this.speciesId);
  }
}
</script>

<style scoped>
.subheader {
  font-weight: bold;
}
</style>
