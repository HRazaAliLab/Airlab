import { Mutations } from "vuex-smart-module";
import { CloneState } from ".";
import { CloneDto } from "@airlab/shared/lib/clone/dto";

export class CloneMutations extends Mutations<CloneState> {
  setClones(payload: CloneDto[]) {
    this.state.clones = payload;
  }

  setClone(payload: CloneDto) {
    const items = this.state.clones.filter(item => item.id !== payload.id);
    items.push(payload);
    this.state.clones = items;
  }

  deleteClone(payload: CloneDto) {
    const items = this.state.clones.filter(item => item.id !== payload.id);
    this.state.clones = items;
  }

  deleteCloneById(id: number) {
    const items = this.state.clones.filter(item => item.id !== id);
    this.state.clones = items;
  }

  reset() {
    this.state.clones = [];
  }
}
