<template>
  <app-movements></app-movements>
</template>

<script>
import AppMovements from "./AppMovements";
import { mapActions } from "vuex";

export default {
  components: { AppMovements },
  data: () => ({
    person_id: localStorage.person_id
  }),

  methods: {
    ...mapActions(["setTransactionsApp"]),
    async showMovements(person_id, pages = 5) {
      let filter = {
        page: 1,
        perPage: pages,
        id: person_id,
        field: "blockchain_id"
      };

      this.setTransactionsApp(filter);
    }
  },

  async created() {
    this.showMovements(this.person_id, 10);
  }
};
</script>
