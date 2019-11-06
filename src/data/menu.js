import { i18n } from "@/i18n";

export const affiliateMenu = [
  { header: "Menu" },
  { icon: "bar_chart", title: "Dashboard", name: "Dashboard" },
  {
    icon: "credit_card",
    title: i18n.t("menu.card"),
    name: "CardsList"
  },
  {
    icon: "attach_money",
    title: i18n.t("menu.transactions"),
    group: "",
    items: [
      {
        prependIcon: "arrow_back",
        title: i18n.t("menu.refillBalance"),
        name: "RefillStepper"
      },
      {
        prependIcon: "local_atm",
        title: i18n.t("menu.qrPay"),
        name: "PayStepper"
      },
      {
        prependIcon: "arrow_forward",
        title: i18n.t("menu.transferBalance"),
        name: "TransferStepper"
      }
    ]
  },
  {
    icon: "360",
    title: i18n.t("menu.paymentInstruments"),
    name: "PaymentInstrumentList"
  },
  {
    icon: "pages",
    title: i18n.t("menu.myBusiness"),
    group: "",
    items: [
      {
        prependIcon: "check",
        title: i18n.t("menu.liquidations"),
        name: "LiquidationList"
      },
      {
        prependIcon: "phonelink_ring",
        title: i18n.t("menu.devices"),
        name: "TerminalList"
      }
    ]
  }
];

export const clientMenu = [
  { header: "Menu" },
  { icon: "bar_chart", title: "Dashboard", name: "Dashboard" },
  {
    icon: "credit_card",
    title: i18n.t("menu.card"),
    name: "CardsList"
  },
  {
    icon: "attach_money",
    title: i18n.t("menu.transactions"),
    group: "",
    items: [
      {
        prependIcon: "arrow_back",
        title: i18n.t("menu.refillBalance"),
        name: "RefillStepper"
      },
      {
        prependIcon: "local_atm",
        title: i18n.t("menu.qrPay"),
        name: "PayStepper"
      },
      {
        prependIcon: "arrow_forward",
        title: i18n.t("menu.transferBalance"),
        name: "TransferStepper"
      }
    ]
  },
  {
    icon: "360",
    title: i18n.t("menu.paymentInstruments"),
    name: "PaymentInstrumentList"
  }
];

export const clientFabMenu = [
  {
    icon: "arrow_back",
    title: i18n.t("menu.refillBalance"),
    name: "/RefillStepper"
  },
  { icon: "local_atm", title: i18n.t("menu.qrPay"), name: "/PayStepper" },
  {
    icon: "arrow_forward",
    title: i18n.t("menu.transferBalance"),
    name: "/TransferStepper"
  }
];

export const affiliateFabMenu = [
  {
    icon: "phonelink_ring",
    title: i18n.t("menu.devices"),
    name: "/TerminalList"
  }
];
