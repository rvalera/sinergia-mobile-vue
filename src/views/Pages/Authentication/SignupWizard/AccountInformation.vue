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
                              v-model="form.phoneNumber"
                              required
                              mask="phone"
                              :error-messages="fieldErrors('form.phoneNumber')"
                              @blur="$v.form.phoneNumber.$touch()"
                            ></v-text-field>
                            <v-text-field
                              color="primary"
                              label="Correo secundario"
                              v-model="form.secondaryEmail"
                              required
                              :error-messages="
                                fieldErrors('form.secondaryEmail')
                              "
                              @blur="$v.form.secondaryEmail.$touch()"
                            ></v-text-field>
                            <v-dialog
                              ref="dialog"
                              v-model="modal"
                              :return-value.sync="form.birthdate"
                              lazy
                              full-width
                              width="290px"
                            >
                              <template v-slot:activator="{ on }">
                                <v-text-field
                                  v-model="form.birthdate"
                                  label="Fecha de nacimiento"
                                  prepend-icon="event"
                                  readonly
                                  v-on="on"
                                  :error-messages="
                                    fieldErrors('form.birthdate')
                                  "
                                  @blur="$v.form.birthdate.$touch()"
                                ></v-text-field>
                              </template>
                              <v-date-picker
                                v-model="form.birthdate"
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
                                  @click="$refs.dialog.save(form.birthdate)"
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
  birthdate: null,
  gender: null,
  phoneNumber: null,
  secondaryEmail: null
};
export default {
  mixins: [validationMixin, ResizeMixin],
  validations: {
    form: {
      birthdate: { required },
      gender: { required },
      phoneNumber: { required },
      secondaryEmail: { required, email }
    }
  },
  validationMessages: {
    form: {
      birthdate: {
        required: "Campo requerido"
      },
      gender: {
        required: "Campo requerido"
      },
      phoneNumber: {
        required: "Campo requerido"
      },
      secondaryEmail: {
        required: "Por favor ingresa un correo",
        email: "Correo debe ser valido"
      }
    }
  },
  data() {
    return {
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
      this.loader = true;
      setTimeout(() => {
        this.$emit("next", {
          birthdate: this.form.birthdate,
          gender: this.form.gender,
          phoneNumber: this.form.phoneNumber,
          secondaryEmail: this.form.secondaryEmail
        });
      }, 2000);
    }
  }
};
</script>
