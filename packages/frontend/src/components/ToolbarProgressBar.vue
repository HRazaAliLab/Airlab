<template functional>
  <v-progress-linear
    :active="props.processing"
    :color="props.color"
    :indeterminate="props.indeterminate"
    :value="props.progress"
    class="ma-0"
    height="4"
    style="top: -2px;"
  />
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class ToolbarProgressBar extends Vue {
  @Prop(Boolean) processing?: boolean;
  @Prop(Number) progress?: boolean;
  @Prop(Boolean) indeterminate?: boolean;
  @Prop(String) color?: string;
}
</script>
