import { Getters } from "vuex-smart-module";
import { UserState } from ".";

export class UserGetters extends Getters<UserState> {
  get users() {
    return Object.values(this.state.entities);
  }

  getUser(id: number) {
    return this.state.entities[id];
  }
}
