<template>
  <v-card flat>
    <v-card-title>Clone Details</v-card-title>
    <v-card-text>
      <v-tabs v-model="tab">
        <v-tab>Info</v-tab>
        <v-tab>Validations</v-tab>
        <v-tab-item>
          <CloneView :cloneId="clone.id" />
        </v-tab-item>
        <v-tab-item>
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
import { cloneModule } from "@/modules/clone";
import { CloneDto } from "@airlab/shared/lib/clone/dto";
import { groupModule } from "@/modules/group";
import { ValidationDto } from "@airlab/shared/lib/validation/dto";
import ValidationView from "@/views/main/group/validations/ValidationView.vue";
import { apiUrl } from "@/env";
import CloneView from "@/views/main/group/clones/CloneView.vue";

@Component({
  components: { CloneView, ValidationView },
})
export default class CloneDetailsView extends Vue {
  private readonly groupContext = groupModule.context(this.$store);
  private readonly cloneContext = cloneModule.context(this.$store);

  private readonly apiUrl = apiUrl;

  @Prop(Object) readonly clone!: CloneDto;

  private tab = 0;
  private validations: ValidationDto[] = [];

  private get activeGroupId() {
    return this.groupContext.getters.activeGroupId;
  }

  async mounted() {
    this.validations = await this.cloneContext.actions.getCloneValidations(this.clone.id);
  }
}
</script>
