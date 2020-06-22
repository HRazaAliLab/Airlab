import { Mutations } from "vuex-smart-module";
import { tagListSchema, TagState } from ".";
import { TagDto } from "@airlab/shared/lib/tag/dto";
import { normalize } from "normalizr";

export class TagMutations extends Mutations<TagState> {
  setEntities(payload: TagDto[]) {
    const normalizedData = normalize<TagDto>(payload, tagListSchema);
    this.state.ids = normalizedData.result;
    this.state.entities = normalizedData.entities.tags ? Object.freeze(normalizedData.entities.tags) : {};
  }

  setEntity(payload: TagDto) {
    const existingId = this.state.ids.find((id) => id === payload.id);
    if (!existingId) {
      this.state.ids = this.state.ids.concat(payload.id);
    }
    this.state.entities = Object.freeze({ ...this.state.entities, [payload.id]: payload });
  }

  addEntity(payload: TagDto) {
    this.state.ids = this.state.ids.concat(payload.id);
    this.state.entities = Object.freeze({ ...this.state.entities, [payload.id]: payload });
  }

  updateEntity(payload: TagDto) {
    this.state.entities = Object.freeze({ ...this.state.entities, [payload.id]: payload });
  }

  deleteEntity(id: number) {
    this.state.ids = this.state.ids.filter((item) => item !== id);
    const entities = { ...this.state.entities };
    delete entities[id];
    this.state.entities = Object.freeze(entities);
  }

  reset() {
    // acquire initial state
    const s = new TagState();
    Object.keys(s).forEach((key) => {
      this.state[key] = s[key];
    });
  }
}
