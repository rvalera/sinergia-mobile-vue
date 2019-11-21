<template>
  <v-container fill-height>
    <v-layout row wrap>
      <v-flex xs12 sm6 offset-sm3 class="text-xs-center">
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
          <v-list-tile class="pb-5" avatar v-if="paymentInstrumentSelected">
            <v-list-tile-avatar width="60px" tile>
              <v-img
                width="60px"
                :src="
                  CREDIT_TYPES_ICONS(
                    paymentInstrumentSelected.payment_medium.name
                  )
                "
              ></v-img>
            </v-list-tile-avatar>

            <v-list-tile-content class="pl-4">
              <v-list-tile-title
                v-html="'**** **** **** ' + paymentInstrumentSelected.last4"
                class="title"
              ></v-list-tile-title>
              <v-list-tile-sub-title
                v-html="
                  `${paymentInstrumentSelected.exp_month}/${paymentInstrumentSelected.exp_year}`
                "
                class="title"
              ></v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-form @submit.prevent="$v.$invalid ? null : submit()" ref="form">
            <money
              :label="$t('common.amount')"
              v-model="amount"
              v-bind="money"
              class="currencyInput"
              @blur="$v.form.amount.$touch()"
            />
          </v-form>
        </v-card>
      </v-flex>
      <v-layout v-if="!keyboardIsUp" justify-space-around class="put-bottom">
        <v-flex xs5>
          <v-btn
            large
            round
            block
            color="gray"
            class="mt-4"
            @click="$emit('back')"
            >{{ $t("common.goBack") }}</v-btn
          >
        </v-flex>
        <v-flex xs5>
          <v-btn
            large
            round
            block
            color="primary"
            class="mt-4"
            :disabled="$v.$invalid || !paymentInstrumentSelected"
            :class="$v.$invalid ? '' : 'white--text'"
            @click="submit"
            >{{ $t("common.next") }}</v-btn
          >
        </v-flex>
      </v-layout>
    </v-layout>
  </v-container>
</template>
<script>
import { minValue } from "vuelidate/lib/validators";
import validationLangMixin from "@/mixins/validationLangMixin";
import { mapGetters } from "vuex";
import { CREDIT_TYPES_ICONS } from "@/config/constants";
import { Money } from "v-money";
export default {
  components: { Money },
  props: {
    paymentInstrumentSelected: Object
  },
  mixins: [validationLangMixin],
  validations: {
    amount: {
      minValue: minValue(0.01)
    }
  },
  validationMessages: {
    amount: {
      required: "validation.fieldRequired"
    }
  },
  data() {
    return {
      amount: 0,
      paymentInsturmentImg: "static/paymentInstrument.png",
      coin: localStorage.getItem("coin"),
      money: {
        decimal: ",",
        thousands: ".",
        suffix: " ARS",
        precision: 2,
        masked: false
      },
      CREDIT_TYPES_ICONS
    };
  },
  computed: {
    ...mapGetters(["keyboardIsUp", "balance_wallet"])
  },
  methods: {
    submit() {
      this.$emit("next", {
        amount: this.amount
      });
    }
  }
};
</script>

<style>
.currencyInput {
  font-size: 2rem;
  width: 100%;
  height: 4.5rem;
  text-align: center;
  border-bottom: 1px solid;
}
</style>
