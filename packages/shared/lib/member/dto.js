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
exports.UpdateMemberDto = exports.CreateMemberDto = exports.MemberDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
let MemberDto = /** @class */ (() => {
    class MemberDto {
    }
    __decorate([
        swagger_1.ApiProperty(),
        __metadata("design:type", Number)
    ], MemberDto.prototype, "id", void 0);
    __decorate([
        swagger_1.ApiProperty(),
        __metadata("design:type", Number)
    ], MemberDto.prototype, "groupId", void 0);
    __decorate([
        swagger_1.ApiProperty(),
        __metadata("design:type", Number)
    ], MemberDto.prototype, "userId", void 0);
    __decorate([
        swagger_1.ApiProperty(),
        __metadata("design:type", Number)
    ], MemberDto.prototype, "role", void 0);
    __decorate([
        swagger_1.ApiProperty(),
        __metadata("design:type", String)
    ], MemberDto.prototype, "activationKey", void 0);
    __decorate([
        swagger_1.ApiProperty(),
        __metadata("design:type", Boolean)
    ], MemberDto.prototype, "isActive", void 0);
    __decorate([
        swagger_1.ApiProperty(),
        __metadata("design:type", Boolean)
    ], MemberDto.prototype, "allPanels", void 0);
    __decorate([
        swagger_1.ApiProperty(),
        __metadata("design:type", String)
    ], MemberDto.prototype, "createdAt", void 0);
    __decorate([
        swagger_1.ApiProperty(),
        __metadata("design:type", String)
    ], MemberDto.prototype, "updatedAt", void 0);
    return MemberDto;
})();
exports.MemberDto = MemberDto;
let CreateMemberDto = /** @class */ (() => {
    class CreateMemberDto {
    }
    __decorate([
        class_validator_1.IsInt(),
        swagger_1.ApiProperty(),
        __metadata("design:type", Number)
    ], CreateMemberDto.prototype, "groupId", void 0);
    __decorate([
        class_validator_1.IsInt(),
        swagger_1.ApiProperty(),
        __metadata("design:type", Number)
    ], CreateMemberDto.prototype, "userId", void 0);
    __decorate([
        class_validator_1.IsInt(),
        swagger_1.ApiProperty(),
        __metadata("design:type", Number)
    ], CreateMemberDto.prototype, "role", void 0);
    __decorate([
        class_validator_1.IsBoolean(),
        swagger_1.ApiProperty(),
        __metadata("design:type", Boolean)
    ], CreateMemberDto.prototype, "isActive", void 0);
    __decorate([
        class_validator_1.IsBoolean(),
        swagger_1.ApiProperty(),
        __metadata("design:type", Boolean)
    ], CreateMemberDto.prototype, "allPanels", void 0);
    return CreateMemberDto;
})();
exports.CreateMemberDto = CreateMemberDto;
let UpdateMemberDto = /** @class */ (() => {
    class UpdateMemberDto {
    }
    __decorate([
        class_validator_1.IsInt(),
        swagger_1.ApiProperty(),
        __metadata("design:type", Number)
    ], UpdateMemberDto.prototype, "role", void 0);
    __decorate([
        class_validator_1.IsBoolean(),
        swagger_1.ApiProperty(),
        __metadata("design:type", Boolean)
    ], UpdateMemberDto.prototype, "isActive", void 0);
    __decorate([
        class_validator_1.IsBoolean(),
        swagger_1.ApiProperty(),
        __metadata("design:type", Boolean)
    ], UpdateMemberDto.prototype, "allPanels", void 0);
    return UpdateMemberDto;
})();
exports.UpdateMemberDto = UpdateMemberDto;
//# sourceMappingURL=dto.js.map