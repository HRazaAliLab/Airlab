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
class SpeciesProteinDto {
}
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Number)
], SpeciesProteinDto.prototype, "id", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Number)
], SpeciesProteinDto.prototype, "proteinId", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Number)
], SpeciesProteinDto.prototype, "speciesId", void 0);
exports.SpeciesProteinDto = SpeciesProteinDto;
class CreateSpeciesProteinDto {
}
__decorate([
    class_validator_1.IsString(),
    swagger_1.ApiModelPropertyOptional(),
    __metadata("design:type", String)
], CreateSpeciesProteinDto.prototype, "catchedInfo", void 0);
exports.CreateSpeciesProteinDto = CreateSpeciesProteinDto;
class UpdateSpeciesProteinDto {
}
__decorate([
    class_validator_1.IsString(),
    swagger_1.ApiModelPropertyOptional(),
    __metadata("design:type", String)
], UpdateSpeciesProteinDto.prototype, "catchedInfo", void 0);
exports.UpdateSpeciesProteinDto = UpdateSpeciesProteinDto;
//# sourceMappingURL=dto.js.map