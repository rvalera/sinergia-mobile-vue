//This JSON should be remain sorted by key for better search and have good orthography
export default {
  changeOperationKey: {
    confirm: "Confirma clave de operaciones"
  },
  changePassword: {
    confirmPassword: "Confirmar contraseña",
    currentPassword: "Contraseña actual",
    newPassword: "Contraseña nueva"
  },
  common: {
    accept: "Aceptar",
    amount: "Monto",
    birthdate: "Fecha de nacimiento",
    cancel: "Cancelar",
    cancelOperation: "Cancelar operación",
    cancelOperationQuestion: "¿Seguro que desea salir de la operación?",
    continue: "Continuar",
    delete: "Eliminar",
    email: "Correo",
    finish: "Finalizar",
    firstName: "Nombre",
    gender: "Género",
    goBack: "Volver",
    goHome: "Ir al inicio",
    names: "Nombres",
    next: "Siguiente",
    ok: "Ok",
    operationKey: "Clave de operaciones",
    password: "Contraseña",
    personalInformation: "Datos personales",
    phone: "Teléfono",
    save: "Guardar",
    secondaryEmail: "Correo secundario",
    surnames: "Apellidos",
    typeYourOperationKey: "Ingrese su clave de operaciones",
    userEmail: "Correo de usuario",
    welcome: "Bienvenido",
    activity: "Actividad",
    balance: "Saldo"
  },
  constant: {
    activation: "Activación",
    all: "Todas",
    female: "Femenino",
    male: "Masculino",
    pay: "Pago",
    pos: "Punto de venta",
    refill: "Recarga",
    workstation: "Estación"
  },
  error404: {
    description:
      "Lo sentimos pero no pudimos encontrar la página <br>que estás buscando"
  },
  error500: {
    description: "¡Whoops! error de servidor interno"
  },
  forgotPassword: {
    hint: "Provee tu correo de usuario para reiniciar tu contraseña",
    resetPassword: "Reiniciar contraseña",
    title: "¿Olvidaste la contraseña?"
  },
  liquidation: {
    creationDate: "Fecha de creación",
    debtAmount: "Monto adeudado",
    detail: "Detalle de la liquidación",
    finalBalance: "Balance final",
    initialBalance: "Balance inicial",
    liquidationType: "Tipo de liquidación",
    withoutLiquidations: "No posee liquidaciones aún"
  },
  login: {
    dontHaveAccount: "¿No tienes una cuenta?",
    title: "Iniciar sesión"
  },
  menu: {
    activate: "Activar",
    card: "Tarjeta",
    cardList: "Listado",
    devices: "Puntos de Venta",
    directory: "Directorio",
    generateReliablePay: "Generar Pago Confiable",
    liquidations: "Liquidaciones",
    lock_unlock: "Bloqueo/Desbloqueo",
    movements: "Movimientos",
    notifications: "Notificaciones",
    operators: "Operadores",
    paymentInstruments: "Medios de Recarga",
    pin: "PIN",
    qrPay: "Pago con QR",
    refillBalance: "Recargar Saldo",
    reliablePay: "Pago Confiable",
    setOperator: "Asignar Operador",
    settings: "Configuración",
    transactions: "Transacciones",
    transferBalance: "Transferir Saldo"
  },
  message: {
    apiError401: "Credenciales incorrectas",
    apiError404: "Servicio no disponible",
    apiError405_406: "Solicitud inválida",
    apiError500: "Error de conexión",
    apiErrorUndefined: "Error General de la Aplicacion",
    invalidKey: "Clave inválida",
    succesfulPay: "¡Pago realizado con éxito!"
  },
  movementsFilter: {
    endAmount: "Monto hasta",
    endDate: "Fecha fin",
    filter: "Filtrar",
    filterMovements: "Filtrar movimientos",
    movementType: "Tipo de movimiento",
    startAmount: "Monto desde",
    startDate: "Fecha inicio"
  },
  pay: {
    camera: "Cámara",
    cameraPrompt: "Coloque un QR dentro del área de escaneo",
    check: "Verificar",
    concept: "Concepto",
    destination: "Destino",
    device: "Terminal",
    invalidQR: "¡QR inválido!",
    origin: "Origen",
    reference: "Referencia",
    scan: "Escanear",
    scanQR: "Escanea el código QR para realizar pago",
    sharing: "Compartir",
    succesfulTransaction: "Transacción exitosa"
  },
  paymentInstrument: {
    cardNumber: "Número de tarjeta",
    cvc: "CVC",
    expiryDate: "Fechad de vencimiento",
    useByDefault: "Usar por defecto",
    withoutCards: "No posee tarjetas aún"
  },
  refill: {
    selectInstrument: "Seleccione una tarjeta"
  },
  signup: {
    createAccount: "Crear una cuenta",
    haveAccount: "¿Ya tienes una cuenta?",
    signup: "Registrarse"
  },
  terminal: {
    detail: "Detalle del terminal",
    deviceName: "Nombre del dispositivo",
    deviceSerial: "Serial del dispositivo",
    newTerminal: "Nuevo terminal",
    quantity: "Cantidad de terminales",
    status: "Estado del terminal",
    type: "Tipo de terminal",
    validationCode: "Código de validación",
    withoutTerminals: "No posee terminales aún"
  },
  toolbar: {
    becomeAffiliate: "¡Hazte un afiliado!",
    changePassword: "Cambiar contraseña",
    logout: "Cerrar sesión",
    profileUser: "Perfil de usuario",
    titles: {
      finishSignup: "Completar registro",
      payWithQr: "Pago con QR"
    }
  },
  validation: {
    email: {
      required: "Por favor ingresa un correo",
      valid: "Correo debe ser válido"
    },
    fieldRequired: "Campo requerido",
    operationKey: {
      confirm: "Claves deben coincidir",
      minLength: "Clave debe ser de 8 caracteres",
      required: "Clave requerida"
    },
    password: {
      confirm: "Contraseña no coincide",
      max: "Máximo 32 caracteres",
      min: "Al menos 8 caracteres son requeridos",
      required: "Contraseña requeridad",
      validPassword:
        "Contraseña debe tener [A-Z], [a-z], [0-9] y un carácter especial"
    }
  }
};
