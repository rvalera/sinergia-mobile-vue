<template>
  <v-container fill-height>
    <v-layout wrap justify-center align-content-center>
      <v-flex xs12>
        <p class="text-xs-center title">
          Estás seguro? esto no se puede deshacer bla bla Lorem ipsum, dolor sit
          amet consectetur adipisicing elit.
          <br />
          <br />Consequatur praesentium expedita corrupti corporis cum, natus
          perspiciatis adipisci
        </p>
      </v-flex>
      <v-layout justify-space-around class="put-bottom">
        <v-flex xs5>
          <v-btn
            large
            round
            block
            color="gray"
            class="mt-4"
            :to="{ name: 'Home' }"
            >{{ $t("common.cancel") }}</v-btn
          >
        </v-flex>
        <v-flex xs5>
          <v-btn
            large
            round
            block
            color="primary"
            class="mt-4"
            @click="submit"
            >{{ $t("common.accept") }}</v-btn
          >
        </v-flex>
      </v-layout>
    </v-layout>
  </v-container>
</template>
<script>
import ResizeMixin from "@/mixins/ResizeMixin";
import { becomeAffiliateApi } from "@/api/modules";
import { mapActions } from "vuex";

export default {
  mixins: [ResizeMixin],
  methods: {
    ...mapActions(["updateAffiliateRequest"]),
    async submit() {
      const { person_id } = localStorage;
      var serviceResponse = await becomeAffiliateApi(person_id);
      if (serviceResponse.ok) {
        const params = { text: serviceResponse.message.text };
        this.updateAffiliateRequest("Y");
        window.getApp.$emit("SHOW_MESSAGE", params);
        this.$router.push({ name: "Home" });
      } else {
        const params = { text: serviceResponse.message.text };
        window.getApp.$emit("SHOW_ERROR", params);
      }
    }
  }
};
</script>
