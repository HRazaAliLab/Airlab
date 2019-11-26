import { Getters } from "vuex-smart-module";
import { TagState } from ".";

export class TagGetters extends Getters<TagState> {
  get tags() {
    return this.state.ids.map(id => this.state.entities[id]);
  }

  get metals() {
    return this.getters.tags.filter(item => item.isMetal);
  }

  getTag(id: number) {
    return this.state.entities[id];
  }
}
