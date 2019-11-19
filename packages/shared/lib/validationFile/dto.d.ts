export declare class ValidationFileDto {
    readonly id: number;
    readonly validationId: number;
    readonly createdBy: number;
    readonly hash: string;
    readonly size: number;
    readonly name: string;
    readonly extension: string;
    readonly meta: object;
    readonly createdAt: string;
}
export declare class CreateValidationFileDto {
    readonly createdBy?: number;
    readonly hash: string;
    readonly validationId: number;
    readonly name: string;
    readonly extension: string;
    readonly size: number;
}
export declare class UpdateValidationFileDto {
    readonly name: string;
}
//# sourceMappingURL=dto.d.ts.map