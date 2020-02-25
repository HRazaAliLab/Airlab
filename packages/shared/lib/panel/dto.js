"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class PanelDto {
}
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", Number)
], PanelDto.prototype, "id", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", Number)
], PanelDto.prototype, "groupId", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", Number)
], PanelDto.prototype, "createdBy", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], PanelDto.prototype, "name", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], PanelDto.prototype, "description", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", Array)
], PanelDto.prototype, "details", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", Boolean)
], PanelDto.prototype, "isFluor", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", Boolean)
], PanelDto.prototype, "isLocked", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", Number)
], PanelDto.prototype, "application", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", Object)
], PanelDto.prototype, "meta", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", Boolean)
], PanelDto.prototype, "isDeleted", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], PanelDto.prototype, "createdAt", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], PanelDto.prototype, "updatedAt", void 0);
exports.PanelDto = PanelDto;
class CreatePanelDto {
}
__decorate([
    class_validator_1.IsInt(),
    swagger_1.ApiProperty(),
    __metadata("design:type", Number)
], CreatePanelDto.prototype, "groupId", void 0);
__decorate([
    class_validator_1.IsString(),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], CreatePanelDto.prototype, "name", void 0);
__decorate([
    class_validator_1.IsString(),
    swagger_1.ApiPropertyOptional(),
    __metadata("design:type", String)
], CreatePanelDto.prototype, "description", void 0);
__decorate([
    class_validator_1.IsBoolean(),
    swagger_1.ApiProperty(),
    __metadata("design:type", Boolean)
], CreatePanelDto.prototype, "isFluor", void 0);
__decorate([
    class_validator_1.IsBoolean(),
    swagger_1.ApiProperty(),
    __metadata("design:type", Boolean)
], CreatePanelDto.prototype, "isLocked", void 0);
__decorate([
    class_validator_1.IsInt(),
    class_validator_1.IsOptional(),
    swagger_1.ApiProperty(),
    __metadata("design:type", Number)
], CreatePanelDto.prototype, "application", void 0);
__decorate([
    class_validator_1.IsOptional(),
    swagger_1.ApiPropertyOptional(),
    __metadata("design:type", Array)
], CreatePanelDto.prototype, "details", void 0);
exports.CreatePanelDto = CreatePanelDto;
class UpdatePanelDto {
}
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], UpdatePanelDto.prototype, "name", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    swagger_1.ApiPropertyOptional(),
    __metadata("design:type", String)
], UpdatePanelDto.prototype, "description", void 0);
__decorate([
    class_validator_1.IsBoolean(),
    class_validator_1.IsOptional(),
    swagger_1.ApiProperty(),
    __metadata("design:type", Boolean)
], UpdatePanelDto.prototype, "isFluor", void 0);
__decorate([
    class_validator_1.IsBoolean(),
    class_validator_1.IsOptional(),
    swagger_1.ApiProperty(),
    __metadata("design:type", Boolean)
], UpdatePanelDto.prototype, "isLocked", void 0);
__decorate([
    class_validator_1.IsInt(),
    class_validator_1.IsOptional(),
    swagger_1.ApiProperty(),
    __metadata("design:type", Number)
], UpdatePanelDto.prototype, "application", void 0);
__decorate([
    class_validator_1.IsOptional(),
    swagger_1.ApiPropertyOptional(),
    __metadata("design:type", Array)
], UpdatePanelDto.prototype, "details", void 0);
exports.UpdatePanelDto = UpdatePanelDto;
class DuplicatePanelDto {
}
__decorate([
    class_validator_1.IsInt(),
    swagger_1.ApiProperty(),
    __metadata("design:type", Number)
], DuplicatePanelDto.prototype, "groupId", void 0);
__decorate([
    class_validator_1.IsString(),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], DuplicatePanelDto.prototype, "name", void 0);
exports.DuplicatePanelDto = DuplicatePanelDto;
//# sourceMappingURL=dto.js.map