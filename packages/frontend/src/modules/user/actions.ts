import { mainModule } from "@/modules/main";
import { Store } from "vuex";
import { Actions, Context } from "vuex-smart-module";
import { UserState } from ".";
import { api } from "./api";
import { UserGetters } from "./getters";
import { UserMutations } from "./mutations";
import { CreateUserDto, UpdateUserDto } from "@airlab/shared/lib/user/dto";

export class UserActions extends Actions<UserState, UserGetters, UserMutations, UserActions> {
  // Declare context type
  main?: Context<typeof mainModule>;

  // Called after the module is initialized
  $init(store: Store<any>): void {
    // Create and retain main module context
    this.main = mainModule.context(store);
  }

  async getUsers() {
    try {
      const data = await api.getUsers(this.main!.getters.token);
      if (data) {
        this.mutations.setEntities(data);
      }
    } catch (error) {
      await this.main!.actions.checkApiError(error);
    }
  }

  async updateUser(payload: { id: number; user: UpdateUserDto }) {
    try {
      const data = await api.updateUser(this.main!.getters.token, payload.id, payload.user);
      this.mutations.updateEntity(data);
      this.main!.mutations.addNotification({ content: "User successfully updated", color: "success" });
    } catch (error) {
      await this.main!.actions.checkApiError(error);
    }
  }

  async createUser(payload: CreateUserDto) {
    try {
      const data = await api.createUser(this.main!.getters.token, payload);
      this.mutations.addEntity(data);
      this.main!.mutations.addNotification({ content: "User successfully created", color: "success" });
    } catch (error) {
      await this.main!.actions.checkApiError(error);
    }
  }

  async getUser(id: number) {
    try {
      const data = await api.getUser(this.main!.getters.token, id);
      if (data) {
        this.mutations.setEntity(data);
      }
    } catch (error) {
      await this.main!.actions.checkApiError(error);
    }
  }

  async checkUserExists(email: string) {
    try {
      const data = await api.checkUserExists(email);
      return data.exists;
    } catch (error) {
      await this.main!.actions.checkApiError(error);
    }
  }

  async signUp(payload: CreateUserDto) {
    try {
      const data = await api.signUp(payload);
      this.main!.actions.routeLogOut();
      this.main!.mutations.addNotification({ content: "User successfully signed up", color: "success" });
    } catch (error) {
      await this.main!.actions.checkApiError(error);
    }
  }
}
