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
class CommercialReagentDto {
}
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Number)
], CommercialReagentDto.prototype, "id", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], CommercialReagentDto.prototype, "name", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Number)
], CommercialReagentDto.prototype, "providerId", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], CommercialReagentDto.prototype, "reference", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Boolean)
], CommercialReagentDto.prototype, "isFavorite", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], CommercialReagentDto.prototype, "catchedInfo", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Number)
], CommercialReagentDto.prototype, "groupId", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Number)
], CommercialReagentDto.prototype, "createdBy", void 0);
exports.CommercialReagentDto = CommercialReagentDto;
class CreateCommercialReagentDto {
}
__decorate([
    class_validator_1.IsString(),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], CreateCommercialReagentDto.prototype, "name", void 0);
exports.CreateCommercialReagentDto = CreateCommercialReagentDto;
class UpdateCommercialReagentDto {
}
__decorate([
    class_validator_1.IsString(),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], UpdateCommercialReagentDto.prototype, "name", void 0);
exports.UpdateCommercialReagentDto = UpdateCommercialReagentDto;
//# sourceMappingURL=dto.js.map