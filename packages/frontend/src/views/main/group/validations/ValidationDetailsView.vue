<template>
  <v-card flat>
    <v-card-title>Validation Details</v-card-title>
    <v-card-text>
      <ValidationView v-if="validation" :validation="validation" :group-id="activeGroupId" :api-url="apiUrl" />
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import ValidationView from "@/views/main/group/validations/ValidationView.vue";
import { validationModule } from "@/modules/validation";
import { groupModule } from "@/modules/group";
import { apiUrl } from "@/env";

@Component({
  components: { ValidationView },
})
export default class ValidationDetailsView extends Vue {
  private readonly groupContext = groupModule.context(this.$store);
  private readonly validationContext = validationModule.context(this.$store);

  private readonly apiUrl = apiUrl;

  @Prop({
    type: Number,
    required: true,
  })
  readonly validationId!: number;

  private get activeGroupId() {
    return this.groupContext.getters.activeGroupId;
  }

  private get validation() {
    return this.validationContext.getters.getValidation(this.validationId);
  }

  async mounted() {
    await this.validationContext.actions.getValidation(this.validationId);
  }
}
</script>
