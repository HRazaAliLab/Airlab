export declare class GroupDto {
    readonly id: number;
    readonly name: string;
    readonly institution: string;
    readonly url: string;
    readonly isOpen: boolean;
    readonly meta: object;
    readonly createdAt: string;
}
export declare class CreateGroupDto {
    readonly name: string;
    readonly institution: string;
    readonly url: string;
    readonly isOpen: boolean;
}
export declare class UpdateGroupDto {
    readonly name: string;
    readonly institution: string;
    readonly url: string;
    readonly isOpen: boolean;
}
export declare class RequestJoinGroupDto {
    readonly groupId: number;
    readonly userId: number;
}
export declare class InviteDto {
    readonly groupId: number;
    readonly userId: number;
    readonly token: string;
}
//# sourceMappingURL=dto.d.ts.map