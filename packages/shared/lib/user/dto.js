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
exports.UpdateUserDto = exports.CreateUserDto = exports.UpdatePasswordDto = exports.UpdateProfileDto = exports.ProfileDto = exports.UserDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
let UserDto = /** @class */ (() => {
    class UserDto {
    }
    __decorate([
        swagger_1.ApiProperty(),
        __metadata("design:type", Number)
    ], UserDto.prototype, "id", void 0);
    __decorate([
        swagger_1.ApiProperty(),
        __metadata("design:type", String)
    ], UserDto.prototype, "email", void 0);
    __decorate([
        swagger_1.ApiProperty(),
        __metadata("design:type", String)
    ], UserDto.prototype, "name", void 0);
    __decorate([
        swagger_1.ApiProperty(),
        __metadata("design:type", Boolean)
    ], UserDto.prototype, "isActive", void 0);
    __decorate([
        swagger_1.ApiProperty(),
        __metadata("design:type", Boolean)
    ], UserDto.prototype, "isAdmin", void 0);
    __decorate([
        swagger_1.ApiProperty(),
        __metadata("design:type", String)
    ], UserDto.prototype, "createdAt", void 0);
    __decorate([
        swagger_1.ApiProperty(),
        __metadata("design:type", String)
    ], UserDto.prototype, "updatedAt", void 0);
    return UserDto;
})();
exports.UserDto = UserDto;
let ProfileDto = /** @class */ (() => {
    class ProfileDto {
    }
    __decorate([
        swagger_1.ApiProperty(),
        __metadata("design:type", Number)
    ], ProfileDto.prototype, "id", void 0);
    __decorate([
        swagger_1.ApiProperty(),
        __metadata("design:type", String)
    ], ProfileDto.prototype, "name", void 0);
    __decorate([
        swagger_1.ApiProperty(),
        __metadata("design:type", String)
    ], ProfileDto.prototype, "email", void 0);
    __decorate([
        swagger_1.ApiProperty(),
        __metadata("design:type", Boolean)
    ], ProfileDto.prototype, "isAdmin", void 0);
    return ProfileDto;
})();
exports.ProfileDto = ProfileDto;
let UpdateProfileDto = /** @class */ (() => {
    class UpdateProfileDto {
    }
    __decorate([
        class_validator_1.IsEmail(),
        swagger_1.ApiProperty(),
        __metadata("design:type", String)
    ], UpdateProfileDto.prototype, "email", void 0);
    __decorate([
        class_validator_1.IsString(),
        swagger_1.ApiProperty(),
        __metadata("design:type", String)
    ], UpdateProfileDto.prototype, "name", void 0);
    return UpdateProfileDto;
})();
exports.UpdateProfileDto = UpdateProfileDto;
let UpdatePasswordDto = /** @class */ (() => {
    class UpdatePasswordDto {
    }
    __decorate([
        class_validator_1.IsString(),
        swagger_1.ApiProperty(),
        __metadata("design:type", String)
    ], UpdatePasswordDto.prototype, "password", void 0);
    return UpdatePasswordDto;
})();
exports.UpdatePasswordDto = UpdatePasswordDto;
let CreateUserDto = /** @class */ (() => {
    class CreateUserDto {
    }
    __decorate([
        class_validator_1.IsEmail(),
        swagger_1.ApiProperty(),
        __metadata("design:type", String)
    ], CreateUserDto.prototype, "email", void 0);
    __decorate([
        class_validator_1.IsString(),
        swagger_1.ApiProperty(),
        __metadata("design:type", String)
    ], CreateUserDto.prototype, "name", void 0);
    __decorate([
        class_validator_1.IsString(),
        swagger_1.ApiProperty(),
        __metadata("design:type", String)
    ], CreateUserDto.prototype, "password", void 0);
    return CreateUserDto;
})();
exports.CreateUserDto = CreateUserDto;
let UpdateUserDto = /** @class */ (() => {
    class UpdateUserDto {
    }
    __decorate([
        class_validator_1.IsEmail(),
        swagger_1.ApiProperty(),
        __metadata("design:type", String)
    ], UpdateUserDto.prototype, "email", void 0);
    __decorate([
        class_validator_1.IsString(),
        swagger_1.ApiProperty(),
        __metadata("design:type", String)
    ], UpdateUserDto.prototype, "name", void 0);
    __decorate([
        class_validator_1.IsBoolean(),
        swagger_1.ApiProperty(),
        __metadata("design:type", Boolean)
    ], UpdateUserDto.prototype, "isActive", void 0);
    __decorate([
        class_validator_1.IsBoolean(),
        swagger_1.ApiProperty(),
        __metadata("design:type", Boolean)
    ], UpdateUserDto.prototype, "isAdmin", void 0);
    __decorate([
        class_validator_1.IsString(),
        swagger_1.ApiPropertyOptional(),
        __metadata("design:type", String)
    ], UpdateUserDto.prototype, "password", void 0);
    return UpdateUserDto;
})();
exports.UpdateUserDto = UpdateUserDto;
//# sourceMappingURL=dto.js.map