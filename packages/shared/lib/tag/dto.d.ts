export declare class TagDto {
    readonly id: number;
    readonly groupId: number;
    readonly name: string;
    readonly isMetal: boolean;
    readonly isFluorophore: boolean;
    readonly mw: number | null;
    readonly emission: number | null;
    readonly excitation: number | null;
    readonly meta: object;
    readonly createdAt: string;
}
export declare class CreateTagDto {
    readonly groupId: number;
    readonly name: string;
    readonly isMetal: boolean;
    readonly isFluorophore: boolean;
    readonly mw: number | null;
    readonly emission: number | null;
    readonly excitation: number | null;
}
export declare class UpdateTagDto {
    readonly name: string;
    readonly isMetal: boolean;
    readonly isFluorophore: boolean;
    readonly mw: number | null;
    readonly emission: number | null;
    readonly excitation: number | null;
}
//# sourceMappingURL=dto.d.ts.map