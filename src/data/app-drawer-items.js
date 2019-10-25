import { i18n } from "@/i18n";
export default [
  { header: "Menu" },
  { icon: "bar_chart", title: "Dashboard Cliente", name: "ClientDashboard" },
  { icon: "bar_chart", title: "Dashboard Afiliado", name: "/Error404" },
  {
    icon: "credit_card",
    title: i18n.t("menu.card"),
    group: "",
    items: [
      {
        prependIcon: "card_giftcard",
        title: i18n.t("menu.cardList"),
        name: "CardsList"
      },
      {
        prependIcon: "verified_user",
        title: i18n.t("menu.activate"),
        name: "Error404"
      },
      {
        prependIcon: "lock",
        title: i18n.t("menu.lock_unlock"),
        name: "Error404"
      },
      {
        prependIcon: "fiber_pin",
        title: i18n.t("menu.pin"),
        name: "CardsPinStepper"
      }
    ]
  },
  {
    icon: "phonelink_ring",
    title: i18n.t("menu.devices"),
    group: "",
    items: [
      {
        prependIcon: "list",
        title: i18n.t("menu.movements"),
        name: "Error404"
      },
      {
        prependIcon: "phonelink_lock",
        title: i18n.t("menu.lock_unlock"),
        name: "Error404"
      },
      {
        prependIcon: "airline_seat_recline_normal",
        title: i18n.t("menu.setOperator"),
        name: "Error404"
      }
    ]
  },
  {
    icon: "check",
    title: i18n.t("menu.liquidations"),
    name: "LiquidationList"
  },
  {
    icon: "airline_seat_recline_normal",
    title: i18n.t("menu.operators"),
    name: "/Error404"
  },
  {
    icon: "attach_money",
    title: i18n.t("menu.transactions"),
    group: "",
    items: [
      {
        prependIcon: "local_atm",
        title: i18n.t("menu.qrPay"),
        name: "PayStepper"
      },
      {
        prependIcon: "speaker_phone",
        title: i18n.t("menu.reliablePay"),
        name: "Error404"
      },
      {
        prependIcon: "arrow_forward",
        title: i18n.t("menu.transferBalance"),
        name: "TransferStepper"
      },
      {
        prependIcon: "arrow_back",
        title: i18n.t("menu.refillBalance"),
        name: "RefillStepper"
      },
      {
        prependIcon: "how_to_reg",
        title: i18n.t("menu.generateReliablePay"),
        name: "Error404"
      }
    ]
  },
  { icon: "contacts", title: i18n.t("menu.directory"), name: "/Error404" },
  {
    icon: "360",
    title: i18n.t("menu.paymentInstruments"),
    name: "PaymentInstrumentList"
  },
  { icon: "settings", title: i18n.t("menu.settings"), name: "/Error404" },
  {
    icon: "notifications",
    title: i18n.t("menu.notifications"),
    name: "/Error404"
  }
  // {
  //   icon: "pages",
  //   title: "Seguridad",
  //   group: "",
  //   items: [
  //     { icon: "pages", title: "Recuperación de Datos", name: "Error404" },
  //     { icon: "pages", title: "Cambio de Contraseña", name: "Error404" },
  //     { icon: "pages", title: "Cambiar Clave Especial", name: "Error404" }
  //   ]
  // }
];
