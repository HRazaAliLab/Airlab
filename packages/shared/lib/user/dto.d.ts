export declare class UserDto {
    readonly id: number;
    readonly name: string;
    readonly lastName: string;
    readonly email: string;
    readonly active: boolean;
}
export declare class ProfileDto {
    readonly id: number;
    readonly name: string;
    readonly lastName: string;
    readonly email: string;
}
export declare class UpdateProfileDto {
    readonly email: string;
    readonly name: string;
    readonly lastName: string;
}
export declare class CreateUserDto {
    readonly email: string;
    readonly name: string;
    readonly lastName: string;
    readonly password: string;
}
export declare class UpdateUserDto {
    readonly email: string;
    readonly name: string;
    readonly lastName: string;
    readonly password: string;
    readonly active: boolean;
}
//# sourceMappingURL=dto.d.ts.map