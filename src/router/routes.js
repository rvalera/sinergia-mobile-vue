import AppSidebar from "@/layouts/App/NavDrawer";
import AppToolbar from "@/layouts/App/Toolbar";
//import AppFooter from "@/layouts/App/Footer";

import Error404 from "@/views/Pages/Errors/Error404";
import Error500 from "@/views/Pages/Errors/Error500";

import LoginPage from "@/views/Pages/Authentication/LoginPage";
import ForgotPasswordPage from "@/views/Pages/Authentication/ForgotPasswordPage";
import RegisterPage from "@/views/Pages/Authentication/RegisterPage";
import Signup from "@/views/Pages/Authentication/SignupWizard/Signup";
import ChangePassword from "@/views/Pages/UserMenu/ChangePassword";
import AccountInformation from "@/views/Pages/UserMenu/AccountInformation";
import ChangeOperationKey from "@/views/Pages/UserMenu/ChangeOperationKey";

import PayStepper from "@/views/Pages/Pay/PayStepper";
import TransferStepper from "@/views/Pages/Transactions/TransferStepper";
import CardsList from "@/views/Pages/Cards/CardsList";
import CardsPinStepper from "@/views/Pages/Cards/CardsPinStepper";
import AppMovements from "@/views/Pages/Global/AppMovements";
import PaymentInstrumentList from "@/views/Pages/PaymentInstrument/PaymentInstrumentList";
import PaymentInstrumentForm from "@/views/Pages/PaymentInstrument/PaymentInstrumentForm";
import ClientDashboard from "@/views/Pages/ClientDashboard/ClientDashboard";
import RefillStepper from "@/views/Pages/Refill/RefillStepper";
import LiquidationList from "@/views/Pages/Liquidation/LiquidationList";
//import App from "@/App";
export const routes = [
  { name: "Home", path: "/", redirect: "/dashboard" },
  {
    path: "/dashboard",
    name: "ClientDashboard",
    components: {
      default: ClientDashboard,
      sidebar: AppSidebar,
      header: AppToolbar
      //footer: AppFooter
    }
  },
  {
    path: "/pay",
    name: "/PayStepper",
    components: {
      default: PayStepper,
      //sidebar: AppSidebar,
      header: AppToolbar
      //footer: AppFooter
    },
    props: {
      header: {
        hasBackButton: true,
        title: "Pago con QR"
      }
    }
  },
  {
    path: "/change-password",
    name: "ChangePasswordPage",
    components: {
      default: ChangePassword,
      sidebar: AppSidebar,
      header: AppToolbar
      //footer: AppFooter
    }
  },
  {
    path: "/profile",
    name: "AccountInformationPage",
    components: {
      default: AccountInformation,
      sidebar: AppSidebar,
      header: AppToolbar
      //footer: AppFooter
    }
  },
  {
    path: "/login",
    components: { default: LoginPage },
    name: "LoginPage",
    meta: { layout: "auth" }
  },
  {
    path: "/forgot-password",
    components: { default: ForgotPasswordPage },
    name: "ForgotPasswordPage",
    meta: { layout: "auth" }
  },
  {
    path: "/register",
    components: { default: RegisterPage },
    name: "RegisterPage",
    meta: { layout: "auth" }
  },
  {
    path: "/signup",
    components: { default: Signup, header: AppToolbar },
    name: "SignupPage",
    meta: { layout: "auth" },
    props: {
      header: {
        logged: false,
        hasBackButton: true,
        goHome: false,
        title: "Completar registro"
      }
    }
  },
  {
    path: "/transfer",
    name: "/TransferStepper",
    components: {
      default: TransferStepper,
      //sidebar: AppSidebar,
      header: AppToolbar
    },
    props: {
      header: {
        hasBackButton: true,
        title: "Transferir saldo"
      }
    }
  },
  {
    path: "/cards",
    name: "/CardsList",
    components: {
      default: CardsList,
      sidebar: AppSidebar,
      header: AppToolbar
    },
    props: {
      header: {
        title: "Tarjetas"
      }
    }
  },
  {
    path: "/cardsPin",
    name: "/CardsPinStepper",
    components: {
      default: CardsPinStepper,
      //sidebar: AppSidebar,
      header: AppToolbar
    },
    props: {
      header: {
        hasBackButton: true,
        title: "PIN"
      }
    }
  },
  {
    path: "/appMov",
    name: "/AppMovements",
    components: {
      default: AppMovements,
      sidebar: AppSidebar,
      header: AppToolbar
    },
    props: {
      header: {
        title: "Movimientos"
      }
    }
  },
  {
    path: "/payment-instrument",
    name: "PaymentInstrumentList",
    components: {
      default: PaymentInstrumentList,
      sidebar: AppSidebar,
      header: AppToolbar
    },
    props: {
      header: {
        title: "Medios de recarga"
      }
    }
  },
  {
    path: "/payment-instrument/new",
    name: "PaymentInstrumentForm",
    components: {
      default: PaymentInstrumentForm,
      sidebar: AppSidebar,
      header: AppToolbar
    },
    props: {
      header: {
        hasBackButton: true,
        goHome: false,
        title: "Medios de recarga"
      }
    }
  },
  {
    path: "/refill",
    name: "/RefillStepper",
    components: {
      default: RefillStepper,
      sidebar: AppSidebar,
      header: AppToolbar
    },
    props: {
      header: {
        hasBackButton: true,
        title: "Recargar saldo"
      }
    }
  },
  {
    path: "/appChangeOperationKey",
    name: "/ChangeOperationKey",
    components: {
      default: ChangeOperationKey,
      sidebar: AppSidebar,
      header: AppToolbar
    }
  },
  {
    path: "/liquidation",
    name: "LiquidationList",
    components: {
      default: LiquidationList,
      sidebar: AppSidebar,
      header: AppToolbar
    },
    props: {
      header: {
        title: "Liquidaciones"
      }
    }
  },
  {
    path: "/pages/error/500",
    components: { default: Error500 },
    name: "Error500",
    meta: { layout: "full" }
  },
  {
    path: "/pages/error/404",
    components: { default: Error404 },
    name: "/Error404",
    meta: { layout: "full" }
  },
  { path: "*", redirect: "/pages/error/404" }
];
