import { ValidationDto } from "@airlab/shared/lib/validation/dto";
import { ConjugateDto } from "@airlab/shared/lib/conjugate/dto";

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
  100: "Admin",
  10: "Standard",
  0: "Guest",
};

export function roleToString(value: number): string {
  if (value === -1) {
    return "";
  }
  return roleMap[value];
}

export function getStatusColor(validation: ValidationDto) {
  switch (validation.status) {
    case 0:
      return "green lighten-1";
    case 1:
      return "orange lighten-1";
    case 2:
      return "red lighten-1";
    default:
      return "grey";
  }
}

const conjugateStatusMap = {
  0: "Normal",
  1: "Low",
  2: "Finished",
};

export function conjugateStatusToString(value: number): string {
  return conjugateStatusMap[value];
}

export function getConjugateStatusColor(conjugate: ConjugateDto) {
  switch (conjugate.status) {
    case 0:
      return "green lighten-1";
    case 1:
      return "orange lighten-1";
    case 2:
      return "red lighten-1";
    default:
      return "grey";
  }
}
