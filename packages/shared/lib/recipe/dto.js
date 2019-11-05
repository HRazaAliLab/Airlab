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
class RecipeDto {
}
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Number)
], RecipeDto.prototype, "id", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], RecipeDto.prototype, "purpose", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], RecipeDto.prototype, "title", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Boolean)
], RecipeDto.prototype, "isPublic", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], RecipeDto.prototype, "catchedInfo", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Number)
], RecipeDto.prototype, "createdBy", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Number)
], RecipeDto.prototype, "groupId", void 0);
exports.RecipeDto = RecipeDto;
class CreateRecipeDto {
}
__decorate([
    class_validator_1.IsString(),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], CreateRecipeDto.prototype, "purpose", void 0);
exports.CreateRecipeDto = CreateRecipeDto;
class UpdateRecipeDto {
}
__decorate([
    class_validator_1.IsString(),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], UpdateRecipeDto.prototype, "purpose", void 0);
exports.UpdateRecipeDto = UpdateRecipeDto;
//# sourceMappingURL=dto.js.map