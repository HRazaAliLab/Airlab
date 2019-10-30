import { Mutations } from "vuex-smart-module";
import { UserState } from ".";
import { UserDto } from "@airlab/shared/lib/user/dto";

export class UserMutations extends Mutations<UserState> {
  setUsers(payload: UserDto[]) {
    this.state.users = payload;
  }

  setUser(payload: UserDto) {
    const items = this.state.users.filter(item => item.id !== payload.id);
    items.push(payload);
    this.state.users = items;
  }
}
