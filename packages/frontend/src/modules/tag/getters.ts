import { Getters } from "vuex-smart-module";
import { TagState } from ".";

export class TagGetters extends Getters<TagState> {
  get tags() {
    return Object.values(this.state.entities).sort((a, b) => a.name.localeCompare(b.name));
  }

  getTag(id: number) {
    return this.state.entities[id];
  }
}
