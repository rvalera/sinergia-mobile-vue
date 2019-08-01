<template>
  <v-img :src="backgroundImg" class="page-vimg">
    <v-container fill-height pa-0>
      <v-layout align-center>
        <v-flex xs12>
          <v-card
            class="text-xs-center margin-auto border-radius6 box-white-500-glow elevation-10 auth-box"
          >
            <v-layout align-center justify-center row fill-height wrap>
              <v-flex xs12 class="text-xs-center mt-3">
                <img
                  src="/static/vuse-circle-white.svg"
                  alt="Vuse"
                  class="text-xs-center"
                  height="100"
                />
                <div class="headline">Iniciar sesión</div>
                <v-form
                  @submit.prevent="$v.$invalid ? null : submit()"
                  ref="form"
                >
                  <v-layout wrap row pa-4>
                    <v-flex xs12 pa-0>
                      <v-text-field
                        color="primary"
                        label="Correo"
                        v-model="form.email"
                        required
                        :error-messages="fieldErrors('form.email')"
                        @blur="$v.form.email.$touch()"
                      ></v-text-field>

                      <v-text-field
                        color="primary"
                        label="Contraseña"
                        v-model="form.password"
                        type="password"
                        required
                        :error-messages="fieldErrors('form.password')"
                        @blur="$v.form.password.$touch()"
                      ></v-text-field>
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
                            >Login</v-btn
                          >
                        </v-flex>
                        <!-- Forgot password -->
                        <v-flex xs12>
                          <router-link
                            :to="{ name: 'ForgotPasswordPage' }"
                            tag="div"
                            class="grey--text cursor-pointer"
                          >
                            <strong>¿Olvidaste la contraseña?</strong>
                          </router-link>
                        </v-flex>
                        <!-- Sign up -->
                        <v-flex xs12>
                          <router-link
                            :to="{ name: 'RegisterPage' }"
                            tag="div"
                            class="grey--text cursor-pointer"
                          >
                            <strong>¿No tienes una cuenta?</strong>
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
import { required, email, minLength } from "vuelidate/lib/validators";
import { mapActions } from "vuex";
import validationMixin from "@/mixins/validationMixin";
const defaultForm = {
  email: "",
  password: ""
};
export default {
  mixins: [validationMixin],
  validations: {
    form: {
      email: { required, email },
      password: { required, minLength: minLength(6) }
    }
  },
  validationMessages: {
    form: {
      email: {
        required: "Por favor ingresa un correo",
        email: "Correo debe ser valido"
      },
      password: {
        required: "Por favor ingresa la contraseña",
        minLength: "Contraseña debe ser de al menos 6 caracteres"
      }
    }
  },
  data() {
    return {
      form: Object.assign({}, defaultForm),
      backgroundImg: "/static/doc-images/HexesisMaterial01.png"
    };
  },
  mounted() {
    this.logoutAction();
  },
  methods: {
    ...mapActions(["loginAction", "logoutAction"]),
    submit() {
      this.loginAction(this.form);
    },
    resetForm() {
      this.form = Object.assign({}, defaultForm);
      this.$refs.form.reset();
    }
  }
};
</script>
