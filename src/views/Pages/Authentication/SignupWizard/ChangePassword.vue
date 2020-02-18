<template>
  <v-layout wrap>
    <v-flex xs12>
      <v-layout>
        <v-flex xs12>
          <v-card
            flat
            :height="`${height}px`"
            class="margin-auto transparent"
            width="360"
          >
            <v-container fill-height pa-0>
              <v-layout>
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
                              <strong class="primary--text">{{
                                $t("changePassword.newPassword")
                              }}</strong>
                            </div>
                          </v-flex>
                          <v-flex xs12 px-0>
                            <v-divider class="section-spacer"></v-divider>
                          </v-flex>
                          <v-flex xs12 pa-0>
                            <password
                              v-model="password"
                              :badge="false"
                              hint
                              @next="handlePasswordScoreEvent"
                              required
                            ></password>
                            <v-text-field
                              class="box-input"
                              :placeholder="
                                $t('changePassword.confirmPassword')
                              "
                              :append-icon="
                                showPassword ? 'visibility' : 'visibility_off'
                              "
                              :type="showPassword ? 'text' : 'password'"
                              @click:append="showPassword = !showPassword"
                              v-model="repeatPassword"
                              :error-messages="fieldErrors('repeatPassword')"
                              @input="$v.repeatPassword.$touch()"
                              @blur="$v.repeatPassword.$touch()"
                              required
                            ></v-text-field>
                          </v-flex>
                          <div class="put-bottom px-3">
                            <v-btn
                              :loading="loader"
                              color="primary"
                              block
                              round
                              type="submit"
                              :disabled="$v.$invalid"
                              v-if="!keyboardIsUp"
                              class="ml-0"
                              :class="$v.$invalid ? '' : 'white--text'"
                              >{{ $t("common.continue") }}</v-btn
                            >
                          </div>
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
import validationLangMixin from "@/mixins/validationLangMixin";
import { mapGetters } from "vuex";

export default {
  mixins: [validationLangMixin, ResizeMixin],
  validations: {
    password: { required },
    repeatPassword: {
      sameAsPassword: sameAs("password")
    }
  },
  validationMessages: {
    password: { required: "validation.password.required" },
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
      height: window.innerHeight - 72, // 72 is stepper header size
      password: null,
      repeatPassword: null,
      passwordScore: 0,
      loader: false,
      showPassword: false
    };
  },
  methods: {
    handlePasswordScoreEvent(data) {
      this.passwordScore = data.score;
    },
    submit() {
      this.$emit("next", { password: this.password });
    }
  }
};
</script>
