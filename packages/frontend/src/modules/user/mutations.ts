import { Mutations } from "vuex-smart-module";
import { userListSchema, UserState } from ".";
import { UserDto } from "@airlab/shared/lib/user/dto";
import { normalize } from "normalizr";

export class UserMutations extends Mutations<UserState> {
  setEntities(payload: UserDto[]) {
    const normalizedData = normalize<UserDto>(payload, userListSchema);
    this.state.ids = normalizedData.result;
    this.state.entities = normalizedData.entities.users ? normalizedData.entities.users : {};
  }

  setEntity(payload: UserDto) {
    const existingId = this.state.ids.find((id) => id === payload.id);
    if (!existingId) {
      this.state.ids = this.state.ids.concat(payload.id);
    }
    this.state.entities = { ...this.state.entities, [payload.id]: payload };
  }

  addEntity(payload: UserDto) {
    this.state.ids = this.state.ids.concat(payload.id);
    this.state.entities = { ...this.state.entities, [payload.id]: payload };
  }

  updateEntity(payload: UserDto) {
    this.state.entities = { ...this.state.entities, [payload.id]: payload };
  }

  deleteEntity(id: number) {
    this.state.ids = this.state.ids.filter((item) => item !== id);
    const entities = { ...this.state.entities };
    delete entities[id];
    this.state.entities = entities;
  }

  reset() {
    // acquire initial state
    const s = new UserState();
    Object.keys(s).forEach((key) => {
      this.state[key] = s[key];
    });
  }
}
