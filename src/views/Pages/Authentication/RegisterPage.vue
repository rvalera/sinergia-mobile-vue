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
                  src="/static/vuse-circle-white.svg"
                  alt="Vuse"
                  class="text-xs-center"
                  height="100"
                >
                <div class="headline">Crear una cuenta</div>
                <v-form @submit.prevent="$v.$invalid ? null : submit()" ref="form">
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
                      <v-text-field
                        color="purple darken-2"
                        label="Identificación"
                        v-model="form.idNumber"
                        required
                        :error-messages="fieldErrors('form.idNumber')"
                        @blur="$v.form.idNumber.$touch()"
                      ></v-text-field>
                      <v-text-field
                        color="purple darken-2"
                        label="Nombres"
                        v-model="form.firstName"
                        required
                        :error-messages="fieldErrors('form.firstName')"
                        @blur="$v.form.firstName.$touch()"
                      ></v-text-field>
                      <v-text-field
                        color="purple darken-2"
                        label="Apellidos"
                        v-model="form.lastName"
                        required
                        :error-messages="fieldErrors('form.lastName')"
                        @blur="$v.form.lastName.$touch()"
                      ></v-text-field>
                      <v-checkbox color="primary" v-model="form.agreeToPolicy" required>
                        <div slot="label" @click.stop="() => {}">Agree to
                          <v-btn-toggle
                            class="transparent blue--text"
                            @click.native.stop="dialog = !dialog"
                          >terms & privacy policy</v-btn-toggle>.
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
                          >Registrarse</v-btn>
                        </v-flex>
                        <v-flex xs12>
                          <router-link :to="{ name: 'LoginPage' }" tag="div"
                            class="grey--text cursor-pointer"
                          >
                            <strong>¿Ya tienes una cuenta?</strong>
                          </router-link>
                        </v-flex>
                        <!-- Sign in with Social -->
                        <!-- <v-flex xs12>
                          <v-btn fab small color="blue darken-4">
                            <v-icon color="white">fa-facebook</v-icon>
                          </v-btn>
                          <v-btn fab small color="red darken-4">
                            <v-icon color="white">fa-google</v-icon>
                          </v-btn>
                          <v-btn fab small color="light-blue">
                            <v-icon color="white">fa-twitter</v-icon>
                          </v-btn>
                        </v-flex>-->
                        <!-- Register Btn -->
                        <!-- <v-flex xs12>
                          <p class="body-1"><strong>Don't have an account?</strong></p>
                          <router-link :to="{ name: 'RegisterPage' }" tag="v-btn" class="primary">Register Now</router-link>
                        </v-flex>-->
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
import { required, email, sameAs, minLength } from "vuelidate/lib/validators";
import validationMixin from "@/mixins/validationMixin";
const defaultForm = {
  firstName: "",
  lastName: "",
  email: "",
  idNumber: "",
  agreeToPolicy: false
};
export default {
  mixins: [validationMixin],
  validations: {
    form: {
      firstName: { required },
      lastName: { required },
      idNumber: { required },
      email: { required, email },
      agreeToPolicy: { required }
    }
  },
  validationMessages: {
    form: {
      firstName: {
        required: "Por favor ingresa tus nombres"
      },
      lastName: {
        required: "Por favor ingresa tus apellidos"
      },
      email: {
        required: "Por favor ingresa un correo",
        email: "Correo debe ser valido"
      },
      idNumber: {
        required: "Por favor ingresa tu identificación",
      }
    }
  },
  data() {
    return {
      form: Object.assign({}, defaultForm),
      dialog: false,
      policyText: `
        <h5>What is privacy?</h5>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        <h5>Terms</h5>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborumLorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        `,
      backgroundImg: "/static/doc-images/HexesisMaterial01.png"
    };
  },
  methods: {
    submit() {
      this.resetForm();
      this.$v.$reset();
      setTimeout(() => {
        window.getApp.$emit("SHOW_MESSAGE", {text: "Registro exitoso!"});
        this.$router.push({
          name: "LoginPage"
        });
      }, 2000);
    },
    resetForm() {
      this.form = Object.assign({}, defaultForm);
      this.$refs.form.reset();
    }
  }
};
</script>
