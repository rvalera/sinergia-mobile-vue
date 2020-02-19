<template>
  <v-stepper v-model="stage" class="h-full">
    <v-stepper-header>
      <v-stepper-step step="1" :complete="stage > 1">{{
        $t("refill.selectInstrument")
      }}</v-stepper-step>
      <v-divider></v-divider>
      <v-stepper-step step="2" :complete="stage > 2">{{
        $t("common.amount")
      }}</v-stepper-step>
      <v-divider></v-divider>
      <v-stepper-step step="3" :complete="stage > 3">{{
        $t("common.operationKey")
      }}</v-stepper-step>
      <v-divider></v-divider>
      <v-stepper-step step="4">Comprobante</v-stepper-step>
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
    <v-stepper-content step="4" class="no-mrpd h-full">
      <pay-receipt :receipt="receipt" @finish="goToDashboard"></pay-receipt>
    </v-stepper-content>
  </v-stepper>
</template>
<script>
import OperationKey from "../Pay/OperationKey";
import PayReceipt from "../Pay/PayReceipt";
import RefillAmount from "./RefillAmount";
import SelectInstrument from "./SelectInstrument";
import { mapGetters } from "vuex";
import { postRefillApi } from "@/api/modules";

export default {
  components: {
    RefillAmount,
    OperationKey,
    SelectInstrument,
    PayReceipt
  },
  data() {
    return {
      stage: 1,
      refillData: {
        paymentInstrumentSelected: null,
        amount: null
      },
      receipt: {}
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
        fiat_coin_symbol: localStorage.fiat,
        crypto_coin_symbol: localStorage.coin,
        amount: this.refillData.amount,
        payment_instrument_id: this.refillData.paymentInstrumentSelected.id
      };
      var serviceResponse = await postRefillApi(body);
      const params = { text: serviceResponse.message.text };
      if (serviceResponse.ok) {
        this.stage++;
        this.receipt = {
          amount: body.amount,
          source_description: `**** **** **** ${this.refillData.paymentInstrumentSelected.last4} (${this.refillData.paymentInstrumentSelected.payment_medium.name})`,
          target_description: this.refillData.paymentInstrumentSelected.person
            .email,
          execution_date: new Date().toLocaleString(),
          observation: this.$t("constant.refill")
        };
        window.getApp.$emit("SHOW_MESSAGE", params);
      } else {
        window.getApp.$emit("SHOW_ERROR", params);
      }
    },
    goToDashboard() {
      this.$store.dispatch("toggleDrawer", false);
      this.$router.push({
        name: "Home"
      });
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
