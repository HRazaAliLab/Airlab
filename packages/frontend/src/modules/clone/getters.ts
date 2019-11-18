import { Getters } from "vuex-smart-module";
import { CloneState } from ".";

export class CloneGetters extends Getters<CloneState> {
  get clones() {
    return this.state.ids.map(id => this.state.entities[id]);
  }

  getClone(id: number) {
    return this.state.entities[id];
  }

  get csv() {
    const separator = ",";
    const items = this.getters.clones;
    const header = ["id", "Clone", "Protein", "Host", "Isotype", "Epitope", "Phospho", "Polyclonal"];
    const lines = items.map(item => {
      const line = [
        item.id,
        item.name,
        (item as any).protein.name,
        (item as any).species && (item as any).species.name,
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
