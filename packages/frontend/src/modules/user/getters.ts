import { Getters } from "vuex-smart-module";
import { UserState } from ".";

export class UserGetters extends Getters<UserState> {
  get users() {
    return this.state.ids.map((id) => this.state.entities[id]);
  }

  getUser(id: number) {
    return this.state.entities[id];
  }
}
