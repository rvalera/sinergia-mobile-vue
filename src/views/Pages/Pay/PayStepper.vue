<template>
  <v-stepper v-model="stage" class="h-full">
    <v-stepper-header>
      <v-stepper-step step="1" :complete="stage > 1">Camara</v-stepper-step>
      <v-divider></v-divider>
      <v-stepper-step step="2" :complete="stage > 2">Verificar</v-stepper-step>
      <v-divider></v-divider>
      <v-stepper-step step="3" :complete="stage > 3"
        >Clave de operaciones</v-stepper-step
      >
      <v-divider></v-divider>
      <v-stepper-step step="4">Comprobante</v-stepper-step>
    </v-stepper-header>

    <v-stepper-content step="1" class="no-mrpd h-full">
      <qr-scanner @next="goToPayInformation"></qr-scanner>
    </v-stepper-content>

    <v-stepper-content step="2" class="no-mrpd h-full">
      <pay-information
        :payData="decodeResult"
        @next="stage++"
        @back="stage--"
      ></pay-information>
    </v-stepper-content>

    <v-stepper-content step="3" class="no-mrpd h-full">
      <operation-key
        @success="submitAll"
        @back="stage--"
        :operation_key_md5="user.operation_key"
      ></operation-key>
    </v-stepper-content>

    <v-stepper-content step="4" class="no-mrpd h-full">
      <pay-receipt :receipt="receipt" @finish="stage = 1"></pay-receipt>
    </v-stepper-content>
  </v-stepper>
</template>
<script>
import QRScanner from "./QRScanner";
import OperationKey from "./OperationKey";
import PayInformation from "./PayInformation";
import PayReceipt from "./PayReceipt";
import { mapGetters } from "vuex";
import { createPaymentApi } from "@/api/modules";
import * as crypto from "crypto";

export default {
  components: {
    "qr-scanner": QRScanner,
    PayInformation,
    OperationKey,
    PayReceipt
  },
  data() {
    return {
      stage: 1,
      resultQR: {},
      decodeResult: {},
      receipt: {}
    };
  },
  computed: {
    ...mapGetters(["user"])
  },
  methods: {
    goToPayInformation(data) {
      this.resultQR = data.resultQR;
      this.decodeResult = data.decodeResult;
      this.stage = 2;
    },
    goToOperationKey() {
      this.stage = 3;
    },
    encryptToken(obj) {
      const key = this.user.operation_key;
      const iv = key.substr(0, 16);
      var jsonString = JSON.stringify(obj)
        .split("")
        .reverse()
        .join("");
      var encipher = crypto.createCipheriv("aes-256-cbc", key, iv),
        buffer = Buffer.concat([encipher.update(jsonString), encipher.final()]);
      return buffer.toString("base64");
    },
    async submitAll() {
      const jsonToEncrypt = {
        ...this.decodeResult,
        qr: this.resultQR.text
      };
      const data = this.encryptToken(jsonToEncrypt);
      const {
        person: { id: source_id }
      } = this.user;
      const body = {
        data,
        source_id
      };
      var serviceResponse = await createPaymentApi(body);
      if (serviceResponse.ok) {
        const params = { text: "Pago realizado con éxito!" };
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
