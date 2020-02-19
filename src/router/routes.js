import { i18n } from "@/i18n";
import AppSidebar from "@/layouts/App/NavDrawer";
import AppToolbar from "@/layouts/App/Toolbar";
import AppFooter from "@/layouts/App/Footer";

import Error404 from "@/views/Pages/Errors/Error404";
import Error500 from "@/views/Pages/Errors/Error500";

import LoginPage from "@/views/Pages/Authentication/LoginPage";
import ForgotPasswordPage from "@/views/Pages/Authentication/ForgotPasswordPage";
import RegisterPage from "@/views/Pages/Authentication/RegisterPage";
import Signup from "@/views/Pages/Authentication/SignupWizard/Signup";
import ChangePassword from "@/views/Pages/UserMenu/ChangePassword";
import AccountInformation from "@/views/Pages/UserMenu/AccountInformation";
import ChangeOperationKey from "@/views/Pages/UserMenu/ChangeOperationKey";
import BecomeAffiliate from "@/views/Pages/UserMenu/BecomeAffiliate";

import PayStepper from "@/views/Pages/Pay/PayStepper";
import TransferStepper from "@/views/Pages/Transactions/TransferStepper";
import CardsList from "@/views/Pages/Cards/CardsList";
import CardsPinStepper from "@/views/Pages/Cards/CardsPinStepper";
import AppMovements from "@/views/Pages/Global/AppMovements";
import MovementContainer from "@/views/Pages/Global/MovementContainer";
import PaymentInstrumentList from "@/views/Pages/PaymentInstrument/PaymentInstrumentList";
import PaymentInstrumentForm from "@/views/Pages/PaymentInstrument/PaymentInstrumentForm";
import Dashboard from "@/views/Pages/Dashboard/Dashboard";
import RefillStepper from "@/views/Pages/Refill/RefillStepper";
import LiquidationList from "@/views/Pages/Liquidation/LiquidationList";
import TerminalList from "@/views/Pages/Terminal/TerminalList";
import TerminalForm from "@/views/Pages/Terminal/TerminalForm";
//import App from "@/App";
export const routes = [
  { name: "Home", path: "/", redirect: "/dashboard" },
  {
    path: "/dashboard",
    name: "Dashboard",
    meta: { requiresAuth: true },
    components: {
      default: Dashboard,
      sidebar: AppSidebar,
      header: AppToolbar,
      footer: AppFooter
    }
  },
  {
    path: "/pay",
    name: "/PayStepper",
    meta: { requiresAuth: true },
    components: {
      default: PayStepper,
      //sidebar: AppSidebar,
      header: AppToolbar
      //footer: AppFooter
    },
    props: {
      header: {
        hasBackButton: true,
        title: i18n.t("toolbar.titles.payWithQr")
      }
    }
  },
  {
    path: "/change-password",
    name: "ChangePasswordPage",
    meta: { requiresAuth: true },
    components: {
      default: ChangePassword,
      sidebar: AppSidebar,
      header: AppToolbar
      //footer: AppFooter
    },
    props: {
      header: {
        hasBackButton: true,
        title: i18n.t("changePassword.newPassword")
      }
    }
  },
  {
    path: "/profile",
    name: "AccountInformationPage",
    meta: { requiresAuth: true },
    components: {
      default: AccountInformation,
      sidebar: AppSidebar,
      header: AppToolbar
      //footer: AppFooter
    },
    props: {
      header: {
        hasBackButton: true,
        title: i18n.t("common.personalInformation")
      }
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
        title: i18n.t("toolbar.titles.finishSignup")
      }
    }
  },
  {
    path: "/transfer",
    name: "/TransferStepper",
    meta: { requiresAuth: true },
    components: {
      default: TransferStepper,
      //sidebar: AppSidebar,
      header: AppToolbar
    },
    props: {
      header: {
        hasBackButton: true,
        title: i18n.t("menu.transferBalance")
      }
    }
  },
  {
    path: "/cards",
    name: "CardsList",
    meta: { requiresAuth: true },
    components: {
      default: CardsList,
      sidebar: AppSidebar,
      header: AppToolbar
    },
    props: {
      header: {
        title: i18n.t("menu.card")
      }
    }
  },
  {
    path: "/cardsPin",
    name: "/CardsPinStepper",
    meta: { requiresAuth: true },
    components: {
      default: CardsPinStepper,
      //sidebar: AppSidebar,
      header: AppToolbar
    },
    props: {
      header: {
        hasBackButton: true,
        title: i18n.t("menu.pin")
      }
    }
  },
  {
    path: "/appMov",
    name: "/AppMovements",
    meta: { requiresAuth: true },
    components: {
      default: AppMovements,
      sidebar: AppSidebar,
      header: AppToolbar
    },
    props: {
      header: {
        title: i18n.t("menu.movements")
      }
    }
  },
  {
    path: "/appMovc",
    name: "/MovementContainer",
    meta: { requiresAuth: true },
    components: {
      default: MovementContainer,
      sidebar: AppSidebar,
      header: AppToolbar
    },
    props: {
      header: {
        title: i18n.t("menu.movements")
      }
    }
  },
  {
    path: "/payment-instrument",
    name: "PaymentInstrumentList",
    meta: { requiresAuth: true },
    components: {
      default: PaymentInstrumentList,
      sidebar: AppSidebar,
      header: AppToolbar
    },
    props: {
      header: {
        title: i18n.t("menu.paymentInstruments")
      }
    }
  },
  {
    path: "/payment-instrument/new",
    name: "PaymentInstrumentForm",
    meta: { requiresAuth: true },
    components: {
      default: PaymentInstrumentForm,
      sidebar: AppSidebar,
      header: AppToolbar
    },
    props: {
      header: {
        hasBackButton: true,
        goHome: false,
        title: i18n.t("menu.paymentInstruments")
      }
    }
  },
  {
    path: "/refill",
    name: "/RefillStepper",
    meta: { requiresAuth: true },
    components: {
      default: RefillStepper,
      sidebar: AppSidebar,
      header: AppToolbar
    },
    props: {
      header: {
        hasBackButton: true,
        title: i18n.t("menu.refillBalance")
      }
    }
  },
  {
    path: "/appChangeOperationKey",
    name: "/ChangeOperationKey",
    meta: { requiresAuth: true },
    components: {
      default: ChangeOperationKey,
      sidebar: AppSidebar,
      header: AppToolbar
    },
    props: {
      header: {
        hasBackButton: true,
        title: i18n.t("common.operationKey")
      }
    }
  },
  {
    path: "/BecomeAffiliate",
    name: "BecomeAffiliate",
    meta: { requiresAuth: true },
    components: {
      default: BecomeAffiliate,
      sidebar: AppSidebar,
      header: AppToolbar
    },
    props: {
      header: {
        title: i18n.t("toolbar.becomeAffiliate")
      }
    }
  },
  {
    path: "/liquidation",
    name: "/LiquidationList",
    meta: { requiresAuth: true },
    components: {
      default: LiquidationList,
      sidebar: AppSidebar,
      header: AppToolbar
    },
    props: {
      header: {
        title: i18n.t("menu.liquidations")
      }
    }
  },
  {
    path: "/terminal",
    name: "/TerminalList",
    meta: { requiresAuth: true },
    components: {
      default: TerminalList,
      sidebar: AppSidebar,
      header: AppToolbar
    },
    props: {
      header: {
        title: i18n.t("menu.devices")
      }
    }
  },
  {
    path: "/terminal/new",
    name: "TerminalForm",
    meta: { requiresAuth: true },
    components: {
      default: TerminalForm,
      sidebar: AppSidebar,
      header: AppToolbar
    },
    props: {
      header: {
        hasBackButton: true,
        goHome: false,
        title: i18n.t("terminal.newTerminal")
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
