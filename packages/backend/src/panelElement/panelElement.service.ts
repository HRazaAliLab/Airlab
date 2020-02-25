import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { PanelElementEntity } from "./panelElement.entity";
import { PanelElementDataDto } from "@airlab/shared/lib/panel/dto";

@Injectable()
export class PanelElementService {
  constructor(
    @InjectRepository(PanelElementEntity)
    private readonly repository: Repository<PanelElementEntity>
  ) {}

  async updatePanelElements(panelId: number, elements: PanelElementDataDto[]) {
    await this.repository.delete({
      panelId: panelId,
    });
    const data = elements.map(item => {
      return {
        panelId: panelId,
        conjugateId: item.conjugateId,
        dilutionType: item.dilutionType,
        concentration: item.concentration,
      };
    });
    await this.repository.save(data);
  }

  async findByPanelIdAndConjugateId(panelId: number, conjugateId: number) {
    return this.repository.findOne({
      panelId: panelId,
      conjugateId: conjugateId,
    });
  }

  async findByPanelId(panelId: number) {
    return this.repository.find({
      panelId: panelId,
    });
  }
}
