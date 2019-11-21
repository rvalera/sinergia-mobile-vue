<template>
  <v-container fill-height>
    <v-layout row wrap>
      <v-flex xs12 sm6 class="text-xs-center">
        <v-card elevation="0" class="text-xs-left pa-1">
          <v-card-text class="pa-0">
            <v-form @submit.prevent="$v.$invalid ? null : submit()" ref="form">
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
                  <v-icon x-large color="black">store</v-icon>
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
              <v-layout wrap>
                <v-flex xs12 pa-0>
                  <money
                    :label="$t('common.amount')"
                    v-model="form.amount"
                    v-bind="money"
                    class="currencyInput mb-4"
                    @blur="$v.form.amount.$touch()"
                  />
                  <br />
                  <v-text-field
                    color="primary"
                    :label="$t('pay.concept')"
                    v-model="form.description"
                    required
                    :error-messages="fieldErrors('form.description')"
                    @blur="$v.form.description.$touch()"
                  ></v-text-field>
                </v-flex>
              </v-layout>
            </v-form>
          </v-card-text>
        </v-card>
        <v-layout v-if="!keyboardIsUp" justify-space-around class="put-bottom">
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
              @click="submit"
              :disabled="$v.$invalid"
              :class="$v.$invalid ? '' : 'white--text'"
              >{{ $t("common.next") }}</v-btn
            >
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import ResizeMixin from "@/mixins/ResizeMixin";
import { required, minValue } from "vuelidate/lib/validators";
import validationLangMixin from "@/mixins/validationLangMixin";
import { mapGetters } from "vuex";
import { Money } from "v-money";
const defaultForm = {
  description: null,
  amount: 0
};
export default {
  components: { Money },
  props: {
    payData: Object
  },
  mixins: [validationLangMixin, ResizeMixin],
  validations: {
    form: {
      description: { required },
      amount: { minValue: minValue(0.01) }
    }
  },
  validationMessages: {
    form: {
      description: {
        required: "validation.fieldRequired"
      },
      amount: {
        required: "validation.fieldRequired"
      }
    }
  },
  data() {
    return {
      height: window.innerHeight - 72, // 72 is stepper header size
      form: Object.assign({}, defaultForm),
      coin: localStorage.getItem("coin"),
      loader: false,
      modal: false,
      money: {
        decimal: ",",
        thousands: ".",
        suffix: " " + localStorage.coin,
        precision: 2,
        masked: false
      }
    };
  },
  methods: {
    submit() {
      this.$emit("next", {
        description: this.form.description,
        amount: this.form.amount
      });
    }
  },
  computed: {
    ...mapGetters(["keyboardIsUp", "balance_wallet"])
  }
};
</script>
