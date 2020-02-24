import { Mutations } from "vuex-smart-module";
import { groupListSchema, GroupState } from ".";
import { GroupDto } from "@airlab/shared/lib/group/dto";
import { normalize } from "normalizr";

export class GroupMutations extends Mutations<GroupState> {
  setActiveGroupId(id?: number) {
    this.state.activeGroupId = id;
  }

  setEntities(payload: GroupDto[]) {
    const normalizedData = normalize<GroupDto>(payload, groupListSchema);
    this.state.ids = normalizedData.result;
    this.state.entities = normalizedData.entities.groups ? normalizedData.entities.groups : {};
  }

  setEntity(payload: GroupDto) {
    const existingId = this.state.ids.find(id => id === payload.id);
    if (!existingId) {
      this.state.ids = this.state.ids.concat(payload.id);
    }
    this.state.entities = { ...this.state.entities, [payload.id]: payload };
  }

  addEntity(payload: GroupDto) {
    this.state.ids = this.state.ids.concat(payload.id);
    this.state.entities = { ...this.state.entities, [payload.id]: payload };
  }

  updateEntity(payload: GroupDto) {
    this.state.entities = { ...this.state.entities, [payload.id]: payload };
  }

  deleteEntity(id: number) {
    this.state.ids = this.state.ids.filter(item => item !== id);
    const entities = { ...this.state.entities };
    delete entities[id];
    this.state.entities = entities;
  }

  reset() {
    this.state.ids = [];
    this.state.entities = {};
    this.state.activeGroupId = undefined;
  }
}
