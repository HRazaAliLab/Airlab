export declare class UserDto {
    readonly id: number;
    readonly email: string;
    readonly name: string;
    readonly isActive: boolean;
    readonly isAdmin: boolean;
    readonly createdAt: string;
    readonly updatedAt: string;
}
export declare class ProfileDto {
    readonly id: number;
    readonly name: string;
    readonly email: string;
    readonly isAdmin: boolean;
}
export declare class UpdateProfileDto {
    readonly email: string;
    readonly name: string;
}
export declare class CreateUserDto {
    readonly email: string;
    readonly name: string;
    readonly password: string;
}
export declare class UpdateUserDto {
    readonly email: string;
    readonly name: string;
    readonly isActive: boolean;
    readonly isAdmin: boolean;
    readonly password: string;
}
//# sourceMappingURL=dto.d.ts.map