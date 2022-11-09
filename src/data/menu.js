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
    icon: "format_list_bulleted",
    title: i18n.t("menu.movements"),
    name: "/MovementContainer"
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
  // { icon: "bar_chart", title: "Dashboard", name: "Dashboard" },
  // {
  //   icon: "credit_card",
  //   title: i18n.t("menu.card"),
  //   name: "CardsList"
  // },
  // {
  //   icon: "format_list_bulleted",
  //   title: i18n.t("menu.movements"),
  //   name: "/MovementContainer"
  // },
  // {
  //   icon: "attach_money",
  //   title: i18n.t("menu.transactions"),
  //   group: "",
  //   items: [
  //     {
  //       prependIcon: "arrow_back",
  //       title: i18n.t("menu.refillBalance"),
  //       name: "RefillStepper"
  //     },
  //     {
  //       prependIcon: "local_atm",
  //       title: i18n.t("menu.qrPay"),
  //       name: "PayStepper"
  //     },
  //     {
  //       prependIcon: "arrow_forward",
  //       title: i18n.t("menu.transferBalance"),
  //       name: "TransferStepper"
  //     }
  //   ]
  // },
  {
    icon: "mdi-view-sequential",
    title: i18n.t("menu.myTimeline"),
    name: "Content"
  },
  {
    icon: "mdi-sitemap",
    title: i18n.t("menu.mySites"),
    name: "Site"
  },
  {
    icon: "mdi-file-document",
    title: i18n.t("menu.myContents"),
    name: "ContentUser"
  },
  {
    icon: "mdi-wallet",
    title: i18n.t("menu.wallet.myWallet"),
    group: "",
    items: [
      {
        prependIcon: "mdi-coin",
        title: i18n.t("menu.wallet.dashboard"),
        name: "WalletBalance"
      }
    ]
  }
];

export const clientFabMenu = [
  // {
  //   icon: "arrow_back",
  //   title: i18n.t("menu.refillBalance"),
  //   name: "/RefillStepper"
  // },
  // { icon: "local_atm", title: i18n.t("menu.qrPay"), name: "/PayStepper" },
  // {
  //   icon: "arrow_forward",
  //   title: i18n.t("menu.transferBalance"),
  //   name: "/TransferStepper"
  // }
  {
    icon: "mdi-sitemap",
    title: i18n.t("menu.newSite"),
    name: "NewSite"
  },
  {
    icon: "mdi-file-document",
    title: i18n.t("menu.newContentType"),
    name: "NewContentType"
  },
  {
    icon: "mdi-file-document",
    title: i18n.t("menu.newContent"),
    name: "NewContent"
  }
];

export const clientWalletFabMenu = [
  // {
  //   icon: "arrow_back",
  //   title: i18n.t("menu.refillBalance"),
  //   name: "/RefillStepper"
  // },
  // { icon: "local_atm", title: i18n.t("menu.qrPay"), name: "/PayStepper" },
  // {
  //   icon: "arrow_forward",
  //   title: i18n.t("menu.transferBalance"),
  //   name: "/TransferStepper"
  // }
  {
    icon: "arrow_back",
    title: i18n.t("menu.refillBalance"),
    name: "/RefillBalance"
  },
  {
    icon: "arrow_back",
    title: i18n.t("menu.changePoints"),
    name: "/ChangePoints"
  }
];

export const affiliateFabMenu = [
  {
    icon: "phonelink_ring",
    title: i18n.t("menu.devices"),
    name: "/TerminalList"
  }
];
