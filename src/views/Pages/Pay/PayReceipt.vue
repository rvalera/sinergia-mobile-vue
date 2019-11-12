<template>
  <v-container fill-height py-1>
    <v-layout row wrap justify-center>
      <v-flex xs12 sm6 class="text-xs-center">
        <v-card elevation="0" class="text-xs-left px-3">
          <div class="text-xs-center">
            <p
              class="title mb-3 green--text font-weight-bold d-flex headerSuccess"
            >
              <v-icon x-large color="green">check_circle_outline</v-icon>
            </p>
          </div>
          <p class="display-1 mb-0 font-weight-bold text-xs-center">
            {{
              receipt.amount
                | currency(receipt.coin ? receipt.coin.diminutive : coin, 2, {
                  thousandsSeparator: ".",
                  decimalSeparator: ",",
                  symbolOnLeft: false,
                  spaceBetweenAmountAndSymbol: true
                })
            }}
          </p>
          <p class="body-1 mb-3 text-xs-center">
            {{ receipt.execution_date }}
            <br />
            {{ receipt.ref_number }}
          </p>
          <v-text-field
            :label="$t('pay.origin')"
            v-model="receipt.source_description"
            filled
            readonly
          />
          <v-text-field
            :label="$t('pay.destination')"
            v-model="receipt.target_description"
            filled
            readonly
          />
          <v-text-field
            :label="$t('pay.concept')"
            v-model="receipt.observation"
            filled
            readonly
          />
        </v-card>
        <v-layout justify-space-around class="put-bottom">
          <v-flex xs5>
            <v-btn large round block color="primary">
              <v-icon left>share</v-icon>
              {{ $t("pay.sharing") }}
            </v-btn>
          </v-flex>
          <v-flex xs5>
            <v-btn large round block color="primary" @click="$emit('finish')">{{
              $t("common.finish")
            }}</v-btn>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
export default {
  props: {
    receipt: Object
  },
  data() {
    return {
      coin: localStorage.coin
    };
  }
};
</script>

<style>
.headerSuccess {
  flex-direction: column;
}
</style>
