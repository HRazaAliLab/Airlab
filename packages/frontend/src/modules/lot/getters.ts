import { Getters } from "vuex-smart-module";
import { LotState } from ".";
import { LotDto } from "@airlab/shared/lib/lot/dto";
import { lotStatusToString } from "@/utils/converters";

export class LotGetters extends Getters<LotState> {
  get lots() {
    return this.state.ids.map((id) => this.state.entities[id]);
  }

  getLot(id: number) {
    return this.state.entities[id];
  }

  getCsv(items: readonly LotDto[]) {
    const separator = ";";
    const header = ["Id", "Name", "Clone", "Provider", "Number", "Reference", "Price", "Status"];
    const lines = items.map((item) => {
      const line = [
        item.id,
        item.name,
        (item as any).clone.name,
        (item as any).provider ? (item as any).provider.name : " ",
        item.number,
        item.reference,
        item.price,
        lotStatusToString(item.status),
      ];
      return line.join(separator);
    });
    return [header.join(separator)].concat(lines).join("\n");
  }
}
