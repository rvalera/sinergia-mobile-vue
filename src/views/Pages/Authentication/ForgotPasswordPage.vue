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
                          src="static/forgotpassword-vuse.svg"
                          alt=""
                          height="145px"
                        />
                        <div class="headline">
                          {{ $t("forgotPassword.title") }}
                        </div>
                        <p class="centered headline-caption-text mt-3 px-4">
                          {{ $t("forgotPassword.hint") }}
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
                              :label="$t('common.userEmail')"
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
                                  >{{
                                    $t("forgotPassword.resetPassword")
                                  }}</v-btn
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
import validationLangMixin from "@/mixins/validationLangMixin";
import { forgotPasswordUserApi } from "@/api/modules";
import { i18n } from "@/i18n";
export default {
  mixins: [validationLangMixin],
  validations: {
    email: { required, email }
  },
  validationMessages: {
    email: {
      required: "validation.email.required",
      email: "validation.email.valid"
    }
  },
  data() {
    return {
      errors: null,
      email: null,
      backgroundImg: "static/doc-images/HexesisMaterial01.png"
    };
  },
  methods: {
    async submit() {
      let body = {
        email: this.email
      };
      let serviceResponse = await forgotPasswordUserApi(body);

      if (serviceResponse.ok) {
        console.log(serviceResponse);
        window.getApp.$emit("SHOW_MESSAGE", {
          text: i18n.t("forgotPassword.message")
        });
      } else {
        const params = { text: serviceResponse.message.text };
        window.getApp.$emit("SHOW_ERROR", params);
      }
      this.$router.push({
        name: "LoginPage"
      });
    }
  }
};
</script>
