<template>
  <v-img :src="backgroundImg" class="page-vimg with-header">
    <v-dialog v-model="dialog" persistent max-width="320">
      <v-container fill-height pa-0>
        <v-layout align-center>
          <v-flex xs12>
            <v-card
              class="text-xs-center margin-auto border-radius6 box-white-500-glow elevation-10 auth-box"
            >
              <v-layout align-center justify-center row fill-height wrap>
                <v-flex xs12 class="text-xs-center mt-3">
                  <v-toolbar
                    absolute
                    dense
                    flat
                    class="transparent pos-top-1px"
                  >
                    <v-spacer></v-spacer>
                    <v-btn icon :to="{ name: 'LoginPage' }">
                      <v-icon>close</v-icon>
                    </v-btn>
                  </v-toolbar>
                  <img
                    src="static/virpei_icon.png"
                    alt="Vuse"
                    class="text-xs-center"
                    width="30%"
                  />
                  <br />
                  <img
                    src="static/virpei.png"
                    alt="Vuse"
                    class="text-xs-center"
                    width="60%"
                  />
                  <!-- <div class="headline">{{ $t("signup.createAccount") }}</div> -->
                  <v-form
                    @submit.prevent="$v.$invalid ? null : submit()"
                    ref="form"
                  >
                    <v-layout wrap row pa-4>
                      <v-flex xs12 pa-0>
                        <v-text-field
                          color="primary"
                          :label="$t('common.email')"
                          v-model="form.email"
                          required
                          :error-messages="fieldErrors('form.email')"
                          @blur="$v.form.email.$touch()"
                        ></v-text-field>
                        <v-text-field
                          color="primary"
                          :label="$t('common.names')"
                          v-model="form.first_name"
                          required
                          :error-messages="fieldErrors('form.first_name')"
                          @blur="$v.form.first_name.$touch()"
                        ></v-text-field>
                        <v-text-field
                          color="primary"
                          :label="$t('common.surnames')"
                          v-model="form.last_name"
                          required
                          :error-messages="fieldErrors('form.last_name')"
                          @blur="$v.form.last_name.$touch()"
                        ></v-text-field>
                        <!-- <v-checkbox
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
                        </v-checkbox>-->
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
                              >{{ $t("signup.signup") }}</v-btn
                            >
                          </v-flex>
                          <v-flex xs12>
                            <router-link
                              :to="{ name: 'LoginPage' }"
                              tag="div"
                              class="grey--text cursor-pointer"
                            >
                              <strong>{{ $t("signup.haveAccount") }}</strong>
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
    </v-dialog>
  </v-img>
</template>

<script>
import { required, email } from "vuelidate/lib/validators";
import { createUserApi } from "@/api/modules";
import validationLangMixin from "@/mixins/validationLangMixin";
const defaultForm = {
  first_name: "",
  last_name: "",
  email: "",
  agreeToPolicy: false
};
export default {
  mixins: [validationLangMixin],
  validations: {
    form: {
      first_name: { required },
      last_name: { required },
      email: { required, email },
      agreeToPolicy: { required }
    }
  },
  validationMessages: {
    form: {
      first_name: {
        required: "validation.fieldRequired"
      },
      last_name: {
        required: "validation.fieldRequired"
      },
      email: {
        required: "validation.email.required",
        email: "validation.email.valid"
      }
    }
  },
  data() {
    return {
      form: Object.assign({}, defaultForm),
      dialog: true,
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
