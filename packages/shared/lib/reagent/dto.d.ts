export declare class ReagentDto {
    readonly id: number;
    readonly groupId: number;
    readonly createdBy: number;
    readonly providerId: number;
    readonly name: string;
    readonly reference: string;
    readonly isDeleted: boolean;
    readonly meta: object;
    readonly createdAt: string;
}
export declare class CreateReagentDto {
    readonly createdBy?: number;
    readonly groupId: number;
    readonly providerId: number;
    readonly name: string;
    readonly reference: string;
    readonly meta: object | null;
}
export declare class UpdateReagentDto {
    readonly providerId: number;
    readonly name: string;
    readonly reference: string;
    readonly meta: object | null;
}
//# sourceMappingURL=dto.d.ts.map