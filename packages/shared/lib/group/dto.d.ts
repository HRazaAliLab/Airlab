export declare class GroupDto {
    readonly id: number;
    readonly name: string;
    readonly createdBy: number;
    readonly acceptRequests: boolean;
    readonly institution: string;
    readonly coordinates: string;
    readonly catchedInfo: string;
    readonly url: string;
}
export declare class CreateGroupDto {
    readonly name: string;
    readonly acceptRequests: boolean;
    readonly institution: string;
    readonly coordinates: string;
    readonly url: string;
}
export declare class UpdateGroupDto {
    readonly name: string;
    readonly acceptRequests: boolean;
    readonly institution: string;
    readonly coordinates: string;
    readonly url: string;
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