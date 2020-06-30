import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { GroupEntity } from "./group.entity";
import { MemberService } from "../member/member.service";
import * as crypto from "crypto";
import { CreateGroupDto, InviteDto, UpdateGroupDto } from "@airlab/shared/lib/group/dto";
import { PubSubService } from "../pubsub/pubsub.service";
import * as archiver from "archiver";
import { SpeciesService } from "../species/species.service";
import { TagService } from "../tag/tag.service";
import { ProviderService } from "../provider/provider.service";
import { ProteinService } from "../protein/protein.service";
import { UserService } from "../user/user.service";
import { exportObject } from "../utils/converters";
import { CloneService } from "../clone/clone.service";
import { LotService } from "../lot/lot.service";
import { ConjugateService } from "../conjugate/conjugate.service";
import { PanelService } from "../panel/panel.service";
import { PanelElementService } from "../panelElement/panelElement.service";
import { ValidationService } from "../validation/validation.service";
import { ValidationFileService } from "../validationFile/validationFile.service";

const privateKey = "fsdfC987XXasdf979werl$#";

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(GroupEntity)
    private readonly repository: Repository<GroupEntity>,
    private readonly userService: UserService,
    private readonly memberService: MemberService,
    private readonly speciesService: SpeciesService,
    private readonly tagService: TagService,
    private readonly providerService: ProviderService,
    private readonly proteinService: ProteinService,
    private readonly cloneService: CloneService,
    private readonly lotService: LotService,
    private readonly conjugateService: ConjugateService,
    private readonly panelService: PanelService,
    private readonly panelElementService: PanelElementService,
    private readonly validationService: ValidationService,
    private readonly validationFileService: ValidationFileService,
    private readonly pubSubService: PubSubService
  ) {}

  async create(params: CreateGroupDto) {
    await this.clearCache();
    return this.repository.save(params);
  }

  async findById(id: number) {
    return this.repository.findOne(id);
  }

  async update(id: number, params: UpdateGroupDto) {
    await this.repository.update(id, params);
    await this.clearCache();
    return this.findById(id);
  }

  async deleteById(id: number) {
    await this.clearCache();
    const result = await this.repository.delete(id);
    return result.affected === 1 ? id : undefined;
  }

  async findAll() {
    return this.repository
      .createQueryBuilder("group")
      .leftJoin("group.members", "members")
      .addSelect(["members.userId", "members.isActive"])
      .orderBy({ "group.id": "DESC" })
      .cache(`groups`, 1000 * 60 * 60)
      .getMany();
  }

  async joinGroup(userId: number, groupId: number) {
    const group = await this.findById(groupId);
    if (!group) {
      throw new NotFoundException("Group not found");
    }
    if (group.isOpen) {
      const requestExists = await this.memberService.checkRequest(userId, groupId);
      if (requestExists) {
        throw new ConflictException("Join request already exists");
      }
      if (!requestExists) {
        await this.memberService.createJoinRequest(userId, groupId);
        return true;
      }
    }
    return false;
  }

  async invite(params: InviteDto) {
    if (!this.checkPublicKey(params.token, params.userId)) {
      return;
    }
  }

  private checkPublicKey(publicKey: string, userId: number) {
    const compound = `${userId}${privateKey}${userId}`;
    const hash = crypto.createHash("sha1").update(compound).digest("hex");
    return publicKey === hash;
  }

  async exportGroupData(groupId: number, format: "json" | "csv" = "json") {
    const zip = archiver("zip");

    const group = await this.findById(groupId);
    zip.append(exportObject(group, format), { name: `group.${format}` });

    const users = await this.userService.exportGroupUsers(groupId);
    zip.append(exportObject(users, format), { name: `users.${format}` });

    const members = await this.memberService.exportGroupMembers(groupId);
    zip.append(exportObject(members, format), { name: `members.${format}` });

    const species = await this.speciesService.getGroupSpecies(groupId);
    zip.append(exportObject(species, format), { name: `species.${format}` });

    const tags = await this.tagService.getGroupTags(groupId);
    zip.append(exportObject(tags, format), { name: `tags.${format}` });

    const providers = await this.providerService.getGroupProviders(groupId);
    zip.append(exportObject(providers, format), { name: `providers.${format}` });

    const proteins = await this.proteinService.getGroupProteins(groupId);
    zip.append(exportObject(proteins, format), { name: `proteins.${format}` });

    const clones = await this.cloneService.getGroupClones(groupId);
    zip.append(exportObject(clones, format), { name: `clones.${format}` });

    const lots = await this.lotService.getGroupLots(groupId);
    zip.append(exportObject(lots, format), { name: `lots.${format}` });

    const conjugates = await this.conjugateService.getGroupConjugates(groupId);
    zip.append(exportObject(conjugates, format), { name: `conjugates.${format}` });

    const panels = await this.panelService.getGroupPanels(groupId);
    zip.append(exportObject(panels, format), { name: `panels.${format}` });

    const panelElements = await this.panelElementService.exportGroupElements(groupId);
    zip.append(exportObject(panelElements, format), { name: `panelElements.${format}` });

    const validations = await this.validationService.getGroupValidations(groupId);
    zip.append(exportObject(validations, format), { name: `validations.${format}` });

    const validationFiles = await this.validationFileService.exportGroupValidationFiles(groupId);
    zip.append(exportObject(validationFiles, format), { name: `validationFiles.${format}` });
    validationFiles.forEach((file) => {
      const dir = `/data/groups/${groupId}/uploads/validation/${file.validationId}`;
      const path = `${dir}/${file.hash}.${file.extension}`;
      zip.file(path, { name: `validationFiles/${file.hash}.${file.extension}` });
    });

    return zip;
  }

  async importGroupData(filename: string) {
    return null;
  }

  private async clearCache() {
    await this.repository.manager.connection.queryResultCache.remove([`groups`]);
  }
}
