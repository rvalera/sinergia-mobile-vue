<template>
  <v-img :src="backgroundImg" class="page-vimg with-header">
    <v-container fill-height pa-0>
      <v-layout align-center>
        <v-flex xs12>
          <v-card
            class="text-xs-center margin-auto border-radius6 box-white-500-glow elevation-10 auth-box"
          >
            <v-layout align-center justify-center row fill-height wrap>
              <v-flex xs12 class="text-xs-center mt-3">
                <v-toolbar absolute dense flat class="transparent pos-top-1px">
                  <v-spacer></v-spacer>
                  <v-btn icon :to="{ name: 'LoginPage' }">
                    <v-icon>close</v-icon>
                  </v-btn>
                </v-toolbar>
                <img
                  src="static/vuse-circle-white.svg"
                  alt="Vuse"
                  class="text-xs-center"
                  height="100"
                />
                <div class="headline">Crear una cuenta</div>
                <v-form
                  @submit.prevent="$v.$invalid ? null : submit()"
                  ref="form"
                >
                  <v-layout wrap row pa-4>
                    <v-flex xs12 pa-0>
                      <v-text-field
                        color="purple darken-2"
                        label="Correo"
                        v-model="form.email"
                        required
                        :error-messages="fieldErrors('form.email')"
                        @blur="$v.form.email.$touch()"
                      ></v-text-field>
                      <v-select
                        :items="types"
                        color="primary"
                        label="Tipo de persona"
                        v-model="form.type"
                        required
                        class="box-input"
                        :error-messages="fieldErrors('form.type')"
                        @blur="$v.form.type.$touch()"
                      ></v-select>
                      <v-text-field
                        color="purple darken-2"
                        label="Identificación"
                        v-model="form.id_number"
                        required
                        :error-messages="fieldErrors('form.id_number')"
                        @blur="$v.form.id_number.$touch()"
                      ></v-text-field>
                      <v-text-field
                        color="purple darken-2"
                        label="Nombres"
                        v-model="form.first_name"
                        required
                        :error-messages="fieldErrors('form.first_name')"
                        @blur="$v.form.first_name.$touch()"
                      ></v-text-field>
                      <v-text-field
                        color="purple darken-2"
                        label="Apellidos"
                        v-model="form.last_name"
                        required
                        :error-messages="fieldErrors('form.last_name')"
                        @blur="$v.form.last_name.$touch()"
                      ></v-text-field>
                      <v-checkbox
                        color="primary"
                        v-model="form.agreeToPolicy"
                        required
                      >
                        <div slot="label" @click.stop="() => {}">
                          Agree to
                          <v-btn-toggle
                            class="transparent blue--text"
                            @click.native.stop="dialog = !dialog"
                            >terms & privacy policy</v-btn-toggle
                          >.
                        </div>
                      </v-checkbox>
                    </v-flex>

                    <v-flex xs12>
                      <v-layout row wrap text-xs-center>
                        <!-- Login form submit -->
                        <v-flex xs12 class="no-mrpd">
                          <v-btn
                            color="act"
                            type="submit"
                            :disabled="$v.$invalid"
                            block
                            :class="$v.$invalid ? '' : 'white--text'"
                            >Registrarse</v-btn
                          >
                        </v-flex>
                        <v-flex xs12>
                          <router-link
                            :to="{ name: 'LoginPage' }"
                            tag="div"
                            class="grey--text cursor-pointer"
                          >
                            <strong>¿Ya tienes una cuenta?</strong>
                          </router-link>
                        </v-flex>
                      </v-layout>
                    </v-flex>
                  </v-layout>
                </v-form>
              </v-flex>
            </v-layout>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-img>
</template>

<script>
import { required, email } from "vuelidate/lib/validators";
import { createUserApi } from "@/api/modules";
import validationMixin from "@/mixins/validationMixin";
const defaultForm = {
  first_name: "",
  last_name: "",
  email: "",
  id_number: "",
  agreeToPolicy: false,
  type: ""
};
export default {
  mixins: [validationMixin],
  validations: {
    form: {
      first_name: { required },
      last_name: { required },
      id_number: { required },
      email: { required, email },
      agreeToPolicy: { required },
      type: { required }
    }
  },
  validationMessages: {
    form: {
      first_name: {
        required: "Por favor ingresa tus nombres"
      },
      last_name: {
        required: "Por favor ingresa tus apellidos"
      },
      type: {
        required: "Por favor ingresa el tipo de persona"
      },
      email: {
        required: "Por favor ingresa un correo",
        email: "Correo debe ser valido"
      },
      id_number: {
        required: "Por favor ingresa tu identificación"
      }
    }
  },
  data() {
    return {
      form: Object.assign({}, defaultForm),
      types: [
        { text: "Natural", value: "N" },
        { text: "Jurídico", value: "J" }
      ],
      dialog: false,
      policyText: `
        <h5>What is privacy?</h5>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        <h5>Terms</h5>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborumLorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        `,
      backgroundImg: "static/doc-images/HexesisMaterial01.png"
    };
  },
  methods: {
    resetForm() {
      this.form = Object.assign({}, defaultForm);
      this.$refs.form.reset();
      this.$v.$reset();
    },
    async submit() {
      var serviceResponse = await createUserApi(this.form);
      if (serviceResponse.ok) {
        this.resetForm();
        const params = { text: serviceResponse.message.text };
        window.getApp.$emit("SHOW_MESSAGE", params);
        this.$router.push({ name: "LoginPage" });
      } else {
        const params = { text: serviceResponse.message.text };
        window.getApp.$emit("SHOW_ERROR", params);
      }
    }
  }
};
</script>
