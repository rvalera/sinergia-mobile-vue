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
                                Nueva contraseña
                              </strong>
                            </div>
                          </v-flex>
                          <v-flex xs12 px-0>
                            <v-divider class="section-spacer"></v-divider>
                          </v-flex>
                          <v-flex xs12 pa-0>
                            <v-text-field
                              class="box-input"
                              placeholder="Contraseña actual"
                              type="password"
                              v-model="currentPassword"
                              :error-messages="fieldErrors('currentPassword')"
                              @input="$v.currentPassword.$touch()"
                              @blur="$v.currentPassword.$touch()"
                              required
                            ></v-text-field>
                            <password
                              v-model="password"
                              :badge="false"
                              hint=""
                              @next="handlePasswordScoreEvent"
                              required
                            ></password>
                            <v-text-field
                              class="box-input"
                              placeholder="Confirma contraseña"
                              type="password"
                              v-model="repeatPassword"
                              :error-messages="fieldErrors('repeatPassword')"
                              @input="$v.repeatPassword.$touch()"
                              @blur="$v.repeatPassword.$touch()"
                              required
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
                                  >Guardar</v-btn
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
import Password from "@/components/PasswordStrength.vue";
import { required, sameAs } from "vuelidate/lib/validators";
import validationMixin from "@/mixins/validationMixin";
import { changePassUserApi } from "@/api/modules";

export default {
  mixins: [validationMixin, ResizeMixin],
  validations: {
    currentPassword: {
      required,
      sameAsRealPassword: sameAs("realPassword")
    },
    password: { required },
    repeatPassword: {
      sameAsPassword: sameAs("password")
    }
  },
  validationMessages: {
    password: { required: "Contraseña requerida" },
    currentPassword: {
      required: "Contraseña requerida",
      sameAsRealPassword: "Contraseña no coincide"
    },
    repeatPassword: {
      sameAsPassword: "Contraseñas deben coincidir"
    }
  },
  components: {
    Password
  },
  data() {
    return {
      realPassword: localStorage.password,
      currentPassword: null,
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
    async submit() {
      const { user_id } = localStorage;
      var serviceResponse = await changePassUserApi(user_id, this.password);
      if (serviceResponse.ok) {
        localStorage.password = this.password;
        const params = { text: serviceResponse.message.text };
        window.getApp.$emit("SHOW_MESSAGE", params);
        this.$router.push({ name: "Home" });
      } else {
        const params = { text: serviceResponse.message.text };
        window.getApp.$emit("SHOW_ERROR", params);
      }
    }
  }
};
</script>