export declare class CloneDto {
    readonly id: number;
    readonly groupId: number;
    readonly createdBy: number;
    readonly proteinId: number;
    readonly speciesId: number;
    readonly name: string;
    readonly isotype: string;
    readonly region: string;
    readonly isPhospho: boolean;
    readonly isPolyclonal: boolean;
    readonly reactivity: number[];
    readonly application: object;
    readonly isDeleted: boolean;
    readonly isPublic: boolean;
    readonly meta: object;
    readonly createdAt: string;
    readonly updatedAt: string;
}
export declare class CreateCloneDto {
    readonly name: string;
}
export declare class UpdateCloneDto {
    readonly name: string;
}
//# sourceMappingURL=dto.d.ts.map