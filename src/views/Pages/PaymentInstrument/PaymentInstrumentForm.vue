<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12 md6>
        <v-form @submit.prevent="$v.$invalid ? null : submit()" ref="form">
          <v-text-field
            class="box-input"
            placeholder="Número de tarjeta"
            v-model="form.number"
            :error-messages="fieldErrors('form.number')"
            @input="$v.form.number.$touch()"
            @blur="$v.form.number.$touch()"
            required
            counter
            maxlength="16"
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
            maxlength="7"
          />
          <v-text-field
            class="box-input"
            placeholder="CVC"
            v-model="form.cvc"
            :error-messages="fieldErrors('form.cvc')"
            @input="$v.form.cvc.$touch()"
            @blur="$v.form.cvc.$touch()"
            required
            counter
            maxlength="3"
          />
        </v-form>
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
//import Card from "vuetify-credit-card"; https://github.com/iliojunior/vuetify-credit-card/issues/9
import { required } from "vuelidate/lib/validators";
import validationMixin from "@/mixins/validationMixin";
import { mapGetters } from "vuex";
import { postPaymentInstrumentApi } from "@/api/modules";
const defaultForm = {
  number: "",
  expiry: "",
  cvc: ""
};
export default {
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
    form: {}
  }),
  computed: {
    ...mapGetters(["user"])
  },
  mounted() {
    this.form = Object.assign(
      {},
      {
        ...defaultForm,
        name: this.user.person.fullname
      }
    );
  },
  methods: {
    async submit() {
      var serviceResponse = await postPaymentInstrumentApi();
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
