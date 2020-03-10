<template>
  <app-movements></app-movements>
</template>

<script>
import AppMovements from "./AppMovements";
import { mapActions, mapGetters } from "vuex";

export default {
  components: { AppMovements },
  methods: {
    ...mapActions(["setTransactionsApp"]),
    async showMovements(pages = 5) {
      let filter = {
        page: 1,
        perPage: pages
      };

      this.setTransactionsApp(filter);
    },
    goBack() {
      this.$router.back();
    }
  },
  watch: {
    dialogIsUp(value) {
      if (value) document.removeEventListener("backbutton", this.goBack);
      else document.addEventListener("backbutton", this.goBack, false);
    }
  },
  computed: {
    ...mapGetters(["dialogIsUp"])
  },
  async created() {
    this.showMovements(10);
  },
  mounted() {
    document.addEventListener("backbutton", this.goBack, false);
  },
  beforeDestroy() {
    document.removeEventListener("backbutton", this.goBack);
  }
};
</script>
