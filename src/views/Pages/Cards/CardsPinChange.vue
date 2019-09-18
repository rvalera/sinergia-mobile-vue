<template>
  <v-container fill-height>
    <v-layout row wrap align-content-center justify-center>
      <v-flex xs12 sm6 class="text-xs-center">
        <v-card elevation="4" class="text-xs-left pa-3">
          <div class="text-xs-center">
            <v-icon x-large color="primary">vpn_key</v-icon>
          </div>
          <v-form @submit.prevent="$v.$invalid ? null : submit()" ref="form">
            <v-text-field
              class="box-input"
              placeholder="Ingrese su PIN actual"
              type="password"
              v-model="old_pin"
              :error-messages="fieldErrors('operation_key')"
              @input="$v.operation_key.$touch()"
              @blur="$v.operation_key.$touch()"
              required
              counter
              maxlength="4"
            ></v-text-field>

            <v-text-field
              class="box-input"
              placeholder="Ingrese su nuevo PIN"
              type="password"
              v-model="new_pin"
              :error-messages="fieldErrors('operation_key')"
              @input="$v.operation_key.$touch()"
              @blur="$v.operation_key.$touch()"
              required
              counter
              maxlength="4"
            ></v-text-field>
            <v-text-field
              class="box-input"
              placeholder="Confirme su nuevo PIN"
              type="password"
              v-model="new_pin_confirm"
              :error-messages="fieldErrors('operation_key')"
              @input="$v.operation_key.$touch()"
              @blur="$v.operation_key.$touch()"
              required
              counter
              maxlength="4"
            ></v-text-field>
          </v-form>
        </v-card>
        <v-btn
          large
          round
          block
          color="primary"
          class="mt-4"
          :disabled="$v.$invalid"
          :class="$v.$invalid ? '' : 'white--text'"
          @click="submit"
          >Cambiar PIN</v-btn
        >
        <v-btn
          large
          block
          round
          color="gray"
          class="mt-4"
          @click="$emit('back')"
          >Volver</v-btn
        >
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import { required, minLength } from "vuelidate/lib/validators";
import validationMixin from "@/mixins/validationMixin";
export default {
  props: {
    operation_key_md5: String
  },
  mixins: [validationMixin],
  validations: {
    operation_key: {
      required,
      minLength: minLength(4)
    }
  },
  validationMessages: {
    operation_key: {
      required: "Clave requerida",
      minLength: "Clave debe ser de 4 caracteres"
    }
  },
  data() {
    return {
      operation_key: "",
      old_pin: "",
      new_pin: "",
      new_pin_confirm: ""
    };
  },
  methods: {
    submit() {
      if (this.new_pin === this.new_pin_confirm) {
        this.$emit("success");
      } else {
        const params = { text: "Clave invalida" };
        window.getApp.$emit("SHOW_ERROR", params);
      }
    }
  }
};
</script>
