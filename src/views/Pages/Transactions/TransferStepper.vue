<template>
  <v-stepper v-model="stage" class="h-full">
    <v-stepper-header>
      <v-stepper-step step="1" :complete="stage > 1"
        >Datos de Transferencia</v-stepper-step
      >
      <v-divider></v-divider>
      <v-stepper-step step="2" :complete="stage > 2"
        >Clave de operaciones</v-stepper-step
      >
      <v-divider></v-divider>
      <v-stepper-step step="3">Comprobante</v-stepper-step>
    </v-stepper-header>

    <v-stepper-content step="1" class="no-mrpd h-full">
      <transfer-form @next="goToPayInformation"></transfer-form>
    </v-stepper-content>

    <v-stepper-content step="2" class="no-mrpd h-full">
      <operation-key
        @success="submitAll"
        @next="stage++"
        @back="stage--"
        :operation_key_md5="user.operation_key"
      ></operation-key>
    </v-stepper-content>

    <v-stepper-content step="3" class="no-mrpd h-full">
      <pay-receipt :receipt="receipt" @finish="stage = 1"></pay-receipt>
    </v-stepper-content>
  </v-stepper>
</template>
<script>
import OperationKey from "../Pay/OperationKey";
import PayReceipt from "../Pay/PayReceipt";
import TransferForm from "./TransferForm";
import { mapGetters } from "vuex";
import { createPaymentApi } from "@/api/modules";
import * as crypto from "crypto";

export default {
  components: {
    TransferForm,
    OperationKey,
    PayReceipt
  },
  data() {
    return {
      stage: 1,
      decodeResult: {},
      receipt: {}
    };
  },
  computed: {
    ...mapGetters(["user"])
  },
  methods: {
    goToPayInformation() {
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
        ...this.decodeResult
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
