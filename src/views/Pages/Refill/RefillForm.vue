<template>
  <v-container fill-height>
    <v-layout row wrap align-content-center justify-center>
      <v-flex xs12 sm6 offset-sm3 class="text-xs-center">
        <v-card elevation="4" class="text-xs-left pa-3">
          <template v-if="instrumentsFetched">
            <template v-if="paymentInstruments.length">
              <div class="text-xs-center">
                <v-icon x-large color="primary">attach_money</v-icon>
              </div>

              <v-list-tile avatar @click="handleChangeInstrument">
                <v-list-tile-avatar width="60px" class="avatarCard" tile>
                  <v-img width="60px" :src="paymentInsturmentImg"></v-img>
                </v-list-tile-avatar>

                <v-list-tile-content>
                  <v-list-tile-title
                    v-html="paymentInstrumentSelected.payment_medium.name"
                  ></v-list-tile-title>
                  <v-list-tile-sub-title
                    v-html="'**** **** **** ' + paymentInstrumentSelected.last4"
                  ></v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
              <p class="caption text-xs-center" @click="handleChangeInstrument">
                Clic en la tarjeta para cambiarla
              </p>
              <v-form
                @submit.prevent="$v.$invalid ? null : submit()"
                ref="form"
              >
                <v-text-field
                  color="primary"
                  label="Monto"
                  type="number"
                  v-model="amount"
                  required
                  :error-messages="fieldErrors('amount')"
                  @blur="$v.amount.$touch()"
                />
              </v-form>
            </template>
            <template v-else>
              <v-alert
                :value="true"
                color="warning"
                icon="priority_high"
                outline
              >
                <p class="title text-xs-center">
                  No tienes tarjetas de crédito afiliadas
                </p>
                <v-btn
                  large
                  round
                  block
                  color="primary"
                  class="mt-4"
                  @click="$router.push({ name: 'PaymentInstrumentForm' })"
                  >Afiliar</v-btn
                >
              </v-alert>
            </template>
          </template>
        </v-card>
        <v-btn
          large
          round
          block
          color="primary"
          class="mt-4"
          :disabled="$v.$invalid || !paymentInstrumentSelected"
          :class="$v.$invalid ? '' : 'white--text'"
          @click="submit"
          >Siguiente</v-btn
        >
      </v-flex>
      <select-instrument
        ref="SelectInstrument"
        @onSelectInstrument="onSelectInstrument"
      />
    </v-layout>
  </v-container>
</template>
<script>
import { required } from "vuelidate/lib/validators";
import validationMixin from "@/mixins/validationMixin";
import SelectInstrument from "./SelectInstrument";
import { getPaymentInstrumentApi } from "@/api/modules";
export default {
  components: {
    SelectInstrument
  },
  mixins: [validationMixin],
  validations: {
    amount: {
      required
    }
  },
  validationMessages: {
    amount: {
      required: "Monto es requerido"
    }
  },
  data() {
    return {
      instrumentsFetched: false,
      amount: null,
      paymentInstrumentSelected: null,
      paymentInstruments: null,
      paymentInsturmentImg: "static/paymentInstrument.png"
    };
  },
  mounted() {
    this.getPaymentInstruments();
  },
  methods: {
    async getPaymentInstruments() {
      var serviceResponse = await getPaymentInstrumentApi();
      if (serviceResponse.ok) {
        this.instrumentsFetched = true;
        this.paymentInstruments = serviceResponse.data;
        this.paymentInstrumentSelected = this.paymentInstruments[0]; //default is first
      } else {
        const params = { text: serviceResponse.message.text };
        window.getApp.$emit("SHOW_ERROR", params);
      }
    },
    submit() {
      this.$emit("next", {
        amount: this.amount,
        payment_instrument_id: this.paymentInstrumentSelected.id
      });
    },
    handleChangeInstrument() {
      this.$refs.SelectInstrument.show(this.paymentInstruments);
    },
    onSelectInstrument(paymentInstrumentSelected) {
      this.paymentInstrumentSelected = paymentInstrumentSelected;
    }
  }
};
</script>
