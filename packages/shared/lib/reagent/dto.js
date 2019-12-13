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
class ReagentDto {
}
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", Number)
], ReagentDto.prototype, "id", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", Number)
], ReagentDto.prototype, "groupId", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", Number)
], ReagentDto.prototype, "createdBy", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", Number)
], ReagentDto.prototype, "providerId", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], ReagentDto.prototype, "name", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], ReagentDto.prototype, "reference", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", Boolean)
], ReagentDto.prototype, "isDeleted", void 0);
__decorate([
    swagger_1.ApiPropertyOptional(),
    __metadata("design:type", Object)
], ReagentDto.prototype, "meta", void 0);
__decorate([
    swagger_1.ApiPropertyOptional(),
    __metadata("design:type", String)
], ReagentDto.prototype, "createdAt", void 0);
exports.ReagentDto = ReagentDto;
class CreateReagentDto {
}
__decorate([
    class_validator_1.IsInt(),
    swagger_1.ApiProperty(),
    __metadata("design:type", Number)
], CreateReagentDto.prototype, "groupId", void 0);
__decorate([
    class_validator_1.IsInt(),
    swagger_1.ApiProperty(),
    __metadata("design:type", Number)
], CreateReagentDto.prototype, "providerId", void 0);
__decorate([
    class_validator_1.IsString(),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], CreateReagentDto.prototype, "name", void 0);
__decorate([
    class_validator_1.IsString(),
    swagger_1.ApiPropertyOptional(),
    __metadata("design:type", String)
], CreateReagentDto.prototype, "reference", void 0);
__decorate([
    class_validator_1.IsOptional(),
    swagger_1.ApiPropertyOptional(),
    __metadata("design:type", Object)
], CreateReagentDto.prototype, "meta", void 0);
exports.CreateReagentDto = CreateReagentDto;
class UpdateReagentDto {
}
__decorate([
    class_validator_1.IsInt(),
    swagger_1.ApiProperty(),
    __metadata("design:type", Number)
], UpdateReagentDto.prototype, "providerId", void 0);
__decorate([
    class_validator_1.IsString(),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], UpdateReagentDto.prototype, "name", void 0);
__decorate([
    class_validator_1.IsString(),
    swagger_1.ApiPropertyOptional(),
    __metadata("design:type", String)
], UpdateReagentDto.prototype, "reference", void 0);
__decorate([
    class_validator_1.IsOptional(),
    swagger_1.ApiPropertyOptional(),
    __metadata("design:type", Object)
], UpdateReagentDto.prototype, "meta", void 0);
exports.UpdateReagentDto = UpdateReagentDto;
//# sourceMappingURL=dto.js.map