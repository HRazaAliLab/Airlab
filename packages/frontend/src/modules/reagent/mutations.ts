import { Mutations } from "vuex-smart-module";
import { ReagentState } from ".";
import { ReagentDto } from "@airlab/shared/lib/reagent/dto";

export class ReagentMutations extends Mutations<ReagentState> {
  setReagents(payload: ReagentDto[]) {
    this.state.reagents = payload;
  }

  setReagent(payload: ReagentDto) {
    const items = this.state.reagents.filter(item => item.id !== payload.id);
    items.push(payload);
    this.state.reagents = items;
  }

  deleteReagentById(id: number) {
    const items = this.state.reagents.filter(item => item.id !== id);
    this.state.reagents = items;
  }

  reset() {
    this.state.reagents = [];
  }
}
