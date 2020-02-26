export declare class PanelElementDataDto {
    readonly conjugateId: number;
    readonly dilutionType: number;
    readonly concentration?: number;
}
export declare class PanelDto {
    readonly id: number;
    readonly groupId: number;
    readonly createdBy: number;
    readonly name: string;
    readonly description: string;
    readonly isFluorophore: boolean;
    readonly isLocked: boolean;
    readonly application: number;
    readonly meta: object;
    readonly isArchived: boolean;
    readonly createdAt: string;
    readonly updatedAt: string;
    readonly elements: PanelElementDataDto[];
}
export declare class CreatePanelDto {
    readonly createdBy?: number;
    readonly groupId: number;
    readonly name: string;
    readonly description: string;
    readonly isFluorophore: boolean;
    readonly isLocked: boolean;
    readonly application: number | null;
    readonly elements: PanelElementDataDto[];
}
export declare class UpdatePanelDto {
    readonly name?: string;
    readonly description?: string;
    readonly isFluorophore?: boolean;
    readonly isLocked?: boolean;
    readonly application?: number | null;
    elements: PanelElementDataDto[];
}
export declare class DuplicatePanelDto {
    readonly createdBy?: number;
    readonly groupId: number;
    readonly name: string;
}
//# sourceMappingURL=dto.d.ts.map