import AppSidebar from "@/layouts/App/NavDrawer";
import AppToolbar from "@/layouts/App/Toolbar";
import AppFooter from "@/layouts/App/Footer";

import Error404 from "@/views/Pages/Errors/Error404";
import Error500 from "@/views/Pages/Errors/Error500";

import QRScanner from "@/views/QRScanner";

export const routes = [
  { name: "home", path: "/", redirect: "/qr" },
  {
    path: "/qr",
    name: "QRScanner",
    components: {
      default: QRScanner,
      sidebar: AppSidebar,
      header: AppToolbar,
      footer: AppFooter
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
  { path: "*", redirect: "/pages/error/404" },
];
