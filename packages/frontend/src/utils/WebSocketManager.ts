import { mainModule, MainState } from "@/modules/main";
import { MainActions } from "@/modules/main/actions";
import { MainGetters } from "@/modules/main/getters";
import { MainMutations } from "@/modules/main/mutations";
import { WebSocketMessage } from "@/utils/WebSocketMessage";
import { Store } from "vuex";
import { Context, Module } from "vuex-smart-module";
import { groupModule, GroupState } from "@/modules/group";
import { GroupGetters } from "@/modules/group/getters";
import { GroupMutations } from "@/modules/group/mutations";
import { GroupActions } from "@/modules/group/actions";

export class WebSocketManager {
  static mainContext: Context<Module<MainState, MainGetters, MainMutations, MainActions>>;
  static groupContext: Context<Module<GroupState, GroupGetters, GroupMutations, GroupActions>>;
  static socket: WebSocket;
  static token: string;
  static protocol: string;

  static init(store: Store<any>) {
    WebSocketManager.mainContext = mainModule.context(store);
    WebSocketManager.groupContext = groupModule.context(store);
    WebSocketManager.token = WebSocketManager.mainContext.getters.token;
    WebSocketManager.protocol = self.location.protocol === "https:" ? "wss:" : "ws:";
  }

  static connect(groupId: number) {
    // Dispose previous connections due to login/logout
    WebSocketManager.close();
    const url = `${WebSocketManager.protocol}//${location.hostname}/ws/${groupId}?token=${WebSocketManager.token}`;

    WebSocketManager.socket = new WebSocket(url);
    WebSocketManager.socket.onopen = (event: Event) => {
      console.log("WebSocket connection opened");
      // WebSocketManager.socket.send(
      //   JSON.stringify({
      //     event: "events",
      //     data: "test",
      //   })
      // );
    };

    WebSocketManager.socket.onclose = (event: CloseEvent) => {
      console.log("WebSocket is closed. Reconnecting...", event.reason);
      setTimeout(() => {
        WebSocketManager.connect(groupId);
      }, 1000);
    };

    WebSocketManager.socket.onmessage = (event: MessageEvent) => {
      const json = JSON.parse(event.data);
      const message = new WebSocketMessage(json);
      console.log(message);
      // if (message.experimentId === WebSocketManager.experimentContext.getters.activeExperimentId) {
      //   switch (message.type) {
      //     case "slide_imported": {
      //       WebSocketManager.experimentContext.actions.getExperimentData(message.experimentId);
      //       WebSocketManager.mainContext.mutations.addNotification({
      //         content: "Slide successfully imported",
      //         color: "success",
      //       });
      //       break;
      //     }
      //     case "dataset_imported": {
      //       WebSocketManager.datasetContext.actions.getExperimentDatasets(message.experimentId);
      //       WebSocketManager.mainContext.mutations.addNotification({
      //         content: "Dataset successfully imported",
      //         color: "success",
      //       });
      //       break;
      //     }
      //     case "tsne_result_ready": {
      //       WebSocketManager.datasetContext.actions.getExperimentDatasets(message.experimentId);
      //       WebSocketManager.datasetContext.mutations.updateDatasetTSNEOutput(message);
      //       WebSocketManager.mainContext.mutations.addNotification({
      //         content: "t-SNE result is ready",
      //         color: "success",
      //       });
      //       break;
      //     }
      //     case "umap_result_ready": {
      //       WebSocketManager.datasetContext.actions.getExperimentDatasets(message.experimentId);
      //       WebSocketManager.datasetContext.mutations.updateDatasetUMAPOutput(message);
      //       WebSocketManager.mainContext.mutations.addNotification({
      //         content: "UMAP result is ready",
      //         color: "success",
      //       });
      //       break;
      //     }
      //     case "phenograph_result_ready": {
      //       WebSocketManager.datasetContext.actions.getExperimentDatasets(message.experimentId);
      //       WebSocketManager.datasetContext.mutations.updateDatasetPhenoGraphOutput(message);
      //       WebSocketManager.mainContext.mutations.addNotification({
      //         content: "PhenoGraph result is ready",
      //         color: "success",
      //       });
      //       break;
      //     }
      //   }
      // }
    };

    WebSocketManager.socket.onerror = (event: Event) => {
      console.log("WebSocket error: ", event);
    };
  }

  static close() {
    if (WebSocketManager.socket) {
      WebSocketManager.socket.onopen = null;
      WebSocketManager.socket.onclose = null;
      WebSocketManager.socket.onmessage = null;
      WebSocketManager.socket.onerror = null;
      WebSocketManager.socket.close();
    }
  }
}
