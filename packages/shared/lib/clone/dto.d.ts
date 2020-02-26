export declare class CloneDto {
    readonly id: number;
    readonly groupId: number;
    readonly createdBy: number;
    readonly proteinId: number;
    readonly speciesId: number;
    readonly name: string;
    readonly isotype: string;
    readonly epitope: string;
    readonly isPhospho: boolean;
    readonly isPolyclonal: boolean;
    readonly reactivity: number[];
    readonly application: object;
    readonly isArchived: boolean;
    readonly meta: object;
    readonly createdAt: string;
    readonly updatedAt: string;
}
export declare class CreateCloneDto {
    readonly createdBy?: number;
    readonly groupId: number;
    readonly proteinId: number;
    readonly speciesId: number;
    readonly name: string;
    readonly isotype: string;
    readonly epitope: string;
    readonly isPhospho: boolean;
    readonly isPolyclonal: boolean;
    readonly reactivity: number[];
    readonly application: object;
}
export declare class UpdateCloneDto {
    readonly proteinId: number;
    readonly speciesId: number;
    readonly name: string;
    readonly isotype: string;
    readonly epitope: string;
    readonly isPhospho: boolean;
    readonly isPolyclonal: boolean;
    readonly reactivity: number[];
    readonly application: object;
}
//# sourceMappingURL=dto.d.ts.map