<template>
  <v-layout row wrap align-content-center-top justify-center>
    <v-flex xs12 sm6 class="text-xs-center">
      <v-card elevation="0" class="text-xs-left pa-1">
        <v-flex>
          <template>
            <v-card-text class="textAlign">
              <p class="subheading my-0 grey--text text-right">
                Balance
              </p>
              <span class="display-1 font-weight-black green--text darken-4"
                >{{ mainCoinBalance.free }} {{ mainCoinBalance.coin }}</span
              >
            </v-card-text>
          </template>
        </v-flex>
      </v-card>

      <v-card elevation="0" class="text-xs-left pa-1">
        <v-flex>
          <template>
            <v-card-text class="textAlign">
              <p class="subheading my-0 grey--text text-right">
                Puntos de Actividad
              </p>
              <span class="display-1 font-weight-black green--text darken-4">{{
                activityPointBalance.free
              }}</span>
            </v-card-text>
          </template>
        </v-flex>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script>
import { getMemberBalanceApi } from "@/api/modules";
import WalletBalance from "./WalletBalance";
export default {
  data: () => ({
    mainCoinBalance: { coin: "WRX", free: 0 },
    activityPointBalance: { coin: "WRX-USR", free: 0 },
    currentUser: localStorage.getItem("user"),
    fetched: false
  }),
  methods: {
    async getBalance() {
      let jsonUser = JSON.parse(this.currentUser);
      let serviceResponse = await getMemberBalanceApi(jsonUser.email);
      if (serviceResponse.ok) {
        let balance = serviceResponse.data.balances;
        this.mainCoinBalance = balance[0];
        this.activityPointBalance = balance[1];
        this.fetched = true;
      } else {
        const params = { text: serviceResponse.message.text };
        window.getApp.$emit("SHOW_ERROR", params);
      }
    },
    backToDashboard() {
      this.$router.push({
        name: "Home"
      });
    }
  },
  async mounted() {
    await this.getBalance();
  }
};
</script>
