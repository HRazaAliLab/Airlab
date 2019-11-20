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
class CloneDto {
}
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Number)
], CloneDto.prototype, "id", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Number)
], CloneDto.prototype, "groupId", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Number)
], CloneDto.prototype, "createdBy", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Number)
], CloneDto.prototype, "proteinId", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Number)
], CloneDto.prototype, "speciesId", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Number)
], CloneDto.prototype, "prefferedTagId", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], CloneDto.prototype, "name", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], CloneDto.prototype, "isotype", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], CloneDto.prototype, "epitope", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Boolean)
], CloneDto.prototype, "isPhospho", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Boolean)
], CloneDto.prototype, "isPolyclonal", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Array)
], CloneDto.prototype, "reactivity", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Object)
], CloneDto.prototype, "application", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Boolean)
], CloneDto.prototype, "isDeleted", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Boolean)
], CloneDto.prototype, "isPublic", void 0);
__decorate([
    swagger_1.ApiModelPropertyOptional(),
    __metadata("design:type", Object)
], CloneDto.prototype, "meta", void 0);
__decorate([
    swagger_1.ApiModelPropertyOptional(),
    __metadata("design:type", String)
], CloneDto.prototype, "createdAt", void 0);
__decorate([
    swagger_1.ApiModelPropertyOptional(),
    __metadata("design:type", String)
], CloneDto.prototype, "updatedAt", void 0);
exports.CloneDto = CloneDto;
class CreateCloneDto {
}
__decorate([
    class_validator_1.IsInt(),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Number)
], CreateCloneDto.prototype, "groupId", void 0);
__decorate([
    class_validator_1.IsInt(),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Number)
], CreateCloneDto.prototype, "proteinId", void 0);
__decorate([
    class_validator_1.IsInt(),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Number)
], CreateCloneDto.prototype, "speciesId", void 0);
__decorate([
    class_validator_1.IsString(),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], CreateCloneDto.prototype, "name", void 0);
__decorate([
    class_validator_1.IsString(),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], CreateCloneDto.prototype, "isotype", void 0);
__decorate([
    class_validator_1.IsString(),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], CreateCloneDto.prototype, "epitope", void 0);
__decorate([
    class_validator_1.IsBoolean(),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Boolean)
], CreateCloneDto.prototype, "isPhospho", void 0);
__decorate([
    class_validator_1.IsBoolean(),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Boolean)
], CreateCloneDto.prototype, "isPolyclonal", void 0);
__decorate([
    class_validator_1.IsArray(),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Array)
], CreateCloneDto.prototype, "reactivity", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Object)
], CreateCloneDto.prototype, "application", void 0);
exports.CreateCloneDto = CreateCloneDto;
class UpdateCloneDto {
}
__decorate([
    class_validator_1.IsInt(),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Number)
], UpdateCloneDto.prototype, "proteinId", void 0);
__decorate([
    class_validator_1.IsInt(),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Number)
], UpdateCloneDto.prototype, "speciesId", void 0);
__decorate([
    class_validator_1.IsString(),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], UpdateCloneDto.prototype, "name", void 0);
__decorate([
    class_validator_1.IsString(),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], UpdateCloneDto.prototype, "isotype", void 0);
__decorate([
    class_validator_1.IsString(),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], UpdateCloneDto.prototype, "epitope", void 0);
__decorate([
    class_validator_1.IsBoolean(),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Boolean)
], UpdateCloneDto.prototype, "isPhospho", void 0);
__decorate([
    class_validator_1.IsBoolean(),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Boolean)
], UpdateCloneDto.prototype, "isPolyclonal", void 0);
__decorate([
    class_validator_1.IsArray(),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Array)
], UpdateCloneDto.prototype, "reactivity", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Object)
], UpdateCloneDto.prototype, "application", void 0);
exports.UpdateCloneDto = UpdateCloneDto;
//# sourceMappingURL=dto.js.map