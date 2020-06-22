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
exports.UploadValidationDto = exports.UpdateValidationDto = exports.CreateValidationDto = exports.ValidationDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class ValidationDto {
}
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", Number)
], ValidationDto.prototype, "id", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", Number)
], ValidationDto.prototype, "groupId", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", Number)
], ValidationDto.prototype, "createdBy", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", Number)
], ValidationDto.prototype, "cloneId", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", Number)
], ValidationDto.prototype, "lotId", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", Number)
], ValidationDto.prototype, "conjugateId", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", Number)
], ValidationDto.prototype, "speciesId", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", Number)
], ValidationDto.prototype, "application", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], ValidationDto.prototype, "positiveControl", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], ValidationDto.prototype, "negativeControl", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], ValidationDto.prototype, "incubationConditions", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], ValidationDto.prototype, "concentration", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], ValidationDto.prototype, "concentrationUnit", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], ValidationDto.prototype, "tissue", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", Number)
], ValidationDto.prototype, "fixation", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], ValidationDto.prototype, "fixationNotes", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], ValidationDto.prototype, "notes", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", Number)
], ValidationDto.prototype, "status", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], ValidationDto.prototype, "antigenRetrievalType", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], ValidationDto.prototype, "antigenRetrievalTime", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], ValidationDto.prototype, "antigenRetrievalTemperature", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", Boolean)
], ValidationDto.prototype, "saponin", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], ValidationDto.prototype, "saponinConcentration", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", Boolean)
], ValidationDto.prototype, "methanolTreatment", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], ValidationDto.prototype, "methanolTreatmentConcentration", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", Boolean)
], ValidationDto.prototype, "surfaceStaining", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], ValidationDto.prototype, "surfaceStainingConcentration", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", Object)
], ValidationDto.prototype, "meta", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", Boolean)
], ValidationDto.prototype, "isArchived", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], ValidationDto.prototype, "createdAt", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], ValidationDto.prototype, "updatedAt", void 0);
exports.ValidationDto = ValidationDto;
class CreateValidationDto {
}
__decorate([
    class_validator_1.IsInt(),
    swagger_1.ApiProperty(),
    __metadata("design:type", Number)
], CreateValidationDto.prototype, "groupId", void 0);
__decorate([
    class_validator_1.IsInt(),
    swagger_1.ApiProperty(),
    __metadata("design:type", Number)
], CreateValidationDto.prototype, "cloneId", void 0);
__decorate([
    class_validator_1.IsInt(),
    class_validator_1.IsOptional(),
    swagger_1.ApiPropertyOptional(),
    __metadata("design:type", Number)
], CreateValidationDto.prototype, "lotId", void 0);
__decorate([
    class_validator_1.IsInt(),
    class_validator_1.IsOptional(),
    swagger_1.ApiPropertyOptional(),
    __metadata("design:type", Number)
], CreateValidationDto.prototype, "conjugateId", void 0);
__decorate([
    class_validator_1.IsInt(),
    class_validator_1.IsOptional(),
    swagger_1.ApiPropertyOptional(),
    __metadata("design:type", Number)
], CreateValidationDto.prototype, "speciesId", void 0);
__decorate([
    class_validator_1.IsInt(),
    swagger_1.ApiProperty(),
    __metadata("design:type", Number)
], CreateValidationDto.prototype, "application", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    swagger_1.ApiPropertyOptional(),
    __metadata("design:type", String)
], CreateValidationDto.prototype, "positiveControl", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    swagger_1.ApiPropertyOptional(),
    __metadata("design:type", String)
], CreateValidationDto.prototype, "negativeControl", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    swagger_1.ApiPropertyOptional(),
    __metadata("design:type", String)
], CreateValidationDto.prototype, "incubationConditions", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    swagger_1.ApiPropertyOptional(),
    __metadata("design:type", String)
], CreateValidationDto.prototype, "concentration", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    swagger_1.ApiPropertyOptional(),
    __metadata("design:type", String)
], CreateValidationDto.prototype, "concentrationUnit", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    swagger_1.ApiPropertyOptional(),
    __metadata("design:type", String)
], CreateValidationDto.prototype, "tissue", void 0);
__decorate([
    class_validator_1.IsInt(),
    class_validator_1.IsOptional(),
    swagger_1.ApiPropertyOptional(),
    __metadata("design:type", Number)
], CreateValidationDto.prototype, "fixation", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    swagger_1.ApiPropertyOptional(),
    __metadata("design:type", String)
], CreateValidationDto.prototype, "fixationNotes", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    swagger_1.ApiPropertyOptional(),
    __metadata("design:type", String)
], CreateValidationDto.prototype, "notes", void 0);
__decorate([
    class_validator_1.IsInt(),
    swagger_1.ApiProperty(),
    __metadata("design:type", Number)
], CreateValidationDto.prototype, "status", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    swagger_1.ApiPropertyOptional(),
    __metadata("design:type", String)
], CreateValidationDto.prototype, "antigenRetrievalType", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    swagger_1.ApiPropertyOptional(),
    __metadata("design:type", String)
], CreateValidationDto.prototype, "antigenRetrievalTime", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    swagger_1.ApiPropertyOptional(),
    __metadata("design:type", String)
], CreateValidationDto.prototype, "antigenRetrievalTemperature", void 0);
__decorate([
    class_validator_1.IsBoolean(),
    class_validator_1.IsOptional(),
    swagger_1.ApiPropertyOptional(),
    __metadata("design:type", Boolean)
], CreateValidationDto.prototype, "saponin", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    swagger_1.ApiPropertyOptional(),
    __metadata("design:type", String)
], CreateValidationDto.prototype, "saponinConcentration", void 0);
__decorate([
    class_validator_1.IsBoolean(),
    class_validator_1.IsOptional(),
    swagger_1.ApiPropertyOptional(),
    __metadata("design:type", Boolean)
], CreateValidationDto.prototype, "methanolTreatment", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    swagger_1.ApiPropertyOptional(),
    __metadata("design:type", String)
], CreateValidationDto.prototype, "methanolTreatmentConcentration", void 0);
__decorate([
    class_validator_1.IsBoolean(),
    class_validator_1.IsOptional(),
    swagger_1.ApiPropertyOptional(),
    __metadata("design:type", Boolean)
], CreateValidationDto.prototype, "surfaceStaining", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    swagger_1.ApiPropertyOptional(),
    __metadata("design:type", String)
], CreateValidationDto.prototype, "surfaceStainingConcentration", void 0);
exports.CreateValidationDto = CreateValidationDto;
class UpdateValidationDto {
}
__decorate([
    class_validator_1.IsInt(),
    swagger_1.ApiProperty(),
    __metadata("design:type", Number)
], UpdateValidationDto.prototype, "cloneId", void 0);
__decorate([
    class_validator_1.IsInt(),
    class_validator_1.IsOptional(),
    swagger_1.ApiPropertyOptional(),
    __metadata("design:type", Number)
], UpdateValidationDto.prototype, "lotId", void 0);
__decorate([
    class_validator_1.IsInt(),
    class_validator_1.IsOptional(),
    swagger_1.ApiPropertyOptional(),
    __metadata("design:type", Number)
], UpdateValidationDto.prototype, "conjugateId", void 0);
__decorate([
    class_validator_1.IsInt(),
    class_validator_1.IsOptional(),
    swagger_1.ApiPropertyOptional(),
    __metadata("design:type", Number)
], UpdateValidationDto.prototype, "speciesId", void 0);
__decorate([
    class_validator_1.IsInt(),
    swagger_1.ApiProperty(),
    __metadata("design:type", Number)
], UpdateValidationDto.prototype, "application", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    swagger_1.ApiPropertyOptional(),
    __metadata("design:type", String)
], UpdateValidationDto.prototype, "positiveControl", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    swagger_1.ApiPropertyOptional(),
    __metadata("design:type", String)
], UpdateValidationDto.prototype, "negativeControl", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    swagger_1.ApiPropertyOptional(),
    __metadata("design:type", String)
], UpdateValidationDto.prototype, "incubationConditions", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    swagger_1.ApiPropertyOptional(),
    __metadata("design:type", String)
], UpdateValidationDto.prototype, "concentration", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    swagger_1.ApiPropertyOptional(),
    __metadata("design:type", String)
], UpdateValidationDto.prototype, "concentrationUnit", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    swagger_1.ApiPropertyOptional(),
    __metadata("design:type", String)
], UpdateValidationDto.prototype, "tissue", void 0);
__decorate([
    class_validator_1.IsInt(),
    class_validator_1.IsOptional(),
    swagger_1.ApiPropertyOptional(),
    __metadata("design:type", Number)
], UpdateValidationDto.prototype, "fixation", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    swagger_1.ApiPropertyOptional(),
    __metadata("design:type", String)
], UpdateValidationDto.prototype, "fixationNotes", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    swagger_1.ApiPropertyOptional(),
    __metadata("design:type", String)
], UpdateValidationDto.prototype, "notes", void 0);
__decorate([
    class_validator_1.IsInt(),
    swagger_1.ApiProperty(),
    __metadata("design:type", Number)
], UpdateValidationDto.prototype, "status", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    swagger_1.ApiPropertyOptional(),
    __metadata("design:type", String)
], UpdateValidationDto.prototype, "antigenRetrievalType", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    swagger_1.ApiPropertyOptional(),
    __metadata("design:type", String)
], UpdateValidationDto.prototype, "antigenRetrievalTime", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    swagger_1.ApiPropertyOptional(),
    __metadata("design:type", String)
], UpdateValidationDto.prototype, "antigenRetrievalTemperature", void 0);
__decorate([
    class_validator_1.IsBoolean(),
    class_validator_1.IsOptional(),
    swagger_1.ApiPropertyOptional(),
    __metadata("design:type", Boolean)
], UpdateValidationDto.prototype, "saponin", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    swagger_1.ApiPropertyOptional(),
    __metadata("design:type", String)
], UpdateValidationDto.prototype, "saponinConcentration", void 0);
__decorate([
    class_validator_1.IsBoolean(),
    class_validator_1.IsOptional(),
    swagger_1.ApiPropertyOptional(),
    __metadata("design:type", Boolean)
], UpdateValidationDto.prototype, "methanolTreatment", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    swagger_1.ApiPropertyOptional(),
    __metadata("design:type", String)
], UpdateValidationDto.prototype, "methanolTreatmentConcentration", void 0);
__decorate([
    class_validator_1.IsBoolean(),
    class_validator_1.IsOptional(),
    swagger_1.ApiPropertyOptional(),
    __metadata("design:type", Boolean)
], UpdateValidationDto.prototype, "surfaceStaining", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    swagger_1.ApiPropertyOptional(),
    __metadata("design:type", String)
], UpdateValidationDto.prototype, "surfaceStainingConcentration", void 0);
exports.UpdateValidationDto = UpdateValidationDto;
class UploadValidationDto {
}
__decorate([
    class_validator_1.IsString(),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], UploadValidationDto.prototype, "groupId", void 0);
exports.UploadValidationDto = UploadValidationDto;
//# sourceMappingURL=dto.js.map