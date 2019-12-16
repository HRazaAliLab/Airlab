import Vue from "vue";
import Vuetify, {
  VBtn,
  VCard,
  VCardActions,
  VCardText,
  VCardTitle,
  VChip,
  VCol,
  VContainer,
  VIcon,
  VList,
  VListItem,
  VListItemContent,
  VListItemSubtitle,
  VListItemTitle,
  VProgressCircular,
  VProgressLinear,
  VRow,
} from "vuetify/lib";

Vue.use(Vuetify, {
  components: {
    VBtn,
    VIcon,
    VCol,
    VRow,
    VProgressCircular,
    VCard,
    VCardText,
    VCardTitle,
    VCardActions,
    VContainer,
    VProgressLinear,
    VList,
    VListItem,
    VListItemContent,
    VListItemTitle,
    VListItemSubtitle,
    VChip,
  },
});

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: "#3f50b5",
        secondary: "#f44336",
        accent: "#82B1FF",
        error: "#FF5252",
        info: "#2196F3",
        success: "#4CAF50",
        warning: "#FFC107",
      },
    },
  },
  icons: {
    iconfont: "mdi",
  },
});
