import { Mutations } from "vuex-smart-module";
import { LotState } from ".";
import { LotDto } from "@airlab/shared/lib/lot/dto";

export class LotMutations extends Mutations<LotState> {
  setLots(payload: LotDto[]) {
    this.state.lots = payload;
  }

  setLot(payload: LotDto) {
    const items = this.state.lots.filter(item => item.id !== payload.id);
    items.push(payload);
    this.state.lots = items;
  }

  deleteLot(payload: LotDto) {
    const items = this.state.lots.filter(item => item.id !== payload.id);
    this.state.lots = items;
  }

  deleteLotById(id: number) {
    const items = this.state.lots.filter(item => item.id !== id);
    this.state.lots = items;
  }

  reset() {
    this.state.lots = [];
  }
}
