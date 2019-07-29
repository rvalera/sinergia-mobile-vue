<template>
  <v-layout wrap>
    <v-flex xs12>
      <v-layout align-center>
        <v-flex xs12>
          <v-card flat height="480" class="margin-auto transparent" width="360">
            <v-container fill-height pa-0>
              <v-layout align-center>
                <v-flex xs12>
                  <v-card-text>
                    <v-form
                      @submit.prevent="$v.$invalid ? null : submit()"
                      ref="form"
                    >
                      <v-container grid-list-xl fluid>
                        <v-layout wrap>
                          <v-flex xs12 px-0>
                            <div class="dialog-title">
                              <strong class="primary--text">
                                Clave de operaciones
                              </strong>
                            </div>
                          </v-flex>
                          <v-flex xs12 px-0>
                            <v-divider class="section-spacer"></v-divider>
                          </v-flex>
                          <v-flex xs12 pa-0>
                            <v-text-field
                              class="box-input"
                              placeholder="Ingrese su clave de operaciones"
                              type="password"
                              v-model="password"
                              :error-messages="fieldErrors('password')"
                              @input="$v.password.$touch()"
                              @blur="$v.password.$touch()"
                              required
                              counter
                              maxlength="8"
                            ></v-text-field>
                            <v-text-field
                              class="box-input"
                              placeholder="Confirma clave de operaciones"
                              type="password"
                              v-model="repeatPassword"
                              :error-messages="fieldErrors('repeatPassword')"
                              @input="$v.repeatPassword.$touch()"
                              @blur="$v.repeatPassword.$touch()"
                              required
                              counter
                              maxlength="8"
                            ></v-text-field>
                          </v-flex>
                          <v-flex xs12>
                            <v-layout row wrap text-xs-left>
                              <!-- Login form submit -->
                              <v-flex xs12 class="no-mrpd">
                                <v-btn
                                  :loading="loader"
                                  color="act"
                                  type="submit"
                                  :disabled="$v.$invalid"
                                  class="ml-0"
                                  :class="$v.$invalid ? '' : 'white--text'"
                                  >Continue</v-btn
                                >
                              </v-flex>
                            </v-layout>
                          </v-flex>
                        </v-layout>
                      </v-container>
                    </v-form>
                  </v-card-text>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card>
        </v-flex>
      </v-layout>
    </v-flex>
  </v-layout>
</template>
<script>
import ResizeMixin from "@/mixins/ResizeMixin";
import { required, sameAs, minLength } from "vuelidate/lib/validators";
import validationMixin from "@/mixins/validationMixin";

export default {
  mixins: [validationMixin, ResizeMixin],
  validations: {
    password: { required, minLength: minLength(8) },
    repeatPassword: {
      sameAsPassword: sameAs("password")
    }
  },
  validationMessages: {
    password: {
      required: "Clave requerida",
      minLength: "Clave debe ser de 8 caracteres"
    },
    repeatPassword: {
      sameAsPassword: "Claves deben coincidir"
    }
  },
  data() {
    return {
      password: null,
      repeatPassword: null,
      passwordScore: 0,
      loader: false
    };
  },
  methods: {
    handlePasswordScoreEvent(data) {
      this.passwordScore = data.score;
    },
    submit() {
      this.loader = true;
      setTimeout(() => {
        this.$emit("success", {
          specialKey: this.password
        });
      }, 2000);
    }
  }
};
</script>
