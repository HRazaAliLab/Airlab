import { Mutations } from "vuex-smart-module";
import { memberListSchema, MemberState } from ".";
import { normalize } from "normalizr";
import { MemberDto } from "@airlab/shared/lib/member/dto";

export class MemberMutations extends Mutations<MemberState> {
  setEntities(payload: MemberDto[]) {
    const normalizedData = normalize<MemberDto>(payload, memberListSchema);
    this.state.ids = normalizedData.result;
    this.state.entities = normalizedData.entities.members ? normalizedData.entities.members : {};
  }

  setEntity(payload: MemberDto) {
    const existingId = this.state.ids.find((id) => id === payload.id);
    if (!existingId) {
      this.state.ids = this.state.ids.concat(payload.id);
    }
    this.state.entities = { ...this.state.entities, [payload.id]: payload };
  }

  addEntity(payload: MemberDto) {
    this.state.ids = this.state.ids.concat(payload.id);
    this.state.entities = { ...this.state.entities, [payload.id]: payload };
  }

  updateEntity(payload: MemberDto) {
    this.state.entities = { ...this.state.entities, [payload.id]: payload };
  }

  deleteEntity(id: number) {
    this.state.ids = this.state.ids.filter((item) => item !== id);
    const entities = { ...this.state.entities };
    delete entities[id];
    this.state.entities = entities;
  }

  reset() {
    this.state.ids = [];
    this.state.entities = {};
  }
}
