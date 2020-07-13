import { LotStatus } from "./LotStatus";
export declare class LotDto {
    readonly id: number;
    readonly groupId: number;
    readonly createdBy: number;
    readonly cloneId: number;
    readonly providerId: number;
    readonly name: string;
    readonly reference: string;
    readonly requestedBy: number;
    readonly approvedBy: number;
    readonly orderedBy: number;
    readonly receivedBy: number;
    readonly finishedBy: number;
    readonly number: string;
    readonly status: number;
    readonly purpose: string;
    readonly url: string;
    readonly price: string;
    readonly note: string;
    readonly requestedAt: string;
    readonly approvedAt: string;
    readonly orderedAt: string;
    readonly receivedAt: string;
    readonly finishedAt: string;
    readonly isArchived: boolean;
    readonly meta: object;
    readonly createdAt: string;
    readonly updatedAt: string;
}
export declare class CreateLotDto {
    readonly createdBy?: number;
    readonly groupId: number;
    readonly cloneId: number;
    readonly providerId: number;
    readonly name: string;
    readonly reference: string;
    readonly number: string;
    readonly url: string | null;
    readonly purpose: string | null;
    readonly price?: string | null;
    readonly note?: string | null;
}
export declare class UpdateLotDto {
    readonly cloneId: number;
    readonly providerId: number;
    readonly name: string;
    readonly reference: string;
    readonly number: string;
    readonly url: string | null;
    readonly purpose: string | null;
    readonly price?: string | null;
    readonly note?: string | null;
}
export declare class UpdateLotStatusDto {
    readonly status: LotStatus;
    readonly lotNumber?: string;
}
//# sourceMappingURL=dto.d.ts.map