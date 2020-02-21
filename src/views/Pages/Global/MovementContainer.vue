<template>
  <app-movements></app-movements>
</template>

<script>
import AppMovements from "./AppMovements";
import { mapActions } from "vuex";

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
    }
  },

  async created() {
    this.showMovements(10);
  }
};
</script>
