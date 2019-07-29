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
                          <!-- <v-flex xs12 px-0>
                            <div class="dialog-title">
                              <strong>Your</strong>
                              <br>
                              <strong class="primary--text">
                                Profile Details
                              </strong>
                            </div>
                          </v-flex> -->
                          <!-- <v-flex xs12 px-0>
                            <v-divider class="section-spacer"></v-divider>
                          </v-flex> -->
                          <v-flex xs12 pa-0>
                            <v-text-field
                              color="primary"
                              placeholder="First Name"
                              v-model="firstname"
                              required
                              class="box-input"
                              :error-messages="fieldErrors('firstname')"
                              @blur="$v.firstname.$touch()"
                            ></v-text-field>
                            <v-text-field
                              color="primary"
                              placeholder="Last Name"
                              v-model="lastname"
                              required
                              class="box-input"
                              :error-messages="fieldErrors('lastname')"
                              @blur="$v.lastname.$touch()"
                            ></v-text-field>
                            <v-text-field
                              color="primary"
                              placeholder="Username"
                              v-model="username"
                              required
                              class="box-input"
                              :error-messages="fieldErrors('username')"
                              @blur="$v.username.$touch()"
                            ></v-text-field>
                            <password v-model="password" :badge="false" hint="" @next="handlePasswordScoreEvent" required></password>
                            <v-text-field
                              class="box-input"
                              placeholder="Confirm New Password"
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
    <v-flex xs12 sm6 primary>
      <v-container fill-height>
        <v-layout align-center>
          <v-flex xs12 class="text-xs-center">
            <img src="/static/vuse.svg" alt="Vuse" class="text-xs-center" height="100">
            <div class="body-2 white--text">Enter your emaill address, we will send you a mail for verification code.</div>
          </v-flex>
        </v-layout>
      </v-container>
    </v-flex>
  </v-layout>
</template>
<script>
import ResizeMixin from "@/mixins/ResizeMixin";
import Password from "@/components/PasswordStrength.vue";
import { required, sameAs } from "vuelidate/lib/validators";
import validationLangMixin from "@/mixins/validationLangMixin";

export default {
  mixins: [validationLangMixin, ResizeMixin],
  validations: {
    firstname: { required },
    lastname: { required },
    username: { required },
    password: { required },
    repeatPassword: {
      sameAsPassword: sameAs("password")
    }
  },
  validationMessages: {
    firstname: {
      required: "validation.userprofile.first.required"
    },
    lastname: {
      required: "validation.userprofile.last.required"
    },
    username: {
      required: "validation.username.required"
    },
    password: { required: "validation.password.required" },
    repeatPassword: {
      sameAsPassword: "validation.password.confirm"
    }
  },
  components: {
    Password
  },
  data() {
    return {
      firstname: null,
      lastname: null,
      username: null,
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
          firstname: this.firstname,
          lastname: this.lastname,
          username: this.username,
          password: this.password
        });
      }, 2000);
    }
  }
};
</script>
