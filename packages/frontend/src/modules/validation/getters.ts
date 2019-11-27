import { Getters } from "vuex-smart-module";
import { ValidationState } from ".";
import { applicationToString, validationStatusToString } from "@/utils/converters";

export class ValidationGetters extends Getters<ValidationState> {
  get validations() {
    return this.state.ids.map(id => this.state.entities[id]);
  }

  getValidation(id: number) {
    return this.state.entities[id];
  }

  getCsv(items: any[]) {
    const separator = ",";
    const header = ["Id", "Application", "Species", "Clone", "Protein", "Lot", "Conjugate", "CreatedBy", "Status"];
    const lines = items.map(item => {
      const line = [
        item.id,
        applicationToString(item.application),
        item.species ? item.species.name : "",
        item.clone ? item.clone.name : "",
        item.clone ? item.clone.protein.name : "",
        item.lot ? item.lot.id : "",
        item.conjugate ? item.conjugate.id : "",
        item.user.name,
        validationStatusToString(item.status),
      ];
      return line.join(separator);
    });
    return [header.join(separator)].concat(lines).join("\n");
  }
}
