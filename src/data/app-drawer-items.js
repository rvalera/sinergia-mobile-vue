export default [
  { header: "Menu" },
  { icon: "bar_chart", title: "Dashboard Cliente", name: "ClientDashboard" },
  { icon: "bar_chart", title: "Dashboard Afiliado", name: "/Error404" },
  {
    icon: "credit_card",
    title: "Tarjeta",
    group: "",
    items: [
      { prependIcon: "card_giftcard", title: "Solicitud ", name: "CardsList" },
      {
        prependIcon: "verified_user",
        title: "Activar",
        name: "Error404"
      },
      { prependIcon: "lock", title: "Bloqueo/Desbloqueo", name: "Error404" },
      { prependIcon: "fiber_pin", title: "PIN", name: "CardsPinStepper" }
    ]
  },
  {
    icon: "phonelink_ring",
    title: "Puntos de Venta",
    group: "",
    items: [
      { prependIcon: "list", title: "Movimientos", name: "Error404" },
      {
        prependIcon: "phonelink_lock",
        title: "Bloquear/Desbloquear",
        name: "Error404"
      },
      {
        prependIcon: "airline_seat_recline_normal",
        title: "Asignar Operador",
        name: "Error404"
      }
    ]
  },
  { icon: "check", title: "Liquidaciones", name: "LiquidationList" },
  {
    icon: "airline_seat_recline_normal",
    title: "Operadores",
    name: "/Error404"
  },
  {
    icon: "attach_money",
    title: "Transacciones",
    group: "",
    items: [
      { prependIcon: "local_atm", title: "Pago con QR", name: "PayStepper" },
      {
        prependIcon: "speaker_phone",
        title: "Pago Confiable",
        name: "Error404"
      },
      {
        prependIcon: "arrow_forward",
        title: "Transferir Saldo",
        name: "TransferStepper"
      },
      {
        prependIcon: "arrow_back",
        title: "Recargar Saldo",
        name: "RefillStepper"
      },
      {
        prependIcon: "how_to_reg",
        title: "Generar Pago Confiable",
        name: "Error404"
      }
    ]
  },
  { icon: "contacts", title: "Directorio", name: "/Error404" },
  { icon: "360", title: "Medios de Recarga", name: "PaymentInstrumentList" },
  { icon: "settings", title: "Configuración", name: "/Error404" },
  { icon: "notifications", title: "Notificaciones", name: "/Error404" }
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
