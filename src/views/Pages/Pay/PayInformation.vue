<template>
  <v-container fill-height>
    <v-layout row wrap>
      <v-flex xs12 sm6 class="text-xs-center">
        <v-card elevation="0" class="text-xs-left pa-3">
          <div class="text-xs-center">
            <v-icon x-large color="primary">receipt</v-icon>
          </div>
          <p class="display-1 mb-0 font-weight-bold text-xs-center">
            {{
              payData.amount
                | currency(coin, 2, {
                  thousandsSeparator: ".",
                  decimalSeparator: ",",
                  symbolOnLeft: false,
                  spaceBetweenAmountAndSymbol: true
                })
            }}
          </p>
          <v-text-field
            :label="$t('pay.destination')"
            v-model="payData.target"
            filled
            readonly
          />
          <v-text-field
            :label="$t('pay.concept')"
            v-model="payData.concept"
            filled
            readonly
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
export default {
  props: {
    payData: Object
  },
  data() {
    return {
      coin: localStorage.coin
    };
  }
};
</script>
