<template>
  <v-stepper v-model="stage" class="h-full">
    <v-stepper-header>
      <v-stepper-step step="1" :complete="stage > 1"
        >Datos de la recarga</v-stepper-step
      >
      <v-divider></v-divider>
      <v-stepper-step step="2" :complete="stage > 2"
        >Clave de operaciones</v-stepper-step
      >
    </v-stepper-header>

    <v-stepper-content step="1" class="no-mrpd h-full">
      <refill-form @next="goToOperationKey"></refill-form>
    </v-stepper-content>
    <v-stepper-content step="2" class="no-mrpd h-full">
      <operation-key
        @success="submitAll"
        @next="stage++"
        @back="stage--"
        :operation_key_md5="user.operation_key"
      ></operation-key>
    </v-stepper-content>
  </v-stepper>
</template>
<script>
import OperationKey from "../Pay/OperationKey";
import RefillForm from "./RefillForm";
import { mapGetters } from "vuex";
import { postRefillApi } from "@/api/modules";

export default {
  components: {
    RefillForm,
    OperationKey
  },
  data() {
    return {
      stage: 1,
      refillData: {
        payment_instrument_id: null,
        amount: null
      }
    };
  },
  computed: {
    ...mapGetters(["user"])
  },
  methods: {
    goToOperationKey(data) {
      this.refillData = { ...data };
      this.stage = 2;
    },
    async submitAll() {
      var serviceResponse = await postRefillApi(this.refillData);
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
