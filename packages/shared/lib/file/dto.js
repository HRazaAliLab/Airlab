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
class FileDto {
}
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Number)
], FileDto.prototype, "id", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Number)
], FileDto.prototype, "groupId", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Number)
], FileDto.prototype, "createdBy", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], FileDto.prototype, "name", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], FileDto.prototype, "extension", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", Number)
], FileDto.prototype, "size", void 0);
__decorate([
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], FileDto.prototype, "hash", void 0);
__decorate([
    swagger_1.ApiModelPropertyOptional(),
    __metadata("design:type", Object)
], FileDto.prototype, "meta", void 0);
__decorate([
    swagger_1.ApiModelPropertyOptional(),
    __metadata("design:type", String)
], FileDto.prototype, "createdAt", void 0);
exports.FileDto = FileDto;
class CreateFileDto {
}
__decorate([
    class_validator_1.IsString(),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], CreateFileDto.prototype, "name", void 0);
exports.CreateFileDto = CreateFileDto;
class UpdateFileDto {
}
__decorate([
    class_validator_1.IsString(),
    swagger_1.ApiModelProperty(),
    __metadata("design:type", String)
], UpdateFileDto.prototype, "name", void 0);
exports.UpdateFileDto = UpdateFileDto;
//# sourceMappingURL=dto.js.map