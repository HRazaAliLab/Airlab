export declare class ProviderDto {
    readonly id: number;
    readonly groupId: number;
    readonly name: string;
    readonly description: string;
    readonly url: string;
    readonly meta: object;
    readonly createdAt: string;
}
export declare class CreateProviderDto {
    readonly groupId: number;
    readonly name: string;
    readonly description: string | null;
    readonly url: string | null;
}
export declare class UpdateProviderDto {
    readonly name: string;
    readonly description: string | null;
    readonly url: string | null;
}
//# sourceMappingURL=dto.d.ts.map