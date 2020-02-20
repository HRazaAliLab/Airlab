<template>
  <v-card flat>
    <v-card-title>Provider: {{ provider.name }}</v-card-title>
    <v-card-subtitle>Reagents</v-card-subtitle>
    <v-card-text>
      <div v-for="reagent in reagents" :key="reagent.id" class="item-view">
        <ReagentView :group-id="activeGroupId" :reagent="reagent" />
      </div>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { groupModule } from "@/modules/group";
import { providerModule } from "@/modules/provider";
import { ProviderDto } from "@airlab/shared/lib/provider/dto";
import { ReagentDto } from "@airlab/shared/lib/reagent/dto";
import ReagentView from "@/views/main/group/reagents/ReagentView.vue";

@Component({
  components: { ReagentView },
})
export default class ProviderDetailsView extends Vue {
  readonly groupContext = groupModule.context(this.$store);
  readonly providerContext = providerModule.context(this.$store);

  @Prop({
    type: Object,
    required: true,
  })
  readonly provider!: ProviderDto;

  reagents: ReagentDto[] = [];

  get activeGroupId() {
    return this.groupContext.getters.activeGroupId;
  }

  async mounted() {
    this.reagents = await this.providerContext.actions.getProviderReagents(this.provider.id);
  }
}
</script>

<style scoped>
.item-view {
  margin-bottom: 10px;
}
</style>
