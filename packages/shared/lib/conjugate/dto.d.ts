export declare class ConjugateDto {
    readonly id: number;
    readonly cellsUsedForValidation: string;
    readonly concentration: string;
    readonly contributorId: string;
    readonly cytobankLink: string;
    readonly cytofStainingConc: string;
    readonly dateOfLabeling: string;
    readonly labbookRef: string;
    readonly lotId: number;
    readonly tagId: number;
    readonly workingCondition: string;
    readonly bbTubeNumber: number;
    readonly relabeled: boolean;
    readonly tubPlaceId: number;
    readonly tubFinishedAt: string;
    readonly tubFinishedBy: number;
    readonly tubIsLow: boolean;
    readonly deleted: boolean;
    readonly groupId: number;
    readonly createdBy: number;
    readonly catchedInfo: string;
}
export declare class CreateConjugateDto {
    readonly workingCondition: string;
}
export declare class UpdateConjugateDto {
    readonly workingCondition: string;
}
//# sourceMappingURL=dto.d.ts.map