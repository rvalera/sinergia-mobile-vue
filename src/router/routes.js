import AppSidebar from "@/layouts/App/NavDrawer";
import AppToolbar from "@/layouts/App/Toolbar";
import AppFooter from "@/layouts/App/Footer";

import QRScanner from "@/views/QRScanner";

export const routes = [
  { path: "/", redirect: "/qr" },
  {
    path: "/qr",
    name: "QRScanner",
    components: {
      default: QRScanner,
      sidebar: AppSidebar,
      header: AppToolbar,
      footer: AppFooter
    }
  }
];
