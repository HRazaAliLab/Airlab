import { Getters } from "vuex-smart-module";
import { CloneState } from ".";

export class CloneGetters extends Getters<CloneState> {
  get clones() {
    return this.state.ids.map((id) => this.state.entities[id]);
  }

  getClone(id: number) {
    return this.state.entities[id];
  }

  getCsv(items: any[]) {
    const separator = ",";
    const header = ["Id", "Clone", "Protein", "Host", "Isotype", "Epitope", "Phospho", "Polyclonal"];
    const lines = items.map((item) => {
      const line = [
        item.id,
        item.name,
        item.protein.name,
        item.species && item.species.name,
        item.isotype,
        item.epitope,
        item.isPhospho,
        item.isPolyclonal,
      ];
      return line.join(separator);
    });
    return [header.join(separator)].concat(lines).join("\n");
  }
}
