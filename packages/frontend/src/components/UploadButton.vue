<template>
  <span>
    <v-btn @click="trigger" color="primary" text>
      <v-icon small left>mdi-cloud-upload</v-icon>
      Upload
    </v-btn>
    <input :multiple="multiple" class="visually-hidden" type="file" v-on:change="files" ref="fileInput" />
  </span>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from "vue-property-decorator";
import { groupModule } from "@/modules/group";

@Component
export default class UploadButton extends Vue {
  private readonly groupContext = groupModule.context(this.$store);

  @Prop({ default: false }) multiple = false;

  @Emit()
  async files(e): Promise<FileList> {
    const formData = new FormData();
    const file = e.target.files[0];
    formData.append("file", file, file.name);
    e.target.value = "";
    await this.groupContext.actions.importGroupData({
      formData: formData,
    });
    return e.target.files;
  }

  trigger() {
    (this.$refs.fileInput as HTMLElement).click();
  }
}
</script>

<style scoped>
.visually-hidden {
  position: absolute !important;
  height: 1px;
  width: 1px;
  overflow: hidden;
  clip: rect(1px, 1px, 1px, 1px);
}
</style>
