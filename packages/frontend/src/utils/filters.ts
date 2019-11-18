const applicationMap = {
  0: "SMC",
  1: "IMC",
  2: "FC",
  3: "IF",
  4: "IHC",
};

const validationStatusMap = {
  0: true,
  1: false,
  2: undefined,
};

export function convertApplicationNumberToString(value: number): string {
  return applicationMap[value];
}

export function convertValidationStatusToBoolean(value: number): boolean | undefined {
  return validationStatusMap[value];
}
