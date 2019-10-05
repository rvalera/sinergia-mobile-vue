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
              placeholder="Ingrese su clave de operaciones"
              type="password"
              v-model="operation_key"
              :error-messages="fieldErrors('operation_key')"
              @input="$v.operation_key.$touch()"
              @blur="$v.operation_key.$touch()"
              required
              counter
              maxlength="8"
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
          >{{ this.app_button_label }}</v-btn
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
import { mapGetters } from "vuex";
import md5 from "md5";
export default {
  props: {
    operation_key_md5: String
  },
  mixins: [validationMixin],
  validations: {
    operation_key: {
      required,
      minLength: minLength(8)
    }
  },
  validationMessages: {
    operation_key: {
      required: "Clave requerida",
      minLength: "Clave debe ser de 8 caracteres"
    }
  },
  data() {
    return {
      operation_key: ""
    };
  },
  computed: {
    ...mapGetters(["app_button_label"])
  },
  methods: {
    submit() {
      if (md5(this.operation_key) === this.operation_key_md5) {
        this.$emit("success");
      } else {
        const params = { text: "Clave invalida" };
        window.getApp.$emit("SHOW_ERROR", params);
      }
    }
  }
};
</script>
