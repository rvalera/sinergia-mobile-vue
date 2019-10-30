import { i18n } from "@/i18n";
export const USER_STATUS_PENDING = "P";
export const USER_TYPE_APP = "A";
export const USER_TYPE_WORKSTATION = "W";
export const USER_TYPE_AFFILIATE = "A";
export const USER_TYPE_CLIENT = "C";

export const TERMINAL_TYPE_WORKSTATION = "W";
export const TERMINAL_TYPE_POS = "P";

export const TERMINAL_TYPES_ICONS = {
  [TERMINAL_TYPE_WORKSTATION]: "laptop",
  [TERMINAL_TYPE_POS]: "smartphone"
};

export const TERMINAL_TYPES = [
  {
    value: TERMINAL_TYPE_WORKSTATION,
    text: i18n.t("constant.workstation")
  },
  {
    value: TERMINAL_TYPE_POS,
    text: i18n.t("constant.pos")
  }
];

export const TERMINAL_STATUS_LOCK = "L";
export const TERMINAL_STATUS_ACTIVE = "A";
export const TERMINAL_STATUS_GENERATED = "G";

export const TERMINAL_STATUS_COLORS = {
  [TERMINAL_STATUS_LOCK]: "red",
  [TERMINAL_STATUS_ACTIVE]: "green",
  [TERMINAL_STATUS_GENERATED]: "yellow"
};

export const movementTypes = [
  {
    value: "T",
    text: i18n.t("constant.all")
  },
  {
    value: "A",
    text: i18n.t("constant.activation")
  },
  {
    value: "R",
    text: i18n.t("constant.refill")
  },
  {
    value: "P",
    text: i18n.t("constant.pay")
  }
];

export const genders = [
  { text: i18n.t("constant.male"), value: "M" },
  { text: i18n.t("constant.female"), value: "F" }
];
