import { Getters } from "vuex-smart-module";
import { TagState } from ".";

export class TagGetters extends Getters<TagState> {
  get tags() {
    return Object.values(this.state.entities);
  }

  getTag(id: number) {
    return this.state.entities[id];
  }
}
