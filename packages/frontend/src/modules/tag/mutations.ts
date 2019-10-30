import { Mutations } from "vuex-smart-module";
import { TagState } from ".";
import { TagDto } from "@airlab/shared/lib/tag/dto";

export class TagMutations extends Mutations<TagState> {
  setTags(payload: TagDto[]) {
    this.state.tags = payload;
  }

  setTag(payload: TagDto) {
    const items = this.state.tags.filter(item => item.id !== payload.id);
    items.push(payload);
    this.state.tags = items;
  }

  deleteTag(payload: TagDto) {
    const items = this.state.tags.filter(item => item.id !== payload.id);
    this.state.tags = items;
  }

  reset() {}
}
