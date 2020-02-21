<template>
  <v-stepper v-model="stage" class="h-full">
    <v-stepper-header>
      <v-stepper-step step="1" :complete="stage > 1">{{
        $t("pay.camera")
      }}</v-stepper-step>
      <v-divider></v-divider>
      <v-stepper-step step="2" :complete="stage > 2">{{
        $t("pay.check")
      }}</v-stepper-step>
      <v-divider></v-divider>
      <v-stepper-step step="3" :complete="stage > 3">{{
        $t("common.operationKey")
      }}</v-stepper-step>
      <v-divider></v-divider>
      <v-stepper-step step="4">Comprobante</v-stepper-step>
    </v-stepper-header>

    <v-stepper-content step="1" class="no-mrpd h-full">
      <qr-scanner @next="goToPayInformation"></qr-scanner>
    </v-stepper-content>

    <v-stepper-content step="2" class="no-mrpd h-full">
      <pay-information
        v-if="typePay"
        :payData="decodeResult"
        @next="goToOperationKey"
        @back="stage--"
      ></pay-information>
      <pay-sticker
        v-if="!typePay"
        :payData="decodeResult"
        @next="goToOperationKey"
        @back="stage--"
      ></pay-sticker>
    </v-stepper-content>

    <v-stepper-content step="3" class="no-mrpd h-full">
      <operation-key
        @success="submitAll"
        @back="stage--"
        :operation_key_md5="user.operation_key"
      ></operation-key>
    </v-stepper-content>

    <v-stepper-content step="4" class="no-mrpd h-full">
      <pay-receipt
        :receipt="receipt"
        @finish="$router.push({ name: 'Home' })"
      ></pay-receipt>
    </v-stepper-content>
  </v-stepper>
</template>
<script>
import QRScanner from "./QRScanner";
import OperationKey from "./OperationKey";
import PayInformation from "./PayInformation";
import PaySticker from "./PaySticker";
import PayReceipt from "./PayReceipt";
import { mapGetters } from "vuex";
import { createPaymentApi } from "@/api/modules";

export default {
  components: {
    "qr-scanner": QRScanner,
    PayInformation,
    OperationKey,
    PayReceipt,
    PaySticker
  },
  data() {
    return {
      stage: 1,
      resultQR: {},
      decodeResult: {},
      receipt: {},
      typePay: false //false if type is sticker
    };
  },
  computed: {
    ...mapGetters(["user"])
  },
  methods: {
    goToPayInformation(data) {
      console.log(data);
      this.resultQR = data.resultQR;
      this.decodeResult = data.decodeResult;
      if (!this.decodeResult.amount) this.typePay = false;
      else this.typePay = true;

      this.stage = 2;
    },
    goToOperationKey(data = null) {
      let datetime = new Date();
      if (data != null) {
        this.decodeResult.amount = parseFloat(data.amount);
        this.decodeResult.concept = data.description;
        this.decodeResult.type = "S";
        this.decodeResult.datetime = datetime.getTime();
      }
      this.stage = 3;
    },
    async submitAll() {
      const body = {
        terminal_code: this.decodeResult.terminal,
        type: this.decodeResult.type,
        amount: this.decodeResult.amount,
        coin_symbol: localStorage.coin,
        concept: this.decodeResult.concept,
        created_at: this.decodeResult.datetime.toString()
      };
      var serviceResponse = await createPaymentApi(body);
      if (serviceResponse.ok) {
        const params = { text: this.$t("message.successfulPay") };
        window.getApp.$emit("SHOW_MESSAGE", params);
        this.receipt = serviceResponse.data;
        this.stage++;
      } else {
        const params = { text: serviceResponse.message.text };
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
