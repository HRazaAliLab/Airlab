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
    readonly name: string;
    readonly reference: string;
}
export declare class UpdateReagentDto {
    readonly name: string;
    readonly reference: string;
    readonly isDeleted: boolean;
}
//# sourceMappingURL=dto.d.ts.map