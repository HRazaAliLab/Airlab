import { Mutations } from "vuex-smart-module";
import { ProteinState } from ".";
import { ProteinDto } from "@airlab/shared/lib/protein/dto";

export class ProteinMutations extends Mutations<ProteinState> {
  setProteins(payload: ProteinDto[]) {
    this.state.proteins = payload;
  }

  setProtein(payload: ProteinDto) {
    const items = this.state.proteins.filter(item => item.id !== payload.id);
    items.push(payload);
    this.state.proteins = items;
  }

  deleteProtein(payload: ProteinDto) {
    const items = this.state.proteins.filter(item => item.id !== payload.id);
    this.state.proteins = items;
  }

  deleteProteinById(id: number) {
    const items = this.state.proteins.filter(item => item.id !== id);
    this.state.proteins = items;
  }

  reset() {
    this.state.proteins = [];
  }
}
