export declare class MemberDto {
    readonly id: number;
    readonly groupId: number;
    readonly userId: number;
    readonly role: number;
    readonly activationKey: string;
    readonly isActive: boolean;
    readonly allPanels: boolean;
    readonly createdAt: string;
    readonly updatedAt: string;
}
export declare class CreateMemberDto {
    readonly groupId: number;
    readonly userId: number;
    readonly role: number;
    readonly isActive: boolean;
    readonly allPanels: boolean;
}
export declare class UpdateMemberDto {
    readonly role: number;
    readonly isActive: boolean;
    readonly allPanels: boolean;
}
//# sourceMappingURL=dto.d.ts.map