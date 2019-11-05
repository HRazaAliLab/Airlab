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
class PlaceDto {
}
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Number)
], PlaceDto.prototype, "id", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Number)
], PlaceDto.prototype, "columns", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], PlaceDto.prototype, "name", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Number)
], PlaceDto.prototype, "parentId", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Number)
], PlaceDto.prototype, "rows", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Number)
], PlaceDto.prototype, "selves", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Number)
], PlaceDto.prototype, "tubeId", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], PlaceDto.prototype, "type", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Number)
], PlaceDto.prototype, "x", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Number)
], PlaceDto.prototype, "y", void 0);
exports.PlaceDto = PlaceDto;
class CreatePlaceDto {
}
__decorate([
    class_validator_1.IsString(),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], CreatePlaceDto.prototype, "name", void 0);
exports.CreatePlaceDto = CreatePlaceDto;
class UpdatePlaceDto {
}
__decorate([
    class_validator_1.IsString(),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], UpdatePlaceDto.prototype, "name", void 0);
exports.UpdatePlaceDto = UpdatePlaceDto;
//# sourceMappingURL=dto.js.map