//This JSON should be remain sorted by key for better search and have good orthography
export default {
  changeOperationKey: {
    confirm: "Confirm operation key"
  },
  changePassword: {
    confirmPassword: "Confirm password",
    currentPassword: "Current password",
    newPassword: "New password"
  },
  common: {
    accept: "Accept",
    amount: "Amount",
    birthdate: "Birthdate",
    cancel: "Cancel",
    cancelOperation: "Cancel operation",
    cancelOperationQuestion: "Are you sure you want to exit the operation?",
    continue: "Continue",
    delete: "Delete",
    email: "Email",
    finish: "Finish",
    firstName: "First name",
    gender: "Gender",
    goBack: "Go back",
    goHome: "Go home",
    names: "Names",
    next: "Next",
    ok: "Ok",
    operationKey: "Operation key",
    password: "Password",
    personalInformation: "Personal information",
    phone: "Phone",
    save: "Save",
    secondaryEmail: "Secondary email",
    surnames: "Surnames",
    typeYourOperationKey: "Type your operation key",
    userEmail: "User email",
    welcome: "Welcome"
  },
  constant: {
    activation: "Activation",
    all: "All",
    female: "Female",
    male: "Male",
    pay: "Pay",
    refill: "Recharge"
  },
  error404: {
    description: "Sorry but we could not find the page <br>you are looking for"
  },
  error500: {
    description: "Whoops! Internal Server Error"
  },
  forgotPassword: {
    hint: "Provide your user email to reset your password",
    resetPassword: "Reset password",
    title: "Forgot your password?"
  },
  liquidation: {
    creationDate: "Creation date",
    debtAmount: "Debt amount",
    detail: "Liquidation detail",
    finalBalance: "Final balance",
    initialBalance: "Initial balance",
    liquidationType: "Liquidation type",
    withoutLiquidations: "You do not have liquidations yet"
  },
  login: {
    dontHaveAccount: "Do not you have an account?",
    title: "Log in"
  },
  menu: {
    activate: "Activate",
    card: "Card",
    cardList: "List",
    devices: "Points of sale",
    directory: "Directory",
    generateReliablePay: "Generate reliable pay",
    liquidations: "Liquidations",
    lock_unlock: "Lock/unlock",
    movements: "Movements",
    notifications: "Notifications",
    operators: "Operators",
    paymentInstruments: "Recharge means",
    pin: "PIN",
    qrPay: "Pay with QR",
    refillBalance: "Recharge balance",
    reliablePay: "Reliable pay",
    setOperator: "Set operator",
    settings: "Settings",
    transactions: "Transactions",
    transferBalance: "Transfer balance"
  },
  message: {
    apiError401: "Incorrect credentials",
    apiError404: "Service not available",
    apiError405_406: "Invalid request",
    apiError500: "Connection error",
    apiErrorUndefined: "General Application Error",
    invalidKey: "Invalid key",
    succesfulPay: "Succesful pay!"
  },
  movementsFilter: {
    endAmount: "End amount",
    endDate: "End date",
    filter: "Filter",
    filterMovements: "Filter movements",
    movementType: "Movement type",
    startAmount: "Start amount",
    startDate: "Start date"
  },
  pay: {
    camera: "Camera",
    cameraPrompt: "Place a QR inside the scan area",
    check: "Check",
    concept: "Concept",
    destination: "Destination",
    device: "Device",
    invalidQR: "Invalid QR!",
    origin: "Origin",
    reference: "Reference",
    scan: "Scan",
    scanQR: "Scan the QR code to make payment",
    sharing: "Share",
    succesfulTransaction: "Succesful transaction"
  },
  paymentInstrument: {
    cardNumber: "Card number",
    cvc: "CVC",
    expiryDate: "Expiry date",
    useByDefault: "Use by default",
    withoutCards: "You do not have cards yet"
  },
  refill: {
    selectInstrument: "Select a card"
  },
  signup: {
    createAccount: "Create an account",
    haveAccount: "Do you already have an account?",
    signup: "Sign up"
  },
  terminal: {
    detail: "Terminal detail",
    deviceName: "Device name",
    deviceSerial: "Device serial",
    status: "Terminal status",
    type: "Terminal type",
    validationCode: "Validation code",
    withoutTerminals: "You do not have terminals yet"
  },
  toolbar: {
    becomeAffiliate: "Become an affiliate!",
    changePassword: "Change password",
    logout: "Log out",
    profileUser: "Profile user",
    titles: {
      finishSignup: "Complete sign up",
      payWithQr: "Pay with QR"
    }
  },
  validation: {
    email: {
      required: "Please enter an email",
      valid: "Email must be valid"
    },
    fieldRequired: "Field required",
    operationKey: {
      confirm: "Keys must match",
      minLength: "Password must be 8 characters",
      required: "Key is required"
    },
    password: {
      confirm: "Password does not match",
      max: "Max 32 characters",
      min: "At least 8 characters required",
      required: "Password is required",
      validPassword:
        "Password must have [A-Z], [a-z], [0-9] and one special character"
    }
  }
};
