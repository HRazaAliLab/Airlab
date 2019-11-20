const applicationMap = {
  0: "SMC",
  1: "IMC",
  2: "FC",
  3: "IF",
  4: "IHC",
};

export function applicationToString(value: number): string {
  return applicationMap[value];
}

const validationStatusMap = {
  0: "Yes",
  1: "So-So",
  2: "No",
  3: "Undefined",
};

export function validationStatusToString(value: number): string {
  return validationStatusMap[value];
}
