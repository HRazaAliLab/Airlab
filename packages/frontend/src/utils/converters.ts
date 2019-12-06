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

const roleMap = {
  0: "PI",
  1: "Manager",
  2: "Postdoc",
  3: "Ph.D. Student",
  4: "Visiting",
  5: "Other",
};

export function roleToString(value: number): string {
  if (value === -1) {
    return "";
  }
  return roleMap[value];
}
