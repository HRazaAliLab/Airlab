import { Mutations } from "vuex-smart-module";
import { ShopState } from ".";

export class ShopMutations extends Mutations<ShopState> {
  reset() {
    this.state.ids = [];
  }
}
