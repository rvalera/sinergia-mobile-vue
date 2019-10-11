<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12 md6 offset-sm3>
        <v-form @submit.prevent="$v.$invalid ? null : submit()" ref="form">
          <v-text-field
            class="box-input"
            placeholder="Número de tarjeta"
            v-model="form.number"
            :error-messages="fieldErrors('form.number')"
            @input="$v.form.number.$touch()"
            @blur="$v.form.number.$touch()"
            required
            maxlength="19"
          />
          <v-text-field
            class="box-input"
            placeholder="Fecha de vencimiento"
            v-model="form.expiry"
            :error-messages="fieldErrors('form.expiry')"
            @input="$v.form.expiry.$touch()"
            @blur="$v.form.expiry.$touch()"
            required
            counter
            maxlength="9"
          />
          <v-text-field
            class="box-input"
            placeholder="CVC"
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
            maxlength="3"
          />
        </v-form>
        <Card
          class="pt-3"
          v-model="form"
          format-data
          :invert-card.sync="invertedCard"
        />
        <v-btn
          large
          round
          block
          color="primary"
          class="mt-4"
          :disabled="$v.$invalid"
          :class="$v.$invalid ? '' : 'white--text'"
          @click="submit"
          >Guardar</v-btn
        >
        <v-btn
          large
          block
          round
          color="gray"
          class="mt-4"
          @click="() => $router.back()"
          >Volver</v-btn
        >
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Card from "vuetify-credit-card";
import { required } from "vuelidate/lib/validators";
import validationMixin from "@/mixins/validationMixin";
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
  mixins: [validationMixin],
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
        required: "Campo requerido"
      },
      expiry: {
        required: "Campo requerido"
      },
      cvc: {
        required: "Campo requerido"
      }
    }
  },
  data: () => ({
    form: Object.assign({}, defaultForm),
    invertedCard: false
  }),
  computed: {
    ...mapGetters(["user"])
  },
  mounted() {
    this.form.name = this.user.person.fullname;
  },
  methods: {
    async submit() {
      console.log(this.form);
      const expiry = this.form.expiry.split(" ");
      const body = {
        card_number: this.form.number.replace(/ /g, ""),
        cvc: this.form.cvc,
        exp_month: Number(expiry[0]),
        exp_year: Number(expiry[2])
      };
      console.log(body);
      var serviceResponse = await postPaymentInstrumentApi(body);
      console.log(serviceResponse);
      if (serviceResponse.ok) {
        this.$router.back();
        const params = { text: serviceResponse.message.text };
        window.getApp.$emit("SHOW_MESSAGE", params);
      } else {
        const params = { text: serviceResponse.message.text };
        window.getApp.$emit("SHOW_ERROR", params);
      }
    }
  }
};
</script>
