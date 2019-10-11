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
              placeholder="Ingrese su clave actual"
              type="password"
              v-model="old_key"
              :error-messages="fieldErrors('old_key')"
              @input="$v.old_key.$touch()"
              @blur="$v.old_key.$touch()"
              required
              counter
              maxlength="4"
            ></v-text-field>

            <v-text-field
              class="box-input"
              placeholder="Ingrese su nueva clave "
              type="password"
              v-model="new_key"
              :error-messages="fieldErrors('new_key')"
              @input="$v.new_key.$touch()"
              @blur="$v.new_key.$touch()"
              required
              counter
              maxlength="4"
            ></v-text-field>
            <v-text-field
              class="box-input"
              placeholder="Confirme su nueva clave "
              type="password"
              v-model="new_key_confirm"
              :error-messages="fieldErrors('new_key_confirm')"
              @input="$v.new_key_confirm.$touch()"
              @blur="$v.new_key_confirm.$touch()"
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
          >Cambiar Clave de Operaciones</v-btn
        >
        <v-btn
          large
          round
          block
          color="primary"
          class="mt-4"
          :disabled="$v.$invalid"
          :class="$v.$invalid ? '' : 'white--text'"
          @click="submit"
          >Reiniciar Clave de Operaciones</v-btn
        >
        <v-btn large block round color="gray" class="mt-4" @click="backToList"
          >Volver</v-btn
        >
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import { required, sameAs, minLength } from "vuelidate/lib/validators";
import validationMixin from "@/mixins/validationMixin";
export default {
  props: {
    key_card: Object
  },
  mixins: [validationMixin],
  validations: {
    new_key: {
      required,
      minLength: minLength(8)
    },
    old_key: {
      required,
      minLength: minLength(8)
    },
    new_key_confirm: {
      sameAsPassword: sameAs("new_key")
    }
  },
  validationMessages: {
    new_key: {
      required: "clave requerida",
      minLength: "la clave debe ser de 8 caracteres"
    },
    old_key: {
      required: "clave requerida",
      minLength: "la clave debe ser de 8 caracteres"
    },
    new_key_confirm: {
      required: "clave requerida",
      minLength: "la clave debe ser de 8 caracteres",
      sameAsPassword: "la clave debe coincidir"
    }
  },
  data() {
    return {
      operation_key: "",
      old_key: "",
      new_key: "",
      new_key_confirm: ""
    };
  },
  methods: {
    submit() {
      if (this.new_key === this.new_key_confirm) {
        console.log("paso");
        // this.$emit("next", {
        //   new_key_card: this.new_key,
        //   old_key_card: this.old_key,
        //   card_id: this.$route.params.card.id
        // });
      } else {
        const params = { text: "Clave invalida" };
        window.getApp.$emit("SHOW_ERROR", params);
      }
    },
    backToList() {
      this.$router.push({
        name: "/CardsList"
      });
    }
  }
};
</script>
