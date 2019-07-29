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
                <v-toolbar absolute dense flat class="transparent pos-top-1px">
                  <v-spacer></v-spacer>
                  <v-btn icon :to="{ name: 'LoginPage' }">
                    <v-icon>close</v-icon>
                  </v-btn>
                </v-toolbar>
                <v-layout column wrap class="pos-relative">
                  <v-flex xs12 center-align>
                    <v-layout wrap>
                      <v-flex xs12 class="text-xs-center">
                        <img
                          src="/static/forgotpassword-vuse.svg"
                          alt=""
                          height="145px"
                        />
                        <div class="headline">¿Olvidaste la contraseña?</div>
                        <p class="centered headline-caption-text mt-3 px-4">
                          Provee tu correo de usuario para reiniciar tu
                          contraseña
                        </p>
                      </v-flex>
                    </v-layout>
                    <v-form
                      @submit.prevent="$v.$invalid ? null : submit()"
                      ref="sendpasscode"
                    >
                      <v-container grid-list-xl fluid>
                        <v-layout wrap pa-4>
                          <v-flex xs12 pa-0>
                            <v-text-field
                              color="primary"
                              label="Correo de usuario"
                              v-model="email"
                              required
                              :error-messages="fieldErrors('email')"
                              @blur="$v.email.$touch()"
                            ></v-text-field>
                          </v-flex>

                          <v-flex xs12 px-2>
                            <v-layout row wrap text-xs-center>
                              <!-- Login form submit -->
                              <v-flex xs12 class="no-mrpd">
                                <v-btn
                                  color="act"
                                  type="submit"
                                  :disabled="$v.$invalid"
                                  block
                                  :class="$v.$invalid ? '' : 'white--text'"
                                  >Reiniciar contraseña</v-btn
                                >
                              </v-flex>
                            </v-layout>
                          </v-flex>
                        </v-layout>
                      </v-container>
                    </v-form>
                  </v-flex>
                </v-layout>
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
import validationMixin from "@/mixins/validationMixin";

export default {
  mixins: [validationMixin],
  validations: {
    email: { required, email }
  },
  validationMessages: {
    email: {
      required: "Por favor ingresa un correo",
      email: "Correo debe ser valido"
    }
  },
  data() {
    return {
      errors: null,
      email: null,
      backgroundImg: "/static/doc-images/HexesisMaterial01.png"
    };
  },
  methods: {
    submit() {
      setTimeout(() => {
        window.getApp.$emit("SHOW_MESSAGE", {
          text: "Revisa tu bandeja de entrada"
        });
        this.$router.push({
          name: "LoginPage"
        });
      }, 2000);
    }
  }
};
</script>
