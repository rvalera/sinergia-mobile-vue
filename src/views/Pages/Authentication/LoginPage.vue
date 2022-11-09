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
                  src="static/docfabric_icon.jpg"
                  alt="Vuse"
                  class="text-xs-center"
                  width="30%"
                />
                <br />
                <img
                  src="static/docfabric.jpg"
                  alt="Vuse"
                  class="text-xs-center"
                  width="60%"
                />
                <!-- <div class="headline">{{ $t("login.title") }}</div> -->
                <v-form
                  @submit.prevent="$v.$invalid ? null : submit()"
                  ref="form"
                >
                  <v-layout wrap row pa-4>
                    <v-flex xs12 pa-0>
                      <v-text-field
                        type="email"
                        color="primary"
                        :label="$t('common.email')"
                        v-model="form.email"
                        required
                        :error-messages="fieldErrors('form.email')"
                        @blur="$v.form.email.$touch()"
                        clearable
                      ></v-text-field>

                      <v-text-field
                        color="primary"
                        :label="$t('common.password')"
                        v-model="form.password"
                        :append-icon="
                          showPassword ? 'visibility' : 'visibility_off'
                        "
                        :type="showPassword ? 'text' : 'password'"
                        @click:append="showPassword = !showPassword"
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
                            >{{ $t("login.title") }}</v-btn
                          >
                        </v-flex>
                        <!-- Forgot password -->
                        <v-flex xs12>
                          <!-- <router-link
                            :to="{ name: 'ForgotPasswordPage' }"
                            tag="div"
                            class="grey--text cursor-pointer"
                          > -->
                          <strong>{{ $t("forgotPassword.title") }}</strong>
                          <!-- </router-link> -->
                        </v-flex>
                        <!-- Sign up -->
                        <v-flex xs12>
                          <!-- <router-link
                            :to="{ name: 'RegisterPage' }"
                            tag="div"
                            class="grey--text cursor-pointer"
                          > -->
                          <strong>{{ $t("login.dontHaveAccount") }}</strong>
                          <!-- </router-link> -->
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
    <v-dialog v-model="dialog" persistent max-width="290">
      <v-card>
        <v-card-title class="headline">
          {{ $t("dashboard.confirm") }}
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn round color="primary" @click.native="closeDialogExit">{{
            $t("common.cancel")
          }}</v-btn>
          <v-btn round color="primary" @click.native="exitApp">{{
            $t("common.accept")
          }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-img>
</template>

<script>
import {
  required,
  email,
  minLength,
  maxLength
} from "vuelidate/lib/validators";
import { mapActions } from "vuex";
import validationLangMixin from "@/mixins/validationLangMixin";

export default {
  mixins: [validationLangMixin],
  validations: {
    form: {
      email: { required, email },
      password: {
        required,
        minLength: minLength(8),
        maxLength: maxLength(32)
      }
    }
  },
  validationMessages: {
    form: {
      email: {
        required: "validation.email.required",
        email: "validation.email.valid"
      },
      password: {
        required: "validation.password.required",
        minLength: "validation.password.min",
        maxLength: "validation.password.max",
        validPassword: "validation.password.validPassword"
      }
    }
  },
  data() {
    return {
      form: {},
      dialog: false,
      backgroundImg: "static/doc-images/HexesisMaterial01.png",
      showPassword: false
    };
  },
  async mounted() {
    document.addEventListener("backbutton", this.openDialogExit, false);
    const defaultForm = {
      email: localStorage.lastEmailLogged || "",
      password: ""
    };
    this.form = Object.assign({}, defaultForm);
    await this.logoutAction();
  },
  beforeDestroy() {
    document.removeEventListener("backbutton", this.openDialogExit);
  },
  methods: {
    ...mapActions(["loginAction", "logoutAction"]),
    submit() {
      this.loginAction(this.form);
    },
    exitApp() {
      navigator.app.exitApp();
    },
    openDialogExit() {
      this.dialog = true;
    },
    closeDialogExit() {
      this.dialog = false;
    }
  }
};
</script>
