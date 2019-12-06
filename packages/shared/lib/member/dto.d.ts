export declare class MemberDto {
    readonly id: number;
    readonly groupId: number;
    readonly userId: number;
    readonly role: number;
    readonly activationKey: string;
    readonly isActive: boolean;
    readonly canOrder: boolean;
    readonly canErase: boolean;
    readonly canFinances: boolean;
    readonly canPanels: boolean;
    readonly createdAt: string;
    readonly updatedAt: string;
}
export declare class CreateMemberDto {
    readonly groupId: number;
    readonly userId: number;
    readonly role: number;
    readonly isActive: boolean;
    readonly canOrder: boolean;
    readonly canErase: boolean;
    readonly canFinances: boolean;
    readonly canPanels: boolean;
}
export declare class UpdateMemberDto {
    readonly role: number;
    readonly isActive: boolean;
    readonly canOrder: boolean;
    readonly canErase: boolean;
    readonly canFinances: boolean;
    readonly canPanels: boolean;
}
//# sourceMappingURL=dto.d.ts.map