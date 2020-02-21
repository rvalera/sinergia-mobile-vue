<template>
  <v-container fill-height>
    <v-layout row wrap>
      <v-flex xs12 sm6 class="text-xs-center">
        <v-card elevation="0" class="text-xs-left pa-3">
          <div class="text-xs-center">
            <v-icon x-large color="primary">receipt</v-icon>
          </div>
          <p class="title text-xs-center font-weight-black">
            {{ $t("dashboard.balance") }}
            {{
              balance_wallet
                | currency(coin, 2, {
                  thousandsSeparator: ".",
                  decimalSeparator: ",",
                  symbolOnLeft: false,
                  spaceBetweenAmountAndSymbol: true
                })
            }}
          </p>
          <v-list-tile class="pb-5" avatar>
            <v-list-tile-avatar tile>
              <v-icon x-large color="black">add_to_home_screen</v-icon>
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title
                v-html="payData.target"
                class="body-1"
              ></v-list-tile-title>
              <v-list-tile-sub-title
                v-html="payData.target_name"
                class="body-1"
              ></v-list-tile-sub-title>
              <v-list-tile-sub-title
                v-html="payData.terminal"
                class="body-1"
              ></v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
          <money
            :label="$t('common.amount')"
            v-model="payData.amount"
            v-bind="money"
            disabled
            class="currencyInput"
          />
        </v-card>
        <v-layout justify-space-around class="put-bottom">
          <v-flex xs5>
            <v-btn
              large
              block
              round
              color="gray"
              class="mt-4"
              @click="$emit('back')"
              >{{ $t("common.goBack") }}</v-btn
            >
          </v-flex>
          <v-flex xs5>
            <v-btn
              large
              block
              round
              color="primary"
              class="mt-4"
              @click="$emit('next')"
              >{{ $t("common.next") }}</v-btn
            >
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import { mapGetters } from "vuex";
import { Money } from "v-money";
export default {
  components: { Money },
  props: {
    payData: Object
  },
  data() {
    return {
      coin: localStorage.coin,
      money: {
        decimal: ",",
        thousands: ".",
        suffix: " " + localStorage.getItem("coin"),
        precision: 2,
        masked: false
      }
    };
  },
  computed: {
    ...mapGetters(["balance_wallet"])
  }
};
</script>
