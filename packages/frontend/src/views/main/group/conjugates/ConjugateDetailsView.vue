<template>
  <v-card flat>
    <v-card-title>Conjugate Details</v-card-title>
    <v-card-text>
      <v-tabs v-model="tab">
        <v-tab>Info</v-tab>
        <v-tab v-if="validations.length > 0">Validations</v-tab>
        <v-tab-item>
          <ConjugateView :conjugate-id="conjugate.id" />
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
      </v-tabs>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import ConjugateView from "@/views/main/group/conjugates/ConjugateView.vue";
import { ConjugateDto } from "@airlab/shared/lib/conjugate/dto";
import ValidationView from "@/views/main/group/validations/ValidationView.vue";
import { groupModule } from "@/modules/group";
import { conjugateModule } from "@/modules/conjugate";
import { apiUrl } from "@/env";
import { ValidationDto } from "@airlab/shared/lib/validation/dto";

@Component({
  components: { ValidationView, ConjugateView },
})
export default class ProviderDetailsView extends Vue {
  private readonly groupContext = groupModule.context(this.$store);
  private readonly conjugateContext = conjugateModule.context(this.$store);

  private readonly apiUrl = apiUrl;

  @Prop({
    type: Object,
    required: true,
  })
  readonly conjugate!: ConjugateDto;

  private tab = 0;
  private validations: ValidationDto[] = [];

  private get activeGroupId() {
    return this.groupContext.getters.activeGroupId;
  }

  async mounted() {
    this.validations = await this.conjugateContext.actions.getConjugateValidations(this.conjugate.id);
  }
}
</script>
