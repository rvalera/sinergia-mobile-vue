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
                                $t("common.operationKey")
                              }}</strong>
                            </div>
                          </v-flex>
                          <v-flex xs12 px-0>
                            <v-divider class="section-spacer"></v-divider>
                          </v-flex>
                          <v-flex xs12 pa-0>
                            <v-text-field
                              class="box-input"
                              :placeholder="$t('common.typeYourOperationKey')"
                              :append-icon="
                                showPassword ? 'visibility' : 'visibility_off'
                              "
                              :type="showPassword ? 'text' : 'password'"
                              @click:append="showPassword = !showPassword"
                              v-model="password"
                              :error-messages="fieldErrors('password')"
                              @input="$v.password.$touch()"
                              @blur="$v.password.$touch()"
                              required
                              counter
                              maxlength="6"
                            ></v-text-field>
                            <v-text-field
                              class="box-input"
                              :placeholder="$t('changeOperationKey.confirm')"
                              :append-icon="
                                showPassword2 ? 'visibility' : 'visibility_off'
                              "
                              :type="showPassword2 ? 'text' : 'password'"
                              @click:append="showPassword2 = !showPassword2"
                              v-model="repeatPassword"
                              :error-messages="fieldErrors('repeatPassword')"
                              @input="$v.repeatPassword.$touch()"
                              @blur="$v.repeatPassword.$touch()"
                              required
                              counter
                              maxlength="6"
                            ></v-text-field>
                          </v-flex>
                          <div class=" put-bottom px-3">
                            <v-btn
                              :loading="loader"
                              color="primary"
                              block
                              round
                              type="submit"
                              v-if="!keyboardIsUp"
                              :disabled="$v.$invalid"
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
import { required, sameAs, minLength } from "vuelidate/lib/validators";
import validationLangMixin from "@/mixins/validationLangMixin";
import { mapGetters } from "vuex";

export default {
  mixins: [validationLangMixin, ResizeMixin],
  validations: {
    password: { required, minLength: minLength(6) },
    repeatPassword: {
      sameAsPassword: sameAs("password")
    }
  },
  validationMessages: {
    password: {
      required: "validation.operationKey.required",
      minLength: "validation.operationKey.minLength"
    },
    repeatPassword: {
      sameAsPassword: "validation.operationKey.confirm"
    }
  },
  data() {
    return {
      height: window.innerHeight - 72, // 72 is stepper header size
      password: null,
      repeatPassword: null,
      passwordScore: 0,
      loader: false,
      showPassword: false,
      showPassword2: false
    };
  },
  computed: {
    ...mapGetters(["keyboardIsUp"])
  },
  methods: {
    handlePasswordScoreEvent(data) {
      this.passwordScore = data.score;
    },
    submit() {
      this.$emit("success", {
        operation_key: this.password
      });
    }
  }
};
</script>
