<template>
  <v-layout row>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-list two-line>
          <template v-for="(item, index) in paymentInstruments">
            <v-divider :inset="true" :key="index + 'e'"></v-divider>
            <v-list-tile :key="item.id" avatar>
              <v-list-tile-avatar width="60px" class="avatarCard" tile>
                <v-img width="60px" :src="paymentInsturmentImg"></v-img>
              </v-list-tile-avatar>

              <v-list-tile-content>
                <v-list-tile-title
                  v-html="item.payment_medium.name"
                ></v-list-tile-title>
                <v-list-tile-sub-title
                  v-html="'**** **** **** ' + item.last4"
                ></v-list-tile-sub-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-menu bottom left>
                  <template v-slot:activator="{ on }">
                    <v-btn icon v-on="on">
                      <v-icon color="grey lighten-1">mdi-dots-vertical</v-icon>
                    </v-btn>
                  </template>
                  <v-list>
                    <v-list-tile
                      v-if="item.default !== '1'"
                      @click="handleUseDefault(item.id)"
                    >
                      <v-list-tile-title>Usar por defecto</v-list-tile-title>
                    </v-list-tile>
                    <v-list-tile @click="handleDelete(item.id)">
                      <v-list-tile-title>Eliminar</v-list-tile-title>
                    </v-list-tile>
                  </v-list>
                </v-menu>
              </v-list-tile-action>
            </v-list-tile>
          </template>
        </v-list>
      </v-card>
    </v-flex>
    <v-btn
      dark
      fab
      bottom
      right
      fixed
      color="primary"
      class="fab-btn"
      @click="() => $router.push({ name: 'PaymentInstrumentForm' })"
    >
      <v-icon>add</v-icon>
    </v-btn>
  </v-layout>
</template>

<script>
import {
  getPaymentInstrumentApi,
  putDefaultPaymentInstrumentApi,
  deletePaymentInstrumentApi
} from "@/api/modules";
export default {
  data: () => ({
    paymentInstruments: [],
    paymentInsturmentImg: "static/paymentInstrument.png"
  }),
  methods: {
    async getPaymentInstruments() {
      var serviceResponse = await getPaymentInstrumentApi();
      if (serviceResponse.ok) {
        this.paymentInstruments = serviceResponse.data;
      } else {
        const params = { text: serviceResponse.message.text };
        window.getApp.$emit("SHOW_ERROR", params);
      }
    },
    async handleUseDefault(id) {
      var serviceResponse = await putDefaultPaymentInstrumentApi(id);
      if (serviceResponse.ok) {
        this.getPaymentInstruments();
        const params = { text: serviceResponse.message.text };
        window.getApp.$emit("SHOW_MESSAGE", params);
      } else {
        const params = { text: serviceResponse.message.text };
        window.getApp.$emit("SHOW_ERROR", params);
      }
    },
    async handleDelete(id) {
      var serviceResponse = await deletePaymentInstrumentApi(id);
      if (serviceResponse.ok) {
        this.getPaymentInstruments();
        const params = { text: serviceResponse.message.text };
        window.getApp.$emit("SHOW_MESSAGE", params);
      } else {
        const params = { text: serviceResponse.message.text };
        window.getApp.$emit("SHOW_ERROR", params);
      }
    }
  },
  async mounted() {
    this.getPaymentInstruments();
  }
};
</script>
<style>
.avatarCard {
  padding-right: 30px;
}

.v-stepper__wrapper {
  height: 100%;
}
</style>
