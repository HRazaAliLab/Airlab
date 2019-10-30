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
class TagDto {
}
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Number)
], TagDto.prototype, "id", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], TagDto.prototype, "name", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], TagDto.prototype, "mw", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Boolean)
], TagDto.prototype, "isFluorphore", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Boolean)
], TagDto.prototype, "isMetal", void 0);
__decorate([
    swagger_1.ApiModelPropertyOptional(),
    __metadata("design:type", String)
], TagDto.prototype, "emission", void 0);
__decorate([
    swagger_1.ApiModelPropertyOptional(),
    __metadata("design:type", String)
], TagDto.prototype, "excitation", void 0);
exports.TagDto = TagDto;
class CreateTagDto {
}
__decorate([
    class_validator_1.IsString(),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], CreateTagDto.prototype, "name", void 0);
__decorate([
    class_validator_1.IsString(),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], CreateTagDto.prototype, "mw", void 0);
__decorate([
    class_validator_1.IsBoolean(),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Boolean)
], CreateTagDto.prototype, "isFluorphore", void 0);
__decorate([
    class_validator_1.IsBoolean(),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Boolean)
], CreateTagDto.prototype, "isMetal", void 0);
exports.CreateTagDto = CreateTagDto;
class UpdateTagDto {
}
__decorate([
    class_validator_1.IsString(),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], UpdateTagDto.prototype, "name", void 0);
__decorate([
    class_validator_1.IsString(),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], UpdateTagDto.prototype, "mw", void 0);
__decorate([
    class_validator_1.IsBoolean(),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Boolean)
], UpdateTagDto.prototype, "isFluorphore", void 0);
__decorate([
    class_validator_1.IsBoolean(),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Boolean)
], UpdateTagDto.prototype, "isMetal", void 0);
exports.UpdateTagDto = UpdateTagDto;
//# sourceMappingURL=dto.js.map