import { ConjugateStatus } from "./ConjugateStatus";
export declare class ConjugateDto {
    readonly id: number;
    readonly groupId: number;
    readonly createdBy: number;
    readonly labeledBy: number;
    readonly finishedBy: number;
    readonly lotId: number;
    readonly tagId: number;
    readonly status: number;
    readonly tubeNumber: number;
    readonly concentration: number;
    readonly description: string;
    readonly isArchived: boolean;
    readonly meta: object;
    readonly labeledAt: string;
    readonly createdAt: string;
    readonly updatedAt: string;
}
export declare class CreateConjugateDto {
    readonly createdBy?: number;
    readonly groupId: number;
    readonly lotId: number;
    readonly tagId: number;
    readonly labeledBy: number | null;
    readonly concentration: number | null;
    readonly description: string;
}
export declare class UpdateConjugateDto {
    readonly lotId: number;
    readonly tagId: number;
    readonly labeledBy: number | null;
    readonly concentration: number | null;
    readonly description: string;
}
export declare class UpdateConjugateStatusDto {
    readonly status: ConjugateStatus;
}
//# sourceMappingURL=dto.d.ts.map