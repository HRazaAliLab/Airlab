export declare class TagDto {
    readonly id: number;
    readonly groupId: number;
    readonly name: string;
    readonly mw: number | null;
    readonly isFluorophore: boolean;
    readonly isMetal: boolean;
    readonly meta: object;
    readonly createdAt: string;
}
export declare class CreateTagDto {
    readonly groupId: number;
    readonly name: string;
    readonly mw: number | null;
    readonly isFluorophore: boolean;
    readonly isMetal: boolean;
}
export declare class UpdateTagDto {
    readonly name: string;
    readonly mw: number | null;
    readonly isFluorophore: boolean;
    readonly isMetal: boolean;
}
//# sourceMappingURL=dto.d.ts.map