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

import PayStepper from "@/views/Pages/Pay/PayStepper";

export const routes = [
  { name: "Home", path: "/", redirect: "/pay" },
  {
    path: "/pay",
    name: "PayStepper",
    components: {
      default: PayStepper,
      sidebar: AppSidebar,
      header: AppToolbar,
      footer: AppFooter
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
    components: { default: Signup },
    name: "SignupPage",
    meta: { layout: "auth" }
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
