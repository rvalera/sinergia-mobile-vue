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
            <v-list-tile :key="item.id" avatar>
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
                      @click="handleuseByDefault(item.id)"
                    >
                      <v-list-tile-title>
                        {{ $t("paymentInstrument.useByDefault") }}
                      </v-list-tile-title>
                    </v-list-tile>
                    <v-list-tile @click="handleDelete(item.id)">
                      <v-list-tile-title>
                        {{ $t("common.delete") }}
                      </v-list-tile-title>
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
import { CREDIT_TYPES_ICONS } from "@/config/constants";
const PER_PAGE = 10;
export default {
  data: () => ({
    paymentInstruments: [],
    totalPaymentInstruments: 0,
    CREDIT_TYPES_ICONS,
    fetched: false,
    page: 0,
    bottom: true
  }),
  watch: {
    bottom(bottom) {
      if (bottom && this.getValidateBottom()) {
        this.getPaymentInstruments();
      }
    }
  },
  methods: {
    async getPaymentInstruments() {
      const start = this.page * PER_PAGE;
      const end = start + PER_PAGE - 1;
      const params = {
        range: JSON.stringify([start, end])
      };
      var serviceResponse = await getPaymentInstrumentApi(params);
      if (serviceResponse.ok) {
        this.totalPaymentInstruments = serviceResponse.total;
        this.paymentInstruments = [
          ...this.paymentInstruments,
          ...serviceResponse.data
        ];
        this.page++;
        this.fetched = true;
      } else {
        const params = { text: serviceResponse.message.text };
        window.getApp.$emit("SHOW_ERROR", params);
      }
    },
    async handleuseByDefault(id) {
      var serviceResponse = await putDefaultPaymentInstrumentApi(id);
      if (serviceResponse.ok) {
        this.resetPaymentInstruments();
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
        this.resetPaymentInstruments();
        const params = { text: serviceResponse.message.text };
        window.getApp.$emit("SHOW_MESSAGE", params);
      } else {
        const params = { text: serviceResponse.message.text };
        window.getApp.$emit("SHOW_ERROR", params);
      }
    },
    bottomVisible() {
      const scrollY = window.scrollY;
      const visible = document.documentElement.clientHeight;
      const pageHeight = document.documentElement.scrollHeight;
      const bottomOfPage = visible + scrollY >= pageHeight;
      return bottomOfPage || pageHeight < visible;
    },
    getValidateBottom() {
      return this.paymentInstruments.length != this.totalPaymentInstruments;
    },
    resetPaymentInstruments() {
      this.page = 0;
      this.paymentInstruments = [];
      this.totalPaymentInstruments = 0;
      this.fetched = false;
      this.getPaymentInstruments();
    }
  },
  async mounted() {
    this.getPaymentInstruments();
    window.addEventListener("scroll", () => {
      this.bottom = this.bottomVisible();
    });
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
