<template>
  <v-layout wrap>
    <v-flex xs12>
      <v-layout align-center>
        <v-flex xs12>
          <v-card flat height="480" class="margin-auto transparent" width="360">
            <v-container fill-height pa-0>
              <v-layout align-center>
                <v-flex xs12>
                  <v-card-text>
                    <v-form
                      @submit.prevent="$v.$invalid ? null : submit()"
                      ref="form"
                    >
                      <v-container grid-list-xl fluid>
                        <v-layout wrap>
                          <v-flex xs12 pa-0>
                            <v-card elevation="0" class="text-xs-left pa-3">
                              <v-form
                                @submit.prevent="$v.$invalid ? null : submit()"
                                ref="form"
                              >
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
                        </v-layout>
                      </v-container>
                      <v-layout
                        v-if="!keyboardIsUp"
                        justify-space-around
                        class="put-bottom"
                      >
                        <v-flex xs5>
                          <v-btn
                            large
                            round
                            block
                            color="gray"
                            class="mt-4"
                            @click="backToDashboard"
                            >{{ $t("common.cancel") }}</v-btn
                          >
                        </v-flex>
                        <v-flex xs5>
                          <v-btn
                            large
                            round
                            block
                            color="primary"
                            class="mt-4"
                            :disabled="$v.$invalid"
                            :class="$v.$invalid ? '' : 'white--text'"
                            type="submit"
                            >{{ $t("common.accept") }}</v-btn
                          >
                        </v-flex>
                      </v-layout>
                    </v-form>
                  </v-card-text>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card>
        </v-flex>
      </v-layout>
    </v-flex>
    <v-dialog v-model="dialogC" persistent max-width="290">
      <v-card>
        <v-card-title class="headline">{{ textDialogC }}</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn round color="primary" @click.native="backToDashboard">{{
            $t("common.accept")
          }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import validationLangMixin from "@/mixins/validationLangMixin";
import { minValue } from "vuelidate/lib/validators";
import { mapGetters } from "vuex";
import { Money } from "v-money";
import { getMemberBalanceApi, putRefillMemberBalanceApi } from "@/api/modules";
export default {
  mixins: [validationLangMixin],
  components: { Money },
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
      mainCoinBalance: { coin: "WRX", free: 0 },
      activityPointBalance: { coin: "WRX-GAMING", free: 0 },
      currentUser: localStorage.getItem("user"),
      amount: 0,
      coin: localStorage.getItem("coin"),
      money: {
        decimal: ",",
        thousands: ".",
        suffix: " ",
        precision: 2,
        masked: false
      },
      loader: false,
      modal: false,
      dialogC: false,
      textDialogC: ""
    };
  },
  computed: {
    ...mapGetters(["keyboardIsUp", "balance_wallet"])
  },
  methods: {
    async getBalance() {
      let jsonUser = JSON.parse(this.currentUser);
      let serviceResponse = await getMemberBalanceApi(jsonUser.email);
      if (serviceResponse.ok) {
        let balance = serviceResponse.data.balances;
        this.mainCoinBalance = balance[0];
        this.activityPointBalance = balance[1];
        this.money.suffix = " " + this.mainCoinBalance.coin;

        this.fetched = true;
      } else {
        const params = { text: serviceResponse.message.text };
        window.getApp.$emit("SHOW_ERROR", params);
      }
    },
    async submit() {
      let jsonUser = JSON.parse(this.currentUser);
      let body = { username: jsonUser.email, amount: this.amount };
      let serviceResponse = await putRefillMemberBalanceApi(body);
      if (serviceResponse.ok) {
        this.dialogC = true;
        this.textDialogC = this.$t("message.changeInformationSuccess");
      }
    },
    backToDashboard() {
      this.$router.push({
        name: "/WalletBalance"
      });
    }
  },
  async mounted() {
    await this.getBalance();
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
