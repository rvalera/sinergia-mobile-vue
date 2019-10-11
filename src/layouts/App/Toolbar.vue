<template>
  <v-toolbar
    :fixed="fixedToolbar"
    v-if="toolbar"
    :clipped-left="toolbarClippedLeft"
    color="primary"
    :dark="true"
    app
    flat
  >
    <v-toolbar-side-icon
      class="hidden-lg-and-up"
      @click.stop="$store.dispatch('toggleDrawer', !navDrawer)"
    ></v-toolbar-side-icon>
    <v-toolbar-title
      v-text="app_title"
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
    <v-menu offset-y>
      <v-avatar color="secondary" slot="activator" size="40">
        <!-- <img :src="authUser.avatar" :alt="authUser.name" /> -->
        <span class="white--text">{{
          user.person.fullname | first2Initials
        }}</span>
      </v-avatar>
      <v-list dense>
        <v-list-tile avatar>
          <v-list-tile-avatar color="secondary">
            <!-- <img :src="authUser.avatar" :alt="authUser.name" /> -->
            <span class="white--text">{{
              user.person.fullname | first2Initials
            }}</span>
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title
              v-text="user.person.fullname"
            ></v-list-tile-title>
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
          <v-list-tile-title>Perfil de usuario</v-list-tile-title>
        </v-list-tile>
        <v-list-tile
          @click="() => $router.push({ name: 'ChangePasswordPage' })"
        >
          <v-list-tile-avatar>
            <v-icon>vpn_key</v-icon>
          </v-list-tile-avatar>
          <v-list-tile-title>Cambiar contraseña</v-list-tile-title>
        </v-list-tile>
        <v-list-tile
          @click="() => $router.push({ name: '/ChangeOperationKey' })"
        >
          <v-list-tile-avatar>
            <v-icon>person</v-icon>
          </v-list-tile-avatar>
          <v-list-tile-title>Clave de operaciones</v-list-tile-title>
        </v-list-tile>
        <v-divider></v-divider>
        <v-list-tile @click="() => $router.push({ name: 'LoginPage' })">
          <v-list-tile-avatar>
            <v-icon>power_settings_new</v-icon>
          </v-list-tile-avatar>
          <v-list-tile-title>Cerrar sesión</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
  </v-toolbar>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      title: "Mark-One"
    };
  },
  computed: {
    ...mapGetters({
      user: "user",
      navDrawer: "navDrawer",
      toolbarClippedLeft: "toolbarClippedLeft",
      fixedToolbar: "fixedToolbar",
      toolbar: "toolbarVisibility",
      navToolbarScheme: "navToolbarScheme",
      navMiniVarient: "navMiniVarient",
      app_title: "app_title"
    })
  },
  methods: {
    toggleMiniVariantMode() {
      this.$store.dispatch("toggleMiniVariantMode");
      this.$store.dispatch("toggleMiniVarient");
    }
  }
};
</script>
