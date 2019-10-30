import { Getters } from "vuex-smart-module";
import { TagState } from ".";

export class TagGetters extends Getters<TagState> {
  get tags() {
    return this.state.tags;
  }

  getTag(id?: number) {
    return this.tags.find(item => item.id === id);
  }
}
