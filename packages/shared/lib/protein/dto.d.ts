export declare class ProteinDto {
    readonly id: number;
    readonly groupId: number;
    readonly createdBy: number;
    readonly name: string;
    readonly description: string;
    readonly meta: object;
    readonly createdAt: string;
}
export declare class CreateProteinDto {
    readonly createdBy?: number;
    readonly groupId: number;
    readonly name: string;
    readonly description: string;
}
export declare class UpdateProteinDto {
    readonly name: string;
    readonly description: string;
}
//# sourceMappingURL=dto.d.ts.map