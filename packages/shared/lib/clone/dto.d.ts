export declare class CloneDto {
    readonly id: number;
    readonly bindingRegion: string;
    readonly epitopeId: number;
    readonly isotype: string;
    readonly isPhospho: boolean;
    readonly isPolyclonal: boolean;
    readonly reactivity: string;
    readonly application: string;
    readonly name: string;
    readonly proteinId: number;
    readonly speciesHost: number;
    readonly public: boolean;
    readonly preferred: boolean;
    readonly groupId: number;
    readonly createdBy: number;
    readonly catchedInfo: string;
}
export declare class CreateCloneDto {
    readonly name: string;
    readonly proteinId: number;
    readonly bindingRegion: string;
    readonly isotype: string;
    readonly isPhospho: boolean;
    readonly isPolyclonal: boolean;
    readonly speciesHost: number;
    readonly reactivity: string;
    readonly application: string;
}
export declare class UpdateCloneDto {
    readonly name: string;
}
//# sourceMappingURL=dto.d.ts.map