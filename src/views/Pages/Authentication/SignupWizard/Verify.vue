<template>
  <v-layout wrap>
    <v-flex xs12 sm6>
      <v-layout align-center>
        <v-flex xs12>
          <v-card
            flat
            height="480"
            class="margin-auto transparent"
            width="360"
          >
            <v-container fill-height pa-0>
              <v-layout align-center>
                <v-flex xs12>
                  <v-card-text>
                    <v-form @submit.prevent="$v.$invalid ? null : submit()" ref="form">
                      <v-container grid-list-xl fluid>
                        <v-layout wrap>
                          <v-flex xs12 px-0>
                            <div class="dialog-title">
                              <strong>Check your</strong>
                              <br>
                              <strong class="primary--text">
                                email!
                              </strong>
                            </div>
                          </v-flex>
                          <v-flex xs12 px-0>
                            <v-divider class="section-spacer"></v-divider>
                          </v-flex>
                          <v-flex xs12 pa-0>
                            <masked-input mask="111-11" placeholder="000-00"
                              @input="code = arguments[1]"
                              class="code-mask-box-fix text-xs-center"
                              :error-messages="fieldErrors('code')"
                              @blur="$v.code.$touch()"/>
                          </v-flex>

                          <v-flex xs12 mt-2>
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
                                >Continue</v-btn>
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
import { required } from "vuelidate/lib/validators";
import validationMixin from "@/mixins/validationMixin";
import MaskedInput from "vue-masked-input";

export default {
  mixins: [validationMixin],
  validations: {
    code: { required }
  },
  validationMessages: {
    code: {
      required: "Please enter code",
      code: "Email must be valid"
    }
  },
  components: {
    MaskedInput
  },
  data() {
    return {
      code: null,
      loader: false
    };
  },
  methods: {
    submit() {
      this.loader = true;
      setTimeout(() => {
        this.$emit("next", { code: this.code });
      }, 2000);
    }
  }
};
</script>
