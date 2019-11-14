export declare class PanelDto {
    readonly id: number;
    readonly groupId: number;
    readonly createdBy: number;
    readonly name: string;
    readonly description: string;
    readonly details: object;
    readonly isFluor: boolean;
    readonly isProduction: boolean;
    readonly application: number;
    readonly meta: object;
    readonly isDeleted: boolean;
    readonly createdAt: string;
    readonly updatedAt: string;
}
export declare class CreatePanelDto {
    readonly createdBy?: number;
    readonly groupId: number;
    readonly name: string;
    readonly description: string;
    readonly isFluor: boolean;
    readonly isProduction: boolean;
    readonly application: number | null;
}
export declare class UpdatePanelDto {
    readonly name: string;
    readonly description: string;
    readonly isFluor: boolean;
    readonly isProduction: boolean;
    readonly application: number | null;
}
//# sourceMappingURL=dto.d.ts.map