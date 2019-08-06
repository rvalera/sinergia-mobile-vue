<template>
  <v-layout wrap>
    <v-flex xs12>
      <v-layout align-center>
        <v-flex xs12>
          <v-card
            flat
            :height="`${height}px`"
            class="margin-auto transparent"
            width="360"
          >
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
                          <v-flex xs12 px-0>
                            <div class="dialog-title">
                              <strong class="primary--text">
                                Datos personales
                              </strong>
                            </div>
                          </v-flex>
                          <v-flex xs12 pa-0>
                            <v-select
                              :items="genders"
                              color="primary"
                              label="Genero"
                              v-model="form.gender"
                              required
                              class="box-input"
                              :error-messages="fieldErrors('form.gender')"
                              @blur="$v.form.gender.$touch()"
                            ></v-select>
                            <v-text-field
                              color="primary"
                              label="Teléfono"
                              v-model="form.phone_number"
                              required
                              mask="phone"
                              :error-messages="fieldErrors('form.phone_number')"
                              @blur="$v.form.phone_number.$touch()"
                            ></v-text-field>
                            <v-text-field
                              color="primary"
                              label="Correo secundario"
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
                                  label="Fecha de nacimiento"
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
                                scrollable
                              >
                                <v-spacer></v-spacer>
                                <v-btn
                                  flat
                                  color="primary"
                                  @click="modal = false"
                                  >Cancel</v-btn
                                >
                                <v-btn
                                  flat
                                  color="primary"
                                  @click="$refs.dialog.save(form.birth_date)"
                                  >OK</v-btn
                                >
                              </v-date-picker>
                            </v-dialog>
                          </v-flex>

                          <v-flex xs12>
                            <v-layout row wrap text-xs-left>
                              <!-- Login form submit -->
                              <v-flex xs12 class="no-mrpd">
                                <v-btn
                                  :loading="loader"
                                  color="act"
                                  block
                                  type="submit"
                                  :disabled="$v.$invalid"
                                  class="ml-0"
                                  :class="$v.$invalid ? '' : 'white--text'"
                                  >Continue</v-btn
                                >
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
import ResizeMixin from "@/mixins/ResizeMixin";
import { required, email } from "vuelidate/lib/validators";
import validationMixin from "@/mixins/validationMixin";
const defaultForm = {
  birth_date: null,
  gender: null,
  phone_number: null,
  secondary_email: null
};
export default {
  mixins: [validationMixin, ResizeMixin],
  validations: {
    form: {
      birth_date: { required },
      gender: { required },
      phone_number: { required },
      secondary_email: { required, email }
    }
  },
  validationMessages: {
    form: {
      birth_date: {
        required: "Campo requerido"
      },
      gender: {
        required: "Campo requerido"
      },
      phone_number: {
        required: "Campo requerido"
      },
      secondary_email: {
        required: "Por favor ingresa un correo",
        email: "Correo debe ser valido"
      }
    }
  },
  data() {
    return {
      height: window.innerHeight - 72, // 72 is stepper header size
      form: Object.assign({}, defaultForm),
      genders: [
        { text: "Masculino", value: "M" },
        { text: "Femenino", value: "F" }
      ],
      loader: false,
      modal: false
    };
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
