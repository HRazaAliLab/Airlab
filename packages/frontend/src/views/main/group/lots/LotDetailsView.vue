<template>
  <v-card flat>
    <v-card-title>Lot Details</v-card-title>
    <v-card-text>
      <v-tabs v-model="tab">
        <v-tab>Info</v-tab>
        <v-tab v-if="validations.length > 0">Validations</v-tab>
        <v-tab v-if="lot.meta">Metadata</v-tab>
        <v-tab-item>
          <LotView :lot-id="lot.id" />
        </v-tab-item>
        <v-tab-item v-if="validations.length > 0">
          <ValidationView
            v-for="validation in validations"
            :key="validation.id"
            :group-id="activeGroupId"
            :validation="validation"
            :api-url="apiUrl"
          />
        </v-tab-item>
        <v-tab-item v-if="lot.meta">
          <InfoView :item="lot" />
        </v-tab-item>
      </v-tabs>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import InfoView from "@/components/InfoView.vue";
import { LotDto } from "@airlab/shared/lib/lot/dto";
import LotView from "@/views/main/group/lots/LotView.vue";
import ValidationView from "@/views/main/group/validations/ValidationView.vue";
import { ValidationDto } from "@airlab/shared/lib/validation/dto";
import { groupModule } from "@/modules/group";
import { apiUrl } from "@/env";
import { lotModule } from "@/modules/lot";

@Component({
  components: { ValidationView, LotView, InfoView },
})
export default class LotDetailsView extends Vue {
  private readonly groupContext = groupModule.context(this.$store);
  private readonly lotContext = lotModule.context(this.$store);

  private readonly apiUrl = apiUrl;

  @Prop({
    type: Object,
    required: true,
  })
  readonly lot!: LotDto;

  tab = 0;
  private validations: ValidationDto[] = [];

  private get activeGroupId() {
    return this.groupContext.getters.activeGroupId;
  }

  async mounted() {
    this.validations = await this.lotContext.actions.getLotValidations(this.lot.id);
  }
}
</script>
