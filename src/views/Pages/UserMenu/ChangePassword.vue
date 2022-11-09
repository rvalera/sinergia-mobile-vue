<template>
  <v-container class="backgroundC" fill-height>
    <v-layout row wrap>
      <v-flex xs12 sm6 class="text-xs-center">
        <v-card elevation="0" class="text-xs-left pa-3">
          <div class="text-xs-center">
            <v-icon x-large color="primary">vpn_key</v-icon>
          </div>
          <v-form @submit.prevent="$v.$invalid ? null : submit()" ref="form">
            <v-text-field
              class="box-input"
              :placeholder="$t('changePassword.currentPassword')"
              :append-icon="showPassword ? 'visibility' : 'visibility_off'"
              :type="showPassword ? 'text' : 'password'"
              @click:append="showPassword = !showPassword"
              v-model="currentPassword"
              :error-messages="fieldErrors('currentPassword')"
              @input="$v.currentPassword.$touch()"
              @blur="$v.currentPassword.$touch()"
              required
            ></v-text-field>
            <password
              v-model="password"
              :badge="false"
              hint
              @next="handlePasswordScoreEvent"
              required
            ></password>
            <v-text-field
              class="box-input"
              :placeholder="$t('changePassword.confirmPassword')"
              :append-icon="showPassword2 ? 'visibility' : 'visibility_off'"
              :type="showPassword2 ? 'text' : 'password'"
              @click:append="showPassword2 = !showPassword2"
              v-model="repeatPassword"
              :error-messages="fieldErrors('repeatPassword')"
              @input="$v.repeatPassword.$touch()"
              @blur="$v.repeatPassword.$touch()"
              required
            ></v-text-field>

            <v-layout
              v-if="!keyboardIsUp"
              justify-space-around
              class="put-bottom"
            >
              <v-flex xs5>
                <v-btn
                  large
                  round
                  block
                  color="gray"
                  class="mt-4"
                  @click="backToDashboard"
                  >{{ $t("common.cancel") }}</v-btn
                >
              </v-flex>
              <v-flex xs5>
                <v-btn
                  large
                  round
                  block
                  color="primary"
                  class="mt-4"
                  :disabled="$v.$invalid"
                  :class="$v.$invalid ? '' : 'white--text'"
                  @click="submit"
                  >{{ $t("common.accept") }}</v-btn
                >
              </v-flex>
            </v-layout>
          </v-form>
        </v-card>
      </v-flex>
    </v-layout>
    <v-dialog v-model="dialogC" persistent max-width="290">
      <v-card>
        <v-card-title class="headline">{{ textDialogC }}</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn round color="primary" @click.native="backToDashboard">{{
            $t("common.accept")
          }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script>
import ResizeMixin from "@/mixins/ResizeMixin";
import Password from "@/components/PasswordStrength.vue";
import { required, sameAs } from "vuelidate/lib/validators";
import validationLangMixin from "@/mixins/validationLangMixin";
import { changePassApi } from "@/api/modules";
import { i18n } from "@/i18n";
import { mapGetters } from "vuex";
import { refreshToken } from "@/utils/helpers";
export default {
  mixins: [validationLangMixin, ResizeMixin],
  validations: {
    currentPassword: {
      required
    },
    password: { required },
    repeatPassword: {
      sameAsPassword: sameAs("password")
    }
  },
  validationMessages: {
    password: { required: "validation.password.required" },
    currentPassword: {
      required: "validation.password.required",
      sameAsRealPassword: "validation.password.confirm"
    },
    repeatPassword: {
      sameAsPassword: "validation.password.confirm"
    }
  },
  components: {
    Password
  },
  computed: {
    ...mapGetters(["keyboardIsUp"])
  },
  data() {
    return {
      realPassword: localStorage.password,
      currentPassword: null,
      password: null,
      repeatPassword: null,
      passwordScore: 0,
      loader: false,
      showPassword: false,
      showPassword2: false,
      dialogC: false,
      textDialogC: ""
    };
  },

  methods: {
    handlePasswordScoreEvent(data) {
      this.passwordScore = data.score;
    },
    async submit() {
      let body = {
        new_password: this.password,
        old_password: this.currentPassword
      };
      let serviceResponse = await changePassApi(body);
      console.log(serviceResponse);
      if (serviceResponse.ok) {
        await refreshToken();
        this.dialogC = true;
        this.textDialogC = i18n.t("operationKey.change");
      } else {
        const params = { text: serviceResponse.message.text };
        window.getApp.$emit("SHOW_ERROR", params);
      }
    },
    backToDashboard() {
      this.dialogC = false;
      this.$router.push({
        name: "Home"
      });
    }
  }
};
</script>
<style>
.backgroundC {
  background: white;
}
</style>
