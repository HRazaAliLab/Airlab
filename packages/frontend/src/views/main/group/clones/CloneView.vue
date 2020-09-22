<template>
  <LoadingView v-if="!clone" text="Loading clone details..." />
  <v-card v-else tile elevation="1">
    <v-card-text>
      <div><span class="subheader">ID: </span>{{ clone.id }}</div>
      <div><span class="subheader">Name: </span>{{ clone.name }}</div>
      <div>
        <span class="subheader">Protein: </span>
        <router-link
          class="link"
          :to="{
            name: 'main-group-proteins-edit',
            params: {
              groupId: activeGroupId,
              id: clone.protein.id,
            },
          }"
        >
          {{ clone.protein.name }}
        </router-link>
      </div>
      <div v-if="clone.species">
        <span class="subheader">Host: </span>
        <router-link
          class="link"
          :to="{
            name: 'main-group-species-edit',
            params: {
              groupId: activeGroupId,
              id: clone.species.id,
            },
          }"
        >
          {{ clone.species.name }}
        </router-link>
      </div>
      <div v-if="clone.user">
        <span class="subheader">Created by: </span>
        <router-link
          class="link"
          :to="{
            name: 'main-admin-users-edit',
            params: {
              groupId: activeGroupId,
              id: clone.user.id,
            },
          }"
        >
          {{ clone.user.name }}
        </router-link>
      </div>
      <div><span class="subheader">Isotype: </span>{{ clone.isotype }}</div>
      <div><span class="subheader">Epitope: </span>{{ clone.epitope }}</div>
      <div><span class="subheader">Polyclonal: </span>{{ clone.isPolyclonal }}</div>
      <div><span class="subheader">Phospho: </span>{{ clone.isPhospho }}</div>
      <div class="subheader">Application:</div>
      <v-chip-group multiple column active-class="primary--text">
        <v-chip :color="getApplicationColor(applicationMap.sMC)" small disabled class="chip">SMC</v-chip>
        <v-chip :color="getApplicationColor(applicationMap.iMC)" small disabled class="chip">IMC</v-chip>
        <v-chip :color="getApplicationColor(applicationMap.FC)" small disabled class="chip">FC</v-chip>
        <v-chip :color="getApplicationColor(applicationMap.IF)" small disabled class="chip">IF</v-chip>
        <v-chip :color="getApplicationColor(applicationMap.IHC)" small disabled class="chip">IHC</v-chip>
        <v-chip :color="getApplicationColor(applicationMap.IHCF)" small disabled class="chip">IHC-F</v-chip>
        <v-chip :color="getApplicationColor(applicationMap.WB)" small disabled class="chip">WB</v-chip>
      </v-chip-group>
      <div class="subheader">Reactivity:</div>
      <v-chip-group :value="clone.reactivity" multiple column active-class="primary--text">
        <v-chip v-for="s in species" :key="s.id" :value="s.id" label small disabled class="chip">
          {{ s.name }}
        </v-chip>
      </v-chip-group>
    </v-card-text>
    <v-card-actions>
      <v-btn
        color="primary"
        text
        :to="{
          name: 'main-group-clones-edit',
          params: {
            groupId: activeGroupId,
            id: clone.id,
          },
        }"
      >
        Edit
      </v-btn>
      <v-btn v-if="isGroupAdmin" color="secondary" text @click="deleteClone()">Delete</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { groupModule } from "@/modules/group";
import { cloneModule } from "@/modules/clone";
import LoadingView from "@/components/LoadingView.vue";
import { speciesModule } from "@/modules/species";
import { applicationNameToId } from "@/utils/enums";

@Component({
  components: { LoadingView },
})
export default class CloneView extends Vue {
  private readonly groupContext = groupModule.context(this.$store);
  private readonly cloneContext = cloneModule.context(this.$store);
  private readonly speciesContext = speciesModule.context(this.$store);

  @Prop({
    type: Number,
    required: true,
  })
  readonly cloneId!: number;

  private readonly applicationMap = applicationNameToId;

  private get isGroupAdmin() {
    return this.groupContext.getters.isGroupAdmin;
  }

  private get activeGroupId() {
    return this.groupContext.getters.activeGroupId;
  }

  private get clone() {
    return this.cloneContext.getters.getClone(this.cloneId);
  }

  get species() {
    return this.speciesContext.getters.species;
  }

  private getApplicationColor(application: number) {
    return this.clone.application && this.clone.application.hasOwnProperty(application)
      ? this.clone.application[application]
        ? "green lighten-2"
        : "red lighten-2"
      : "grey lighten-2";
  }

  private async deleteClone() {
    if (self.confirm("Are you sure you want to delete the clone?")) {
      if (self.confirm("All children lots and conjugates will be deleted!")) {
        await this.cloneContext.actions.deleteClone(this.cloneId);
      }
    }
  }

  async mounted() {
    await Promise.all([
      this.cloneContext.actions.getClone(this.cloneId),
      this.speciesContext.actions.getGroupSpecies(+this.$router.currentRoute.params.groupId),
    ]);
  }
}
</script>

<style scoped>
.subheader {
  font-weight: bold;
}
.chip {
  opacity: 1;
}
</style>
