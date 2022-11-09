<template>
  <v-toolbar
    :fixed="fixedToolbar"
    v-if="toolbar"
    :clipped-left="toolbarClippedLeft"
    class="navbar-bg"
    :dark="true"
    app
    flat
  >
    <v-btn v-if="hasBackButton" icon @click.stop="dialog = true">
      <v-icon>arrow_back</v-icon>
    </v-btn>
    <v-toolbar-side-icon
      v-else
      class="hidden-lg-and-up"
      @click.stop="$store.dispatch('toggleDrawer', !navDrawer)"
    ></v-toolbar-side-icon>
    <v-toolbar-title
      v-text="title"
      class="ml-0 hidden-lg-and-up"
    ></v-toolbar-title>
    <v-btn
      icon
      light
      class="hidden-md-and-down"
      @click.stop="toggleMiniVariantMode"
    >
      <v-tooltip bottom v-if="navMiniVarient" color="sidebar">
        <v-icon slot="activator">fas fa-arrow-circle-right</v-icon>
        <span>Expand</span>
      </v-tooltip>
      <v-tooltip bottom v-else color="sidebar">
        <v-icon slot="activator">fas fa-arrow-circle-left</v-icon>
        <span>Collapse</span>
      </v-tooltip>
    </v-btn>
    <v-spacer></v-spacer>
    <v-menu offset-y v-if="logged">
      <v-avatar color="secondary" slot="activator" size="40">
        <!-- <img :src="authUser.avatar" :alt="authUser.name" /> -->
        <span class="white--text">
          {{ user.fullname | first2Initials }}
        </span>
      </v-avatar>
      <v-list dense>
        <v-list-tile avatar>
          <v-list-tile-avatar color="secondary">
            <!-- <img :src="authUser.avatar" :alt="authUser.name" /> -->
            <span class="white--text">
              {{ user.fullname | first2Initials }}
            </span>
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title v-text="user.fullname"></v-list-tile-title>
            <v-list-tile-sub-title>{{ user.email }}</v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-divider></v-divider>
        <v-list-tile
          @click="() => $router.push({ name: 'AccountInformationPage' })"
        >
          <v-list-tile-avatar>
            <v-icon>person</v-icon>
          </v-list-tile-avatar>
          <v-list-tile-title>{{ $t("toolbar.profileUser") }}</v-list-tile-title>
        </v-list-tile>

        <v-list-tile
          @click="() => $router.push({ name: 'ChangePasswordPage' })"
        >
          <v-list-tile-avatar>
            <v-icon>vpn_key</v-icon>
          </v-list-tile-avatar>
          <v-list-tile-title>{{
            $t("toolbar.changePassword")
          }}</v-list-tile-title>
        </v-list-tile>

        <!-- <v-list-tile
          @click="() => $router.push({ name: '/ChangeOperationKey' })"
        >
          <v-list-tile-avatar>
            <v-icon>vpn_key</v-icon>
          </v-list-tile-avatar>
          <v-list-tile-title>{{ $t("common.operationKey") }}</v-list-tile-title>
        </v-list-tile>

        <template v-if="isClient && !hasPendingRequest">
          <v-divider></v-divider>
          <v-list-tile @click="() => $router.push({ name: 'BecomeAffiliate' })">
            <v-list-tile-avatar>
              <v-icon>person</v-icon>
            </v-list-tile-avatar>
            <v-list-tile-title>{{
              $t("toolbar.becomeAffiliate")
            }}</v-list-tile-title>
          </v-list-tile> -->
        <!-- </template> -->
        <v-divider></v-divider>
        <v-list-tile @click="dialogLogout = true">
          <v-list-tile-avatar>
            <v-icon>power_settings_new</v-icon>
          </v-list-tile-avatar>
          <v-list-tile-title>{{ $t("toolbar.logout") }}</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>

    <v-dialog v-model="dialog" persistent max-width="290">
      <v-card>
        <v-card-title class="headline">{{
          $t("common.cancelOperation")
        }}</v-card-title>
        <v-card-text class="text-xs-center">{{
          $t("common.cancelOperationQuestion")
        }}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn round color="primary" @click.native="closeDialog">{{
            $t("common.cancel")
          }}</v-btn>
          <v-btn round color="primary" @click.native="handleGoBackButton">{{
            $t("common.accept")
          }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogLogout" persistent max-width="290">
      <v-card>
        <v-card-title class="headline">{{ $t("common.logout") }}</v-card-title>
        <v-card-text class="text-xs-center">{{
          $t("common.sureWannaLogout")
        }}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn round color="primary" @click.native="closeDialogLogout">{{
            $t("common.cancel")
          }}</v-btn>
          <v-btn round color="primary" @click.native="logout">{{
            $t("common.accept")
          }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-toolbar>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { USER_TYPE_CLIENT } from "@/config/constants";

export default {
  props: {
    title: {
      type: String,
      default: "DOCFabric"
    },
    hasBackButton: {
      //it has back button or menu button
      type: Boolean,
      default: false
    },
    goHome: {
      //If it has back button, then: Go home (dashboard) or go back (previous view)
      type: Boolean,
      default: true
    },
    logged: {
      type: Boolean,
      default: true
    }
  },
  data: () => ({
    dialog: false,
    dialogLogout: false
  }),
  watch: {
    hasBackButton(val) {
      if (val) document.addEventListener("backbutton", this.show, false);
      else document.removeEventListener("backbutton", this.show);
    },
    dialog(value) {
      this.handleDialog(value);
      if (value)
        document.addEventListener("backbutton", this.closeDialog, false);
      else document.removeEventListener("backbutton", this.closeDialog);
    },
    dialogLogout(value) {
      this.handleDialog(value);
      if (value)
        document.addEventListener("backbutton", this.closeDialogLogout, false);
      else document.removeEventListener("backbutton", this.closeDialogLogout);
    }
  },
  computed: {
    ...mapGetters({
      hasPendingRequest: "hasPendingRequest",
      user: "user",
      navDrawer: "navDrawer",
      toolbarClippedLeft: "toolbarClippedLeft",
      fixedToolbar: "fixedToolbar",
      toolbar: "toolbarVisibility",
      navToolbarScheme: "navToolbarScheme",
      navMiniVarient: "navMiniVarient"
    }),
    isClient() {
      return USER_TYPE_CLIENT === localStorage.userType;
    }
  },
  methods: {
    ...mapActions(["handleDialog"]),
    toggleMiniVariantMode() {
      this.$store.dispatch("toggleMiniVariantMode");
      this.$store.dispatch("toggleMiniVarient");
    },
    handleGoBackButton() {
      this.dialog = false;
      this.$store.dispatch("toggleDrawer", false);
      if (this.goHome) this.$router.push({ name: "Home" });
      else this.$router.back();
    },
    show() {
      this.dialog = true;
    },
    closeDialog() {
      this.dialog = false;
    },
    closeDialogLogout() {
      this.dialogLogout = false;
    },
    logout() {
      this.dialogLogout = false;
      this.$router.push("/login");
    }
  },
  beforeDestroy() {
    document.removeEventListener("backbutton", this.show);
    document.removeEventListener("backbutton", this.closeDialog);
    document.removeEventListener("backbutton", this.closeDialogLogout);
  }
};
</script>

<style>
.navbar-bg {
  background-image: url("../../assets/images/navbar.png");
  -webkit-background-size: cover;
  background-size: cover;
}
</style>
