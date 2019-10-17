<template>
  <v-stepper v-model="stage" class="h-full">
    <v-stepper-header>
      <v-stepper-step step="1" :complete="stage > 1"
        >Seleccione una tarjeta</v-stepper-step
      >
      <v-divider></v-divider>
      <v-stepper-step step="2" :complete="stage > 2">Monto</v-stepper-step>
      <v-divider></v-divider>
      <v-stepper-step step="3" :complete="stage > 3"
        >Clave de operaciones</v-stepper-step
      >
    </v-stepper-header>

    <v-stepper-content step="1" class="no-mrpd h-full">
      <select-instrument @next="goToAmount"></select-instrument>
    </v-stepper-content>
    <v-stepper-content step="2" class="no-mrpd h-full">
      <refill-amount
        :paymentInstrumentSelected="refillData.paymentInstrumentSelected"
        @next="goToOperationKey"
        @back="stage--"
      ></refill-amount>
    </v-stepper-content>
    <v-stepper-content step="3" class="no-mrpd h-full">
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
import RefillAmount from "./RefillAmount";
import SelectInstrument from "./SelectInstrument";
import { mapGetters } from "vuex";
import { postRefillApi } from "@/api/modules";

export default {
  components: {
    RefillAmount,
    OperationKey,
    SelectInstrument
  },
  data() {
    return {
      stage: 1,
      refillData: {
        paymentInstrumentSelected: null,
        amount: null
      }
    };
  },
  computed: {
    ...mapGetters(["user"])
  },
  methods: {
    goToOperationKey(data) {
      this.refillData.amount = data.amount;
      this.stage = 3;
    },
    goToAmount(data) {
      this.refillData = { ...data };
      this.stage = 2;
    },
    async submitAll() {
      const body = {
        amount: this.refillData.amount,
        payment_instrument_id: this.refillData.paymentInstrumentSelected.id
      };
      var serviceResponse = await postRefillApi(body);
      const params = { text: serviceResponse.message.text };
      if (serviceResponse.ok) {
        window.getApp.$emit("SHOW_MESSAGE", params);
      } else {
        window.getApp.$emit("SHOW_ERROR", params);
      }
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
