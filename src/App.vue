<template>
  <div>
    <v-app :dark="colorScheme.dark" :class="colorScheme.scheme">
      <router-view name="header" />
      <router-view name="sidebar" />
      <v-content>
        <router-view />
      </v-content>
      <router-view name="footer" />
      <v-snackbar
        :timeout="3000"
        bottom
        right
        :color="snackbar.color"
        v-model="snackbar.show"
        multi-line
      >
        {{ snackbar.text }}
        <v-btn dark flat @click.native="snackbar.show = false" icon>
          <v-icon>close</v-icon>
        </v-btn>
      </v-snackbar>
    </v-app>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import Events from "./events/event";
export default {
  data() {
    return {
      subDrawer: false,
      snackbar: {
        show: false,
        text: "",
        color: ""
      }
    };
  },
  created() {
    Events.forEach(item => {
      this.$on(item.name, item.callback);
    });
    window.getApp = this;
    window.addEventListener("keyboardDidHide", () => {
      this.handleKeyboard(false);
    });

    window.addEventListener("keyboardDidShow", () => {
      this.handleKeyboard(true);
    });
  },
  computed: {
    ...mapGetters({
      colorScheme: "colorScheme"
    })
  },
  methods: {
    ...mapActions(["handleKeyboard"])
  }
};
</script>
