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
    readonly status: string;
}
export declare class UpdateLotDto {
    readonly status: string;
}
//# sourceMappingURL=dto.d.ts.map