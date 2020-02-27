<template>
  <LoadingView v-if="!conjugate" text="Loading conjugate details..." />
  <v-card v-else tile elevation="1">
    <v-card-text>
      <div><span class="subheader">Tube Number: </span>{{ conjugate.tubeNumber }}</div>
      <div>
        <span class="subheader">Tag: </span>
        <router-link
          class="link"
          :to="{
            name: 'main-group-tags-edit',
            params: {
              groupId: activeGroupId,
              id: conjugate.tag.id,
            },
          }"
        >
          {{ conjugate.tag.name + conjugate.tag.mw }}
        </router-link>
      </div>
      <div>
        <span class="subheader">Lot: </span>
        <router-link
          class="link"
          :to="{
            name: 'main-group-lots-edit',
            params: {
              groupId: activeGroupId,
              id: conjugate.lot.id,
            },
          }"
        >
          {{ conjugate.lot.name }}
        </router-link>
      </div>
      <div>
        <span class="subheader">Clone: </span>
        <router-link
          class="link"
          :to="{
            name: 'main-group-clones-edit',
            params: {
              groupId: activeGroupId,
              id: conjugate.lot.clone.id,
            },
          }"
        >
          {{ conjugate.lot.clone.name }}
        </router-link>
      </div>
      <div>
        <span class="subheader">Protein: </span>
        <router-link
          class="link"
          :to="{
            name: 'main-group-proteins-edit',
            params: {
              groupId: activeGroupId,
              id: conjugate.lot.clone.protein.id,
            },
          }"
        >
          {{ conjugate.lot.clone.protein.name }}
        </router-link>
      </div>
      <div><span class="subheader">Concentration: </span>{{ conjugate.concentration }}</div>
      <div><span class="subheader">Description: </span>{{ conjugate.description }}</div>
      <div><span class="subheader">Created: </span>{{ new Date(conjugate.createdAt).toUTCString() }}</div>
      <div><span class="subheader">Updated: </span>{{ new Date(conjugate.updatedAt).toUTCString() }}</div>
    </v-card-text>
    <v-card-actions>
      <v-btn
        color="primary"
        text
        :to="{
          name: 'main-group-conjugates-edit',
          params: {
            groupId: activeGroupId,
            id: conjugate.id,
          },
        }"
      >
        Edit
      </v-btn>
      <v-btn color="secondary" text @click="deleteConjugate()">
        Delete
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { groupModule } from "@/modules/group";
import LoadingView from "@/components/LoadingView.vue";
import { conjugateModule } from "@/modules/conjugate";

@Component({
  components: { LoadingView },
})
export default class ConjugateView extends Vue {
  private readonly groupContext = groupModule.context(this.$store);
  private readonly conjugateContext = conjugateModule.context(this.$store);

  @Prop({
    type: Number,
    required: true,
  })
  readonly conjugateId!: number;

  private get activeGroupId() {
    return this.groupContext.getters.activeGroupId;
  }

  private get conjugate() {
    return this.conjugateContext.getters.getConjugate(this.conjugateId);
  }

  private async deleteConjugate() {
    if (self.confirm("Are you sure you want to delete the conjugate?")) {
      await this.conjugateContext.actions.deleteConjugate(this.conjugateId);
    }
  }

  async mounted() {
    await this.conjugateContext.actions.getConjugate(this.conjugateId);
  }
}
</script>

<style scoped>
.subheader {
  font-weight: bold;
}
</style>
