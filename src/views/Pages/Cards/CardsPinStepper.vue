<template>
  <v-stepper v-model="stage" class="h-full">
    <v-stepper-header>
      <v-stepper-step step="1" :complete="stage > 1"
        >Cambio de Pin</v-stepper-step
      >
      <v-divider></v-divider>
      <v-stepper-step step="2" :complete="stage > 2"
        >Clave de operaciones</v-stepper-step
      >
    </v-stepper-header>

    <v-stepper-content step="1" class="no-mrpd h-full">
      <cards-pin-change @next="goToOperationKey"></cards-pin-change>
    </v-stepper-content>

    <v-stepper-content step="2" class="no-mrpd h-full">
      <operation-key
        @success="submitAll"
        @back="stage--"
        :operation_key_md5="user.operation_key"
      ></operation-key>
    </v-stepper-content>
  </v-stepper>
</template>
<script>
import OperationKey from "../Pay/OperationKey";
import CardsPinChange from "./CardsPinChange";
import { mapGetters } from "vuex";
import { updatePinCard } from "@/api/modules";
import { mapActions } from "vuex";

export default {
  components: {
    CardsPinChange,
    OperationKey
  },
  data() {
    return {
      stage: 1,
      decodeResult: {},
      card_id: ""
    };
  },
  computed: {
    ...mapGetters(["user"])
  },
  methods: {
    ...mapActions(["setTitleButton"]),
    goToOperationKey(data = null) {
      this.setTitleButton("Cambiar Pin");
      if (data != null) {
        this.decodeResult.new_pin_card = data.new_pin_card;
        this.decodeResult.old_pin_card = data.old_pin_card;
        this.card_id = data.card_id;
      }
      this.stage = 2;
    },

    async submitAll() {
      console.log(this.decodeResult);
      console.log(this.card_id);
      var serviceResponse = await updatePinCard(
        this.card_id,
        this.decodeResult
      );
      console.log(serviceResponse);
      if (serviceResponse.ok) {
        console.log("algo");
        const params = { text: "Cambio de Pin Exitoso!" };
        window.getApp.$emit("SHOW_MESSAGE", params);
      } else {
        const params = { text: serviceResponse.message.text };
        window.getApp.$emit("SHOW_ERROR", params);
      }
    },
    beforeDestroy() {
      this.setTitleButton("Pagar");
    }
  }
};
</script>

<style>
.h-full {
  height: 100%;
}

.v-stepper__wrapper {
  height: 100%;
}
</style>
