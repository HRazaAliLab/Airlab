<template functional>
  <v-card flat>
    <v-card-title>{{ props.item.name }}</v-card-title>
    <v-card-text>
      <InfoView :item="props.item" />
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { ReagentDto } from "@airlab/shared/lib/reagent/dto";
import InfoView from "@/components/InfoView.vue";

@Component({
  components: { InfoView },
})
export default class ReagentDetailsView extends Vue {
  @Prop({
    type: Object,
    required: true,
  })
  readonly item!: ReagentDto;
}
</script>
