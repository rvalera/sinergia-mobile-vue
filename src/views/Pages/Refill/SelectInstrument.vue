<template>
  <v-layout row>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-list two-line>
          <template v-if="fetched && !paymentInstruments.length">
            <v-flex xs12 sm6 class="text-xs-center pa-4">
              <v-alert :value="true" dense type="info" outline>
                <strong>{{ $t("paymentInstrument.withoutCards") }}</strong>
              </v-alert>
            </v-flex>
          </template>
          <template
            v-else-if="fetched && paymentInstruments.length"
            v-for="(item, index) in paymentInstruments"
          >
            <v-divider :inset="true" :key="index + 'e'"></v-divider>
            <v-list-tile
              :key="item.id"
              avatar
              @click="handleSelectInstrument(item)"
            >
              <v-list-tile-avatar width="60px" class="avatarCard" tile>
                <v-img
                  width="60px"
                  :src="CREDIT_TYPES_ICONS(item.payment_medium.name)"
                ></v-img>
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title
                  v-html="'**** **** **** ' + item.last4"
                ></v-list-tile-title>
                <v-list-tile-sub-title
                  v-html="`${item.exp_month}/${item.exp_year}`"
                ></v-list-tile-sub-title>
              </v-list-tile-content>
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
import { getPaymentInstrumentApi } from "@/api/modules";
import { CREDIT_TYPES_ICONS } from "@/config/constants";
export default {
  data: () => ({
    paymentInstruments: [],
    fetched: false,
    CREDIT_TYPES_ICONS
  }),
  methods: {
    async getPaymentInstruments() {
      var serviceResponse = await getPaymentInstrumentApi();
      if (serviceResponse.ok) {
        this.paymentInstruments = serviceResponse.data;
        this.fetched = true;
      } else {
        const params = { text: serviceResponse.message.text };
        window.getApp.$emit("SHOW_ERROR", params);
      }
    },
    handleSelectInstrument(paymentInstrumentSelected) {
      this.$emit("next", { paymentInstrumentSelected });
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
