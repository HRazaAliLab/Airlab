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
class LotDto {
}
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", Number)
], LotDto.prototype, "id", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", Number)
], LotDto.prototype, "groupId", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", Number)
], LotDto.prototype, "createdBy", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", Number)
], LotDto.prototype, "cloneId", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", Number)
], LotDto.prototype, "providerId", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], LotDto.prototype, "name", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], LotDto.prototype, "reference", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", Number)
], LotDto.prototype, "requestedBy", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", Number)
], LotDto.prototype, "approvedBy", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", Number)
], LotDto.prototype, "orderedBy", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", Number)
], LotDto.prototype, "receivedBy", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", Number)
], LotDto.prototype, "finishedBy", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], LotDto.prototype, "number", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], LotDto.prototype, "status", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], LotDto.prototype, "purpose", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], LotDto.prototype, "url", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], LotDto.prototype, "price", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], LotDto.prototype, "note", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], LotDto.prototype, "requestedAt", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], LotDto.prototype, "approvedAt", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], LotDto.prototype, "orderedAt", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], LotDto.prototype, "receivedAt", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], LotDto.prototype, "finishedAt", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", Boolean)
], LotDto.prototype, "isLow", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", Boolean)
], LotDto.prototype, "isArchived", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", Object)
], LotDto.prototype, "meta", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], LotDto.prototype, "createdAt", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], LotDto.prototype, "updatedAt", void 0);
exports.LotDto = LotDto;
class CreateLotDto {
}
__decorate([
    class_validator_1.IsInt(),
    swagger_1.ApiProperty(),
    __metadata("design:type", Number)
], CreateLotDto.prototype, "groupId", void 0);
__decorate([
    class_validator_1.IsInt(),
    swagger_1.ApiProperty(),
    __metadata("design:type", Number)
], CreateLotDto.prototype, "cloneId", void 0);
__decorate([
    class_validator_1.IsInt(),
    swagger_1.ApiProperty(),
    __metadata("design:type", Number)
], CreateLotDto.prototype, "providerId", void 0);
__decorate([
    class_validator_1.IsString(),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], CreateLotDto.prototype, "name", void 0);
__decorate([
    class_validator_1.IsString(),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], CreateLotDto.prototype, "reference", void 0);
__decorate([
    class_validator_1.IsString(),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], CreateLotDto.prototype, "number", void 0);
__decorate([
    class_validator_1.IsUrl(),
    class_validator_1.IsOptional(),
    swagger_1.ApiPropertyOptional(),
    __metadata("design:type", String)
], CreateLotDto.prototype, "url", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    swagger_1.ApiPropertyOptional(),
    __metadata("design:type", String)
], CreateLotDto.prototype, "purpose", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    swagger_1.ApiPropertyOptional(),
    __metadata("design:type", String)
], CreateLotDto.prototype, "price", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    swagger_1.ApiPropertyOptional(),
    __metadata("design:type", String)
], CreateLotDto.prototype, "note", void 0);
exports.CreateLotDto = CreateLotDto;
class UpdateLotDto {
}
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    swagger_1.ApiPropertyOptional(),
    __metadata("design:type", String)
], UpdateLotDto.prototype, "status", void 0);
__decorate([
    class_validator_1.IsInt(),
    swagger_1.ApiProperty(),
    __metadata("design:type", Number)
], UpdateLotDto.prototype, "cloneId", void 0);
__decorate([
    class_validator_1.IsInt(),
    swagger_1.ApiProperty(),
    __metadata("design:type", Number)
], UpdateLotDto.prototype, "providerId", void 0);
__decorate([
    class_validator_1.IsString(),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], UpdateLotDto.prototype, "name", void 0);
__decorate([
    class_validator_1.IsString(),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], UpdateLotDto.prototype, "reference", void 0);
__decorate([
    class_validator_1.IsString(),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], UpdateLotDto.prototype, "number", void 0);
__decorate([
    class_validator_1.IsUrl(),
    class_validator_1.IsOptional(),
    swagger_1.ApiPropertyOptional(),
    __metadata("design:type", String)
], UpdateLotDto.prototype, "url", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    swagger_1.ApiPropertyOptional(),
    __metadata("design:type", String)
], UpdateLotDto.prototype, "purpose", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    swagger_1.ApiPropertyOptional(),
    __metadata("design:type", String)
], UpdateLotDto.prototype, "price", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    swagger_1.ApiPropertyOptional(),
    __metadata("design:type", String)
], UpdateLotDto.prototype, "note", void 0);
exports.UpdateLotDto = UpdateLotDto;
//# sourceMappingURL=dto.js.map