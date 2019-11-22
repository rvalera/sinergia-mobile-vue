<template>
  <v-container fill-height>
    <v-layout row wrap>
      <v-flex xs12 sm6 class="text-xs-center">
        <v-card elevation="0" class="text-xs-lef  pa-1">
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
                  <v-icon x-large color="black">person</v-icon>
                </v-list-tile-avatar>

                <v-list-tile-content>
                  <v-list-tile-title
                    v-html="transferData.email"
                    class="body-1"
                  ></v-list-tile-title>
                  <v-list-tile-sub-title
                    v-html="transferData.fullname"
                    class="body-1"
                  ></v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-layout wrap>
                <v-flex xs12 pa-0>
                  <v-form
                    @submit.prevent="$v.$invalid ? null : submit()"
                    ref="form"
                  >
                    <money
                      :label="$t('common.amount')"
                      v-model="form.amount"
                      v-bind="money"
                      class="currencyInput"
                      @blur="$v.form.amount.$touch()"
                    />
                  </v-form>

                  <br />
                  <v-text-field
                    color="primary"
                    :label="$t('common.concept')"
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
      </v-flex>
      <v-layout justify-space-around class="put-bottom2">
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
            round
            block
            color="primary"
            class="mt-4"
            type="submit"
            @click="submit"
            :disabled="$v.$invalid"
            :class="$v.$invalid ? '' : 'white--text'"
            >{{ $t("common.next") }}</v-btn
          >
        </v-flex>
      </v-layout>
    </v-layout>
  </v-container>
</template>
<script>
import ResizeMixin from "@/mixins/ResizeMixin";
import { required, minValue } from "vuelidate/lib/validators";
import validationMixin from "@/mixins/validationMixin";
import { mapGetters } from "vuex";
import { Money } from "v-money";
const defaultForm = {
  description: null,
  amount: 0
};
export default {
  components: { Money },
  props: {
    transferData: Object
  },
  mixins: [validationMixin, ResizeMixin],
  validations: {
    form: {
      description: { required },
      amount: { minValue: minValue(0.01) }
    }
  },
  validationMessages: {
    form: {
      description: {
        required: "Campo requerido"
      },
      amount: {
        required: "Campo requerido"
      }
    }
  },
  data() {
    return {
      height: window.innerHeight - 72, // 72 is stepper header size
      form: Object.assign({}, defaultForm),
      loader: false,
      modal: false,
      coin: localStorage.getItem("coin"),
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
  },
  methods: {
    submit() {
      this.$emit("next", {
        description: this.form.description,
        amount: this.form.amount
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
