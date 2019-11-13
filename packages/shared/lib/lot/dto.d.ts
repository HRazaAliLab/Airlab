export declare class LotDto {
    readonly id: number;
    readonly groupId: number;
    readonly createdBy: number;
    readonly reagentId: number;
    readonly providerId: number;
    readonly cloneId: number;
    readonly requestedBy: number;
    readonly approvedBy: number;
    readonly orderedBy: number;
    readonly receivedBy: number;
    readonly finishedBy: number;
    readonly number: string;
    readonly status: string;
    readonly purpose: string;
    readonly link: string;
    readonly requestedAt: string;
    readonly approvedAt: string;
    readonly orderedAt: string;
    readonly receivedAt: string;
    readonly finishedAt: string;
    readonly isLow: boolean;
    readonly isDeleted: boolean;
    readonly meta: object;
    readonly createdAt: string;
    readonly updatedAt: string;
}
export declare class CreateLotDto {
    readonly createdBy?: number;
    readonly status?: string;
    readonly groupId: number;
    readonly cloneId: number;
    readonly reagentId: number;
    readonly providerId: number;
    readonly number: string;
    readonly link: string | null;
    readonly purpose: string | null;
}
export declare class UpdateLotDto {
    readonly status?: string;
    readonly cloneId: number;
    readonly reagentId: number;
    readonly providerId: number;
    readonly number: string;
    readonly link: string | null;
    readonly purpose: string | null;
}
//# sourceMappingURL=dto.d.ts.map