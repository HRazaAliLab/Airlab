<template>
  <LoadingView text="Loading panels..." />
</template>

<script lang="ts">
import LoadingView from "@/components/LoadingView.vue";
import { Component, Vue } from "vue-property-decorator";
import { groupModule } from "@/modules/group";

@Component({
  components: {
    LoadingView,
  },
})
export default class PanelsView extends Vue {
  readonly groupContext = groupModule.context(this.$store);

  get group() {
    return this.groupContext.getters.activeGroup;
  }
}
</script>
