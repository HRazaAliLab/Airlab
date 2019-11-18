import { Getters } from "vuex-smart-module";
import { ValidationState } from ".";

export class ValidationGetters extends Getters<ValidationState> {
  get validations() {
    return this.state.ids.map(id => this.state.entities[id]);
  }

  getValidation(id: number) {
    return this.state.entities[id];
  }
}
