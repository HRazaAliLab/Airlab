import { ConflictException, Injectable, NotFoundException, NotImplementedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { GroupEntity } from "./group.entity";
import { MemberService } from "../member/member.service";
import * as crypto from "crypto";
import { CreateGroupDto, GroupDto, InviteDto, UpdateGroupDto } from "@airlab/shared/lib/group/dto";
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
import * as fs from "fs";
import { promises as fsAsync } from "fs";
import * as unzipper from "unzipper";

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

  async exportAll() {
    return this.repository.find();
  }

  async update(id: number, params: UpdateGroupDto) {
    await this.repository.update(id, params);
    await this.clearCache();
    return this.findById(id);
  }

  async deleteById(id: number) {
    await this.clearCache();
    const result = await this.repository.delete(id);
    const dir = `/data/groups/${id}`;
    await fsAsync.rmdir(dir, { recursive: true });
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

  async exportAllData(format: "json" | "csv" = "json") {
    const zip = archiver("zip");

    const groups = await this.exportAll();
    zip.append(exportObject(groups, format), { name: `groups.${format}` });

    const users = await this.userService.exportUsers();
    zip.append(exportObject(users, format), { name: `users.${format}` });

    const members = await this.memberService.exportMembers();
    zip.append(exportObject(members, format), { name: `members.${format}` });

    const species = await this.speciesService.exportSpecies();
    zip.append(exportObject(species, format), { name: `species.${format}` });

    const tags = await this.tagService.exportTags();
    zip.append(exportObject(tags, format), { name: `tags.${format}` });

    const providers = await this.providerService.exportProviders();
    zip.append(exportObject(providers, format), { name: `providers.${format}` });

    const proteins = await this.proteinService.exportProteins();
    zip.append(exportObject(proteins, format), { name: `proteins.${format}` });

    const clones = await this.cloneService.exportClones();
    zip.append(exportObject(clones, format), { name: `clones.${format}` });

    const lots = await this.lotService.exportLots();
    zip.append(exportObject(lots, format), { name: `lots.${format}` });

    const conjugates = await this.conjugateService.exportConjugates();
    zip.append(exportObject(conjugates, format), { name: `conjugates.${format}` });

    const panels = await this.panelService.exportPanels();
    zip.append(exportObject(panels, format), { name: `panels.${format}` });

    const panelElements = await this.panelElementService.exportPanelElements();
    zip.append(exportObject(panelElements, format), { name: `panelElements.${format}` });

    const validations = await this.validationService.exportValidations();
    zip.append(exportObject(validations, format), { name: `validations.${format}` });

    const validationFiles = await this.validationFileService.exportValidationFiles();
    zip.append(exportObject(validationFiles, format), { name: `validationFiles.${format}` });
    validationFiles.forEach((file) => {
      const dir = `/data/groups/${file.validation.groupId}/uploads/validation/${file.validationId}`;
      const path = `${dir}/${file.hash}.${file.extension}`;
      zip.file(path, { name: `validationFiles/${file.hash}.${file.extension}` });
    });

    return zip;
  }

  async exportGroupData(groupId: number, format: "json" | "csv" = "json") {
    const zip = archiver("zip");

    const group = await this.findById(groupId);
    zip.append(exportObject(group, format), { name: `group.${format}` });

    const users = await this.userService.exportUsers(groupId);
    zip.append(exportObject(users, format), { name: `users.${format}` });

    const members = await this.memberService.exportMembers(groupId);
    zip.append(exportObject(members, format), { name: `members.${format}` });

    const species = await this.speciesService.exportSpecies(groupId);
    zip.append(exportObject(species, format), { name: `species.${format}` });

    const tags = await this.tagService.exportTags(groupId);
    zip.append(exportObject(tags, format), { name: `tags.${format}` });

    const providers = await this.providerService.exportProviders(groupId);
    zip.append(exportObject(providers, format), { name: `providers.${format}` });

    const proteins = await this.proteinService.exportProteins(groupId);
    zip.append(exportObject(proteins, format), { name: `proteins.${format}` });

    const clones = await this.cloneService.exportClones(groupId);
    zip.append(exportObject(clones, format), { name: `clones.${format}` });

    const lots = await this.lotService.exportLots(groupId);
    zip.append(exportObject(lots, format), { name: `lots.${format}` });

    const conjugates = await this.conjugateService.exportConjugates(groupId);
    zip.append(exportObject(conjugates, format), { name: `conjugates.${format}` });

    const panels = await this.panelService.exportPanels(groupId);
    zip.append(exportObject(panels, format), { name: `panels.${format}` });

    const panelElements = await this.panelElementService.exportPanelElements(groupId);
    zip.append(exportObject(panelElements, format), { name: `panelElements.${format}` });

    const validations = await this.validationService.exportValidations(groupId);
    zip.append(exportObject(validations, format), { name: `validations.${format}` });

    const validationFiles = await this.validationFileService.exportValidationFiles(groupId);
    zip.append(exportObject(validationFiles, format), { name: `validationFiles.${format}` });
    validationFiles.forEach((file) => {
      const dir = `/data/groups/${groupId}/uploads/validation/${file.validationId}`;
      const path = `${dir}/${file.hash}.${file.extension}`;
      zip.file(path, { name: `validationFiles/${file.hash}.${file.extension}` });
    });

    return zip;
  }

  async importGroupData(path: string) {
    const srcFolder = "/data/import/groups/tmp";
    await fs
      .createReadStream(path)
      .pipe(unzipper.Extract({ path: srcFolder }))
      .promise();

    const [group, groupIdMap] = await this.importGroups(`${srcFolder}/group.json`); // Map old group id to new group id
    const usersIdMap = await this.importUsers(`${srcFolder}/users.json`);
    const membersIdMap = await this.importMembers(`${srcFolder}/members.json`, group.id, usersIdMap);
    const speciesIdMap = await this.importSpecies(`${srcFolder}/species.json`, group.id);
    const tagsIdMap = await this.importTags(`${srcFolder}/tags.json`, group.id);
    const providersIdMap = await this.importProviders(`${srcFolder}/providers.json`, group.id);
    const proteinsIdMap = await this.importProteins(`${srcFolder}/proteins.json`, group.id, membersIdMap);
    const clonesIdMap = await this.importClones(
      `${srcFolder}/clones.json`,
      group.id,
      membersIdMap,
      proteinsIdMap,
      speciesIdMap
    );
    const lotsIdMap = await this.importLots(
      `${srcFolder}/lots.json`,
      group.id,
      membersIdMap,
      clonesIdMap,
      providersIdMap
    );
    const conjugatesIdMap = await this.importConjugates(
      `${srcFolder}/conjugates.json`,
      group.id,
      membersIdMap,
      lotsIdMap,
      tagsIdMap
    );
    const panelsIdMap = await this.importPanels(`${srcFolder}/panels.json`, group.id, membersIdMap);
    const panelElementsIdMap = await this.importPanelElements(
      `${srcFolder}/panelElements.json`,
      panelsIdMap,
      conjugatesIdMap
    );
    const validationsIdMap = await this.importValidations(
      `${srcFolder}/validations.json`,
      group.id,
      membersIdMap,
      clonesIdMap,
      lotsIdMap,
      conjugatesIdMap,
      speciesIdMap
    );
    const validationFilesIdMap = await this.importValidationFiles(
      `${srcFolder}/validationFiles.json`,
      group.id,
      membersIdMap,
      validationsIdMap,
      `${srcFolder}/validationFiles`
    );

    await fsAsync.unlink(path);
    await fsAsync.rmdir(srcFolder, { recursive: true });
    return group;
  }

  async importAllData(path: string) {
    throw new NotImplementedException();
  }

  private async importGroups(path: string): Promise<[GroupDto, Map<number, number>]> {
    const data = await fsAsync.readFile(path, "utf8");
    const json = JSON.parse(data);
    const oldId = json.id;
    delete json.id;
    const group = await this.create(json);
    const map = new Map<number, number>();
    map.set(oldId, group.id);
    return [group, map];
  }

  private async importUsers(path: string) {
    const data = await fsAsync.readFile(path, "utf8");
    const json = JSON.parse(data);
    const map = new Map<number, number>();
    for (const item of json) {
      const oldId = item.id;
      const user = await this.userService.import(item);
      map.set(oldId, user.id);
    }
    return map;
  }

  private async importMembers(path: string, newGroupId: number, usersIdMap: Map<number, number>) {
    const data = await fsAsync.readFile(path, "utf8");
    const json = JSON.parse(data);
    const map = new Map<number, number>();
    for (const item of json) {
      const oldId = item.id;
      item.groupId = newGroupId;
      item.userId = usersIdMap.get(item.userId);
      const member = await this.memberService.import(item);
      map.set(oldId, member.id);
    }
    return map;
  }

  private async importSpecies(path: string, newGroupId: number) {
    const data = await fsAsync.readFile(path, "utf8");
    const json = JSON.parse(data);
    const map = new Map<number, number>();
    for (const item of json) {
      const oldId = item.id ? item.id : newGroupId;
      item.groupId = newGroupId;
      const species = await this.speciesService.import(item);
      map.set(oldId, species.id);
    }
    return map;
  }

  private async importTags(path: string, newGroupId: number) {
    const data = await fsAsync.readFile(path, "utf8");
    const json = JSON.parse(data);
    const map = new Map<number, number>();
    for (const item of json) {
      const oldId = item.id ? item.id : newGroupId;
      item.groupId = newGroupId;
      const tag = await this.tagService.import(item);
      map.set(oldId, tag.id);
    }
    return map;
  }

  private async importProviders(path: string, newGroupId: number) {
    const data = await fsAsync.readFile(path, "utf8");
    const json = JSON.parse(data);
    const map = new Map<number, number>();
    for (const item of json) {
      const oldId = item.id ? item.id : newGroupId;
      item.groupId = newGroupId;
      const provider = await this.providerService.import(item);
      map.set(oldId, provider.id);
    }
    return map;
  }

  private async importProteins(path: string, newGroupId: number, membersIdMap: Map<number, number>) {
    const data = await fsAsync.readFile(path, "utf8");
    const json = JSON.parse(data);
    const map = new Map<number, number>();
    for (const item of json) {
      const oldId = item.id ? item.id : newGroupId;
      item.groupId = newGroupId;
      item.createdBy = item.createdBy ? membersIdMap.get(item.createdBy) : membersIdMap.values().next().value;
      const protein = await this.proteinService.import(item);
      map.set(oldId, protein.id);
    }
    return map;
  }

  private async importClones(
    path: string,
    newGroupId: number,
    membersIdMap: Map<number, number>,
    proteinsIdMap: Map<number, number>,
    speciesIdMap: Map<number, number>
  ) {
    if (!fs.existsSync(path)) {
      return null;
    }
    const data = await fsAsync.readFile(path, "utf8");
    const json = JSON.parse(data);
    const map = new Map<number, number>();
    for (const item of json) {
      const oldId = item.id;
      item.groupId = newGroupId;
      item.createdBy = membersIdMap.get(item.createdBy);
      item.proteinId = proteinsIdMap.get(item.proteinId);
      item.speciesId = speciesIdMap.get(item.speciesId);
      item.reactivity = item.reactivity.map((item) => speciesIdMap.get(item));
      const clone = await this.cloneService.import(item);
      map.set(oldId, clone.id);
    }
    return map;
  }

  private async importLots(
    path: string,
    newGroupId: number,
    membersIdMap: Map<number, number>,
    clonesIdMap: Map<number, number>,
    providersIdMap: Map<number, number>
  ) {
    if (!fs.existsSync(path)) {
      return null;
    }
    const data = await fsAsync.readFile(path, "utf8");
    const json = JSON.parse(data);
    const map = new Map<number, number>();
    for (const item of json) {
      const oldId = item.id;
      item.groupId = newGroupId;
      item.createdBy = membersIdMap.get(item.createdBy);
      item.cloneId = clonesIdMap.get(item.cloneId);
      item.providerId = providersIdMap.get(item.providerId);
      item.requestedBy = membersIdMap.get(item.requestedBy);
      item.approvedBy = membersIdMap.get(item.approvedBy);
      item.orderedBy = membersIdMap.get(item.orderedBy);
      item.receivedBy = membersIdMap.get(item.receivedBy);
      item.finishedBy = membersIdMap.get(item.finishedBy);
      const lot = await this.lotService.import(item);
      map.set(oldId, lot.id);
    }
    return map;
  }

  private async importConjugates(
    path: string,
    newGroupId: number,
    membersIdMap: Map<number, number>,
    lotsIdMap: Map<number, number>,
    tagsIdMap: Map<number, number>
  ) {
    if (!fs.existsSync(path)) {
      return null;
    }
    const data = await fsAsync.readFile(path, "utf8");
    const json = JSON.parse(data);
    const map = new Map<number, number>();
    for (const item of json) {
      const oldId = item.id;
      item.groupId = newGroupId;
      item.createdBy = membersIdMap.get(item.createdBy);
      item.labeledBy = membersIdMap.get(item.labeledBy);
      item.finishedBy = membersIdMap.get(item.finishedBy);
      item.lotId = lotsIdMap.get(item.lotId);
      item.tagId = tagsIdMap.get(item.tagId);
      const conjugate = await this.conjugateService.import(item);
      map.set(oldId, conjugate.id);
    }
    return map;
  }

  private async importPanels(path: string, newGroupId: number, membersIdMap: Map<number, number>) {
    if (!fs.existsSync(path)) {
      return null;
    }
    const data = await fsAsync.readFile(path, "utf8");
    const json = JSON.parse(data);
    const map = new Map<number, number>();
    for (const item of json) {
      const oldId = item.id;
      item.groupId = newGroupId;
      item.createdBy = membersIdMap.get(item.createdBy);
      const panel = await this.panelService.import(item);
      map.set(oldId, panel.id);
    }
    return map;
  }

  private async importPanelElements(
    path: string,
    panelsIdMap: Map<number, number>,
    conjugatesIdMap: Map<number, number>
  ) {
    if (!fs.existsSync(path)) {
      return null;
    }
    const data = await fsAsync.readFile(path, "utf8");
    const json = JSON.parse(data);
    const map = new Map<number, number>();
    for (const item of json) {
      const oldId = item.id;
      item.panelId = panelsIdMap.get(item.panelId);
      item.conjugateId = conjugatesIdMap.get(item.conjugateId);
      const panelElement = await this.panelElementService.import(item);
      map.set(oldId, panelElement.id);
    }
    return map;
  }

  private async importValidations(
    path: string,
    newGroupId: number,
    membersIdMap: Map<number, number>,
    clonesIdMap: Map<number, number>,
    lotsIdMap: Map<number, number>,
    conjugatesIdMap: Map<number, number>,
    speciesIdMap: Map<number, number>
  ) {
    if (!fs.existsSync(path)) {
      return null;
    }
    const data = await fsAsync.readFile(path, "utf8");
    const json = JSON.parse(data);
    const map = new Map<number, number>();
    for (const item of json) {
      const oldId = item.id;
      item.groupId = newGroupId;
      item.createdBy = membersIdMap.get(item.createdBy);
      item.cloneId = clonesIdMap.get(item.cloneId);
      item.lotId = lotsIdMap.get(item.lotId);
      item.conjugateId = conjugatesIdMap.get(item.conjugateId);
      item.speciesId = speciesIdMap.get(item.speciesId);
      const validation = await this.validationService.import(item);
      map.set(oldId, validation.id);
    }
    return map;
  }

  private async importValidationFiles(
    path: string,
    newGroupId: number,
    membersIdMap: Map<number, number>,
    validationsIdMap: Map<number, number>,
    validationFilesFolder: string
  ) {
    if (!fs.existsSync(path)) {
      return null;
    }
    const data = await fsAsync.readFile(path, "utf8");
    const json = JSON.parse(data);
    const map = new Map<number, number>();
    for (const item of json) {
      if (item.hasOwnProperty("validation")) {
        delete item.validation;
      }
      const oldId = item.id;
      item.createdBy = membersIdMap.get(item.createdBy);
      item.validationId = validationsIdMap.get(item.validationId);
      const validationFile = await this.validationFileService.import(item);
      map.set(oldId, validationFile.id);

      const filename = `${validationFile.hash}.${validationFile.extension}`;
      const srcFile = `${validationFilesFolder}/${filename}`;
      if (fs.existsSync(srcFile)) {
        const destFolder = `/data/groups/${newGroupId}/uploads/validation/${validationFile.validationId}`;
        if (!fs.existsSync(destFolder)) {
          await fsAsync.mkdir(destFolder, { recursive: true });
        }
        await fsAsync.copyFile(srcFile, `${destFolder}/${filename}`);
      }
    }
    return map;
  }

  private async clearCache() {
    await this.repository.manager.connection.queryResultCache.remove([`groups`]);
  }
}
