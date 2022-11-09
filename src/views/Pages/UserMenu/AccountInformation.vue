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
                          <v-flex xs12 pa-0>
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
                              required
                              mask="phone"
                            ></v-text-field>
                            <v-text-field
                              color="primary"
                              :label="$t('common.secondaryEmail')"
                              v-model="form.secondary_email"
                              required
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

                          <!-- <div class=" put-bottom px-3">
                            <v-btn
                              :loading="loader"
                              color="primary"
                              block
                              round
                              type="submit"
                              :disabled="$v.$invalid"
                              class="ml-0"
                              :class="$v.$invalid ? '' : 'white--text'"
                              >{{ $t("common.save") }}</v-btn
                            >
                          </div>-->
                        </v-layout>
                      </v-container>
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
                            type="submit"
                            >{{ $t("common.accept") }}</v-btn
                          >
                        </v-flex>
                      </v-layout>
                    </v-form>
                  </v-card-text>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card>
        </v-flex>
      </v-layout>
    </v-flex>
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
  </v-layout>
</template>
<script>
import ResizeMixin from "@/mixins/ResizeMixin";
import { required, email } from "vuelidate/lib/validators";
import validationLangMixin from "@/mixins/validationLangMixin";
import { genders } from "@/config/constants";
import { mapGetters, mapActions } from "vuex";

const defaultForm = {
  first_name: "",
  last_name: "",
  birth_date: null,
  gender: null,
  phone_number: null,
  secondary_email: null
};
export default {
  mixins: [validationLangMixin, ResizeMixin],
  validations: {
    form: {
      first_name: { required },
      last_name: { required },
      birth_date: { required },
      gender: { required },
      secondary_email: { email }
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
      form: Object.assign({}, defaultForm),
      genders,
      loader: false,
      modal: false,
      dialogC: false,
      textDialogC: ""
    };
  },
  watch: {
    modal(val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = "YEAR"));
    }
  },
  computed: {
    ...mapGetters(["user", "keyboardIsUp"])
  },
  mounted() {
    this.form = Object.assign({}, this.user.person);
  },
  methods: {
    ...mapActions(["updatePersonAction"]),
    async submit() {
      const serviceResponse = await this.updatePersonAction(this.form);
      if (serviceResponse.ok) {
        this.dialogC = true;
        this.textDialogC = this.$t("message.changeInformationSuccess");
      }
    },
    backToDashboard() {
      this.$router.push({
        name: "Home"
      });
    }
  }
};
</script>
