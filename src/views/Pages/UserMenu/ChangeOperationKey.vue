<template>
  <v-container fill-height>
    <v-layout row wrap>
      <v-flex xs12 sm6 class="text-xs-center">
        <v-card elevation="0" class="text-xs-left pa-3">
          <div class="text-xs-center">
            <v-icon x-large color="primary">vpn_key</v-icon>
          </div>
          <v-form @submit.prevent="$v.$invalid ? null : submit()" ref="form">
            <v-text-field
              class="box-input"
              placeholder="Ingrese su clave actual"
              :append-icon="showPassword ? 'visibility' : 'visibility_off'"
              :type="showPassword ? 'text' : 'password'"
              @click:append="showPassword = !showPassword"
              v-model="old_key"
              :error-messages="fieldErrors('old_key')"
              @input="$v.old_key.$touch()"
              @blur="$v.old_key.$touch()"
              required
              counter
              maxlength="6"
            ></v-text-field>

            <v-text-field
              class="box-input"
              placeholder="Ingrese su nueva clave "
              :append-icon="showPassword2 ? 'visibility' : 'visibility_off'"
              :type="showPassword2 ? 'text' : 'password'"
              @click:append="showPassword2 = !showPassword2"
              v-model="new_key"
              :error-messages="fieldErrors('new_key')"
              @input="$v.new_key.$touch()"
              @blur="$v.new_key.$touch()"
              required
              counter
              maxlength="6"
            ></v-text-field>
            <v-text-field
              class="box-input"
              placeholder="Confirme su nueva clave "
              :append-icon="showPassword3 ? 'visibility' : 'visibility_off'"
              :type="showPassword3 ? 'text' : 'password'"
              @click:append="showPassword3 = !showPassword3"
              v-model="new_key_confirm"
              :error-messages="fieldErrors('new_key_confirm')"
              @input="$v.new_key_confirm.$touch()"
              @blur="
                $v.new_key_confirm.$touch();
                handleChange($event);
              "
              required
              counter
              maxlength="6"
            ></v-text-field>
          </v-form>
        </v-card>
        <v-layout justify-space-around class="put-bottom">
          <v-flex xs3>
            <v-btn
              large
              round
              block
              color="primary"
              class="mt-"
              :disabled="$v.$invalid"
              :class="$v.$invalid ? '' : 'white--text'"
              @click="submit"
              >Cambiar</v-btn
            >
          </v-flex>
          <v-flex xs3>
            <v-btn
              large
              round
              block
              color="primary"
              class="mt-"
              :disabled="$v.$invalid"
              :class="$v.$invalid ? '' : 'white--text'"
              @click="submit"
              >Reiniciar</v-btn
            >
          </v-flex>
          <v-flex xs3>
            <v-btn
              large
              block
              round
              color="gray"
              class="mt-"
              @click="backToList"
              >Volver</v-btn
            >
          </v-flex>
        </v-layout>
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
      minLength: minLength(6)
    },
    old_key: {
      required,
      minLength: minLength(6)
    },
    new_key_confirm: {
      sameAsPassword: sameAs("new_key")
    }
  },
  validationMessages: {
    new_key: {
      required: "clave requerida",
      minLength: "la clave debe ser de 6 caracteres"
    },
    old_key: {
      required: "clave requerida",
      minLength: "la clave debe ser de 6 caracteres"
    },
    new_key_confirm: {
      required: "clave requerida",
      minLength: "la clave debe ser de 6 caracteres",
      sameAsPassword: "la clave debe coincidir"
    }
  },
  data() {
    return {
      operation_key: "",
      old_key: "",
      new_key: "",
      new_key_confirm: "",
      showPassword: false,
      showPassword2: false,
      showPassword3: false
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
    },
    handleChange(e) {
      if (e.target.value.match("^[0-9]*$") != null) {
        console.log(e.target.value);
      }
    }
  }
};
</script>
