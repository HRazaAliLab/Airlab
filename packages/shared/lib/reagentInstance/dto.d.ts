export declare class ReagentInstanceDto {
    readonly id: number;
    readonly commertialReagentId: number;
    readonly status: string;
    readonly requestedBy: number;
    readonly orderedBy: number;
    readonly approvedBy: number;
    readonly receivedBy: number;
    readonly purpose: string;
    readonly tubFinishedBy: number;
    readonly requestedAt: string;
    readonly approvedAt: string;
    readonly orderedAt: string;
    readonly receivedAt: string;
    readonly tubFinishedAt: string;
    readonly catchedInfo: string;
    readonly createdBy: number;
    readonly createdAt: string;
    readonly groupId: number;
    readonly tubPlaceId: number;
    readonly deleted: boolean;
    readonly inactivatedAt: string;
    readonly inactivatedBy: number;
    readonly lotNumber: string;
    readonly lotCloneId: number;
    readonly lotConcentration: string;
    readonly lotExpirationDate: string;
    readonly lotProviderId: number;
    readonly lotDataSheetLink: string;
    readonly tubIsLow: boolean;
}
export declare class CreateReagentInstanceDto {
    readonly status: string;
}
export declare class UpdateReagentInstanceDto {
    readonly status: string;
}
//# sourceMappingURL=dto.d.ts.map