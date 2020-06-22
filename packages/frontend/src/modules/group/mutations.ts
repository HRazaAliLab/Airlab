import { Mutations } from "vuex-smart-module";
import { groupListSchema, GroupState } from ".";
import { GroupDto } from "@airlab/shared/lib/group/dto";
import { normalize } from "normalizr";
import { MemberDto } from "@airlab/shared/lib/member/dto";

export class GroupMutations extends Mutations<GroupState> {
  setActiveGroupId(id?: number) {
    this.state.activeGroupId = id;
  }

  setEntities(payload: GroupDto[]) {
    const normalizedData = normalize<GroupDto>(payload, groupListSchema);
    this.state.ids = normalizedData.result;
    this.state.entities = normalizedData.entities.groups ? Object.freeze(normalizedData.entities.groups) : {};
  }

  setEntity(payload: GroupDto) {
    const existingId = this.state.ids.find((id) => id === payload.id);
    if (!existingId) {
      this.state.ids = this.state.ids.concat(payload.id);
    }
    this.state.entities = Object.freeze({ ...this.state.entities, [payload.id]: payload });
  }

  addEntity(payload: GroupDto) {
    this.state.ids = this.state.ids.concat(payload.id);
    this.state.entities = Object.freeze({ ...this.state.entities, [payload.id]: payload });
  }

  updateEntity(payload: GroupDto) {
    this.state.entities = Object.freeze({ ...this.state.entities, [payload.id]: payload });
  }

  deleteEntity(id: number) {
    this.state.ids = this.state.ids.filter((item) => item !== id);
    const entities = { ...this.state.entities };
    delete entities[id];
    this.state.entities = Object.freeze(entities);
  }

  setMyMember(payload: MemberDto) {
    this.state.myMember = payload;
  }

  reset() {
    // acquire initial state
    const s = new GroupState();
    Object.keys(s).forEach((key) => {
      this.state[key] = s[key];
    });
  }
}
