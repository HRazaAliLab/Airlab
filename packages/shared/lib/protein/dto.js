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
class ProteinDto {
}
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", Number)
], ProteinDto.prototype, "id", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", Number)
], ProteinDto.prototype, "groupId", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", Number)
], ProteinDto.prototype, "createdBy", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], ProteinDto.prototype, "name", void 0);
__decorate([
    swagger_1.ApiPropertyOptional(),
    __metadata("design:type", String)
], ProteinDto.prototype, "description", void 0);
__decorate([
    swagger_1.ApiPropertyOptional(),
    __metadata("design:type", Object)
], ProteinDto.prototype, "meta", void 0);
__decorate([
    swagger_1.ApiPropertyOptional(),
    __metadata("design:type", String)
], ProteinDto.prototype, "createdAt", void 0);
exports.ProteinDto = ProteinDto;
class CreateProteinDto {
}
__decorate([
    class_validator_1.IsInt(),
    swagger_1.ApiProperty(),
    __metadata("design:type", Number)
], CreateProteinDto.prototype, "groupId", void 0);
__decorate([
    class_validator_1.IsString(),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], CreateProteinDto.prototype, "name", void 0);
__decorate([
    class_validator_1.IsString(),
    swagger_1.ApiPropertyOptional(),
    __metadata("design:type", String)
], CreateProteinDto.prototype, "description", void 0);
exports.CreateProteinDto = CreateProteinDto;
class UpdateProteinDto {
}
__decorate([
    class_validator_1.IsString(),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], UpdateProteinDto.prototype, "name", void 0);
__decorate([
    class_validator_1.IsString(),
    swagger_1.ApiPropertyOptional(),
    __metadata("design:type", String)
], UpdateProteinDto.prototype, "description", void 0);
exports.UpdateProteinDto = UpdateProteinDto;
//# sourceMappingURL=dto.js.map