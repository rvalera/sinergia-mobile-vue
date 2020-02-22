<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12 md6 offset-sm3>
        <v-form @submit.prevent="$v.$invalid ? null : submit()" ref="form">
          <v-text-field
            class="box-input"
            :placeholder="$t('paymentInstrument.cardNumber')"
            v-model="form.number"
            :error-messages="fieldErrors('form.number')"
            @input="$v.form.number.$touch()"
            @blur="$v.form.number.$touch()"
            required
            maxlength="19"
            mask="#### #### #### ####"
          />
          <v-text-field
            class="box-input"
            :placeholder="$t('paymentInstrument.expiryDate')"
            v-model="form.expiry"
            :error-messages="fieldErrors('form.expiry')"
            @input="$v.form.expiry.$touch()"
            @blur="$v.form.expiry.$touch()"
            required
            counter
            maxlength="6"
            mask="## / ####"
          />
          <v-text-field
            class="box-input"
            :placeholder="$t('paymentInstrument.cvc')"
            v-model="form.cvc"
            :error-messages="fieldErrors('form.cvc')"
            @input="$v.form.cvc.$touch()"
            @blur="
              $v.form.cvc.$touch();
              invertedCard = false;
            "
            @focus="invertedCard = true"
            required
            counter
            mask="###"
            maxlength="3"
          />
        </v-form>
        <Card class="pt-3" v-model="form" :invert-card.sync="invertedCard" />
        <v-layout v-if="!keyboardIsUp" justify-space-around class="put-bottom">
          <v-flex xs5>
            <v-btn
              large
              block
              round
              color="gray"
              class="mt-4"
              @click="() => $router.back()"
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
              :disabled="$v.$invalid"
              :class="$v.$invalid ? '' : 'white--text'"
              @click="submit"
              >{{ $t("common.save") }}</v-btn
            >
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Card from "vuetify-credit-card";
import { required } from "vuelidate/lib/validators";
import validationLangMixin from "@/mixins/validationLangMixin";
import { mapGetters } from "vuex";
import { postPaymentInstrumentApi } from "@/api/modules";
const defaultForm = {
  number: "",
  expiry: "",
  cvc: "",
  name: ""
};
export default {
  components: {
    Card
  },
  mixins: [validationLangMixin],
  validations: {
    form: {
      number: { required },
      expiry: { required },
      cvc: { required }
    }
  },
  validationMessages: {
    form: {
      number: {
        required: "validation.fieldRequired"
      },
      expiry: {
        required: "validation.fieldRequired"
      },
      cvc: {
        required: "validation.fieldRequired"
      }
    }
  },
  data: () => ({
    form: Object.assign({}, defaultForm),
    invertedCard: false
  }),
  computed: {
    ...mapGetters(["user", "keyboardIsUp"])
  },
  mounted() {
    this.form.name = this.user.person.fullname;
  },
  methods: {
    async submit() {
      console.log(this.form);
      const body = {
        card_number: this.form.number.replace(/ /g, ""),
        cvc: this.form.cvc,
        exp_month: this.form.expiry.slice(0, 2),
        exp_year: this.form.expiry.slice(-4)
      };
      console.log(body);
      var serviceResponse = await postPaymentInstrumentApi(body);
      console.log(serviceResponse);
      if (serviceResponse.ok) {
        this.$router.back();
        const params = { text: this.$t("paymentInstrument.successfulAdd") };
        window.getApp.$emit("SHOW_MESSAGE", params);
      } else {
        const params = { text: serviceResponse.message.text };
        window.getApp.$emit("SHOW_ERROR", params);
      }
    }
  }
};
</script>
