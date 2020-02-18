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
                                $t("common.personalInformation")
                              }}</strong>
                            </div>
                          </v-flex>
                          <v-flex xs12 pa-0>
                            <v-select
                              :items="genders"
                              color="primary"
                              :label="$t('common.gender')"
                              v-model="form.gender"
                              required
                              class="box-input"
                              :error-messages="fieldErrors('form.gender')"
                              @blur="$v.form.gender.$touch()"
                            ></v-select>
                            <v-text-field
                              color="primary"
                              :label="$t('common.phone')"
                              v-model="form.phone_number"
                              mask="phone"
                            ></v-text-field>
                            <v-text-field
                              color="primary"
                              :label="$t('common.secondaryEmail')"
                              v-model="form.secondary_email"
                              :error-messages="
                                fieldErrors('form.secondary_email')
                              "
                              @blur="$v.form.secondary_email.$touch()"
                            ></v-text-field>
                            <v-dialog
                              ref="dialog"
                              v-model="modal"
                              :return-value.sync="form.birth_date"
                              lazy
                              full-width
                              width="290px"
                            >
                              <template v-slot:activator="{ on }">
                                <v-text-field
                                  v-model="form.birth_date"
                                  :label="$t('common.birthdate')"
                                  prepend-icon="event"
                                  readonly
                                  v-on="on"
                                  :error-messages="
                                    fieldErrors('form.birth_date')
                                  "
                                  @blur="$v.form.birth_date.$touch()"
                                ></v-text-field>
                              </template>
                              <v-date-picker
                                v-model="form.birth_date"
                                ref="picker"
                                scrollable
                                :max="new Date().toISOString().substr(0, 10)"
                              >
                                <v-spacer></v-spacer>
                                <v-btn
                                  flat
                                  color="primary"
                                  @click="modal = false"
                                  >{{ $t("common.cancel") }}</v-btn
                                >
                                <v-btn
                                  flat
                                  color="primary"
                                  @click="$refs.dialog.save(form.birth_date)"
                                  >{{ $t("common.ok") }}</v-btn
                                >
                              </v-date-picker>
                            </v-dialog>
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
import { required, email } from "vuelidate/lib/validators";
import validationLangMixin from "@/mixins/validationLangMixin";
import { genders } from "@/config/constants";
import { mapGetters } from "vuex";
const defaultForm = {
  birth_date: null,
  gender: null,
  phone_number: null,
  secondary_email: null
};
export default {
  mixins: [validationLangMixin, ResizeMixin],
  validations: {
    form: {
      birth_date: { required },
      gender: { required },
      secondary_email: { email }
    }
  },
  validationMessages: {
    form: {
      birth_date: {
        required: "validation.fieldRequired"
      },
      gender: {
        required: "validation.fieldRequired"
      },
      secondary_email: {
        email: "validation.email.valid"
      }
    }
  },
  data() {
    return {
      height: window.innerHeight - 72, // 72 is stepper header size
      form: Object.assign({}, defaultForm),
      genders,
      loader: false,
      modal: false
    };
  },
  watch: {
    modal(val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = "YEAR"));
    }
  },
  computed: {
    ...mapGetters(["keyboardIsUp"])
  },
  methods: {
    submit() {
      this.$emit("next", {
        birth_date: this.form.birth_date,
        gender: this.form.gender,
        phone_number: this.form.phone_number,
        secondary_email: this.form.secondary_email
      });
    }
  }
};
</script>
