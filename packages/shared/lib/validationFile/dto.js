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
exports.UpdateValidationFileDto = exports.CreateValidationFileDto = exports.ValidationFileDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
let ValidationFileDto = /** @class */ (() => {
    class ValidationFileDto {
    }
    __decorate([
        swagger_1.ApiProperty(),
        __metadata("design:type", Number)
    ], ValidationFileDto.prototype, "id", void 0);
    __decorate([
        swagger_1.ApiProperty(),
        __metadata("design:type", Number)
    ], ValidationFileDto.prototype, "validationId", void 0);
    __decorate([
        swagger_1.ApiProperty(),
        __metadata("design:type", Number)
    ], ValidationFileDto.prototype, "createdBy", void 0);
    __decorate([
        swagger_1.ApiProperty(),
        __metadata("design:type", String)
    ], ValidationFileDto.prototype, "hash", void 0);
    __decorate([
        swagger_1.ApiProperty(),
        __metadata("design:type", Number)
    ], ValidationFileDto.prototype, "size", void 0);
    __decorate([
        swagger_1.ApiProperty(),
        __metadata("design:type", String)
    ], ValidationFileDto.prototype, "name", void 0);
    __decorate([
        swagger_1.ApiProperty(),
        __metadata("design:type", String)
    ], ValidationFileDto.prototype, "extension", void 0);
    __decorate([
        swagger_1.ApiPropertyOptional(),
        __metadata("design:type", String)
    ], ValidationFileDto.prototype, "description", void 0);
    __decorate([
        swagger_1.ApiPropertyOptional(),
        __metadata("design:type", Object)
    ], ValidationFileDto.prototype, "meta", void 0);
    __decorate([
        swagger_1.ApiPropertyOptional(),
        __metadata("design:type", String)
    ], ValidationFileDto.prototype, "createdAt", void 0);
    return ValidationFileDto;
})();
exports.ValidationFileDto = ValidationFileDto;
let CreateValidationFileDto = /** @class */ (() => {
    class CreateValidationFileDto {
    }
    __decorate([
        class_validator_1.IsString(),
        swagger_1.ApiProperty(),
        __metadata("design:type", String)
    ], CreateValidationFileDto.prototype, "hash", void 0);
    __decorate([
        class_validator_1.IsInt(),
        swagger_1.ApiProperty(),
        __metadata("design:type", Number)
    ], CreateValidationFileDto.prototype, "validationId", void 0);
    __decorate([
        class_validator_1.IsString(),
        swagger_1.ApiProperty(),
        __metadata("design:type", String)
    ], CreateValidationFileDto.prototype, "name", void 0);
    __decorate([
        class_validator_1.IsString(),
        swagger_1.ApiProperty(),
        __metadata("design:type", String)
    ], CreateValidationFileDto.prototype, "extension", void 0);
    __decorate([
        class_validator_1.IsInt(),
        swagger_1.ApiProperty(),
        __metadata("design:type", Number)
    ], CreateValidationFileDto.prototype, "size", void 0);
    return CreateValidationFileDto;
})();
exports.CreateValidationFileDto = CreateValidationFileDto;
let UpdateValidationFileDto = /** @class */ (() => {
    class UpdateValidationFileDto {
    }
    __decorate([
        class_validator_1.IsString(),
        swagger_1.ApiProperty(),
        __metadata("design:type", String)
    ], UpdateValidationFileDto.prototype, "name", void 0);
    return UpdateValidationFileDto;
})();
exports.UpdateValidationFileDto = UpdateValidationFileDto;
//# sourceMappingURL=dto.js.map