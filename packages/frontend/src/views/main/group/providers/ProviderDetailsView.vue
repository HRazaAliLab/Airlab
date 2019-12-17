<template>
  <v-card flat>
    <v-list-item>
      <v-list-item-icon>
        <v-icon>mdi-information-outline</v-icon>
      </v-list-item-icon>
      <v-list-item-content>
        <v-list-item-title>Reagents</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-card-text>
      <ReagentView
        v-for="reagent in reagents"
        :key="reagent.id"
        :group-id="activeGroupId"
        :api-url="apiUrl"
        :reagent="reagent"
      />
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { groupModule } from "@/modules/group";
import { apiUrl } from "@/env";
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
  readonly apiUrl = apiUrl;

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
