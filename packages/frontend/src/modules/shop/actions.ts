import { mainModule } from "@/modules/main";
import { Store } from "vuex";
import { Actions, Context } from "vuex-smart-module";
import { api } from "./api";
import { ShopGetters } from "./getters";
import { ShopMutations } from "./mutations";
import { ShopState } from ".";

export class ShopActions extends Actions<ShopState, ShopGetters, ShopMutations, ShopActions> {
  // Declare context type
  main?: Context<typeof mainModule>;

  // Called after the module is initialized
  $init(store: Store<any>): void {
    // Create and retain main module context
    this.main = mainModule.context(store);
  }

  async searchAntibody(search: string) {
    return await api.searchAntibody(search);
  }
}
