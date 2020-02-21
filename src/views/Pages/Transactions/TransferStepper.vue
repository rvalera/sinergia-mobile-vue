<template>
  <v-stepper v-model="stage" class="h-full">
    <v-stepper-header>
      <v-stepper-step step="1" :complete="stage > 1"
        >Datos de Transferencia</v-stepper-step
      >
      <v-divider></v-divider>
      <v-stepper-step step="2" :complete="stage > 2"
        >Datos de Transferencia</v-stepper-step
      >
      <v-divider></v-divider>
      <v-stepper-step step="3" :complete="stage > 3"
        >Clave de operaciones</v-stepper-step
      >
      <v-divider></v-divider>
      <v-stepper-step step="4">Comprobante</v-stepper-step>
    </v-stepper-header>

    <v-stepper-content step="1" class="no-mrpd h-full">
      <transfer-email @next="goToSearchEmail"></transfer-email>
    </v-stepper-content>
    <v-stepper-content step="2" class="no-mrpd h-full">
      <transfer-form
        :transferData="destinyUser"
        @back="stage--"
        @next="goToTransferInformation"
      ></transfer-form>
    </v-stepper-content>

    <v-stepper-content step="3" class="no-mrpd h-full">
      <operation-key
        @success="submitAll"
        @next="stage++"
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
import TransferForm from "./TransferForm";
import TransferEmail from "./TransferEmail";
import { mapGetters } from "vuex";
import { getAppPersonApi, createTransferApi } from "@/api/modules";

export default {
  components: {
    TransferForm,
    TransferEmail,
    OperationKey,
    PayReceipt
  },
  data() {
    return {
      stage: 1,
      receipt: {},
      destinyUser: {},
      transferData: {
        source_id: null,
        target_id: null,
        amount: null,
        concept: null,
        datetime: null
      }
    };
  },
  computed: {
    ...mapGetters(["user", "balance_wallet"])
  },
  methods: {
    async goToSearchEmail(data) {
      var serviceResponse = await getAppPersonApi(data.destiny_email);
      if (serviceResponse.ok) {
        this.destinyUser = serviceResponse.data;
        this.stage++;
      } else {
        const params = { text: serviceResponse.message.text };
        window.getApp.$emit("SHOW_ERROR", params);
      }
    },
    goToTransferInformation(data) {
      let datetime = new Date();
      //data to transfer wallet to wallet
      this.transferData = {
        coin_symbol: localStorage.coin,
        target: this.destinyUser.email,
        amount: parseFloat(data.amount),
        concept: data.description,
        created_at: datetime.getTime().toString()
      };
      this.stage = 3;
    },
    async submitAll() {
      var serviceResponse = await createTransferApi(this.transferData);
      if (serviceResponse.ok) {
        const params = { text: this.$t("message.successfulTransfer") };
        window.getApp.$emit("SHOW_MESSAGE", params);
        this.receipt = serviceResponse.data;
        this.stage++;
      } else {
        const params = { text: serviceResponse.message.text };
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
