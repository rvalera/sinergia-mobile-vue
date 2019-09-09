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
                              <strong class="primary--text"
                                >Datos de transferencia</strong
                              >
                            </div>
                          </v-flex>
                          <v-flex xs12 pa-0>
                            <v-text-field
                              color="primary"
                              label="Correo Destino"
                              v-model="form.destiny_email"
                              required
                              :error-messages="
                                fieldErrors('form.destiny_email')
                              "
                              @blur="$v.form.destiny_email.$touch()"
                            ></v-text-field>

                            <v-text-field
                              color="primary"
                              label="Monto"
                              v-model="form.amount"
                              required
                              :error-messages="fieldErrors('form.amount')"
                              @blur="$v.form.amount.$touch()"
                            ></v-text-field>
                            <v-text-field
                              color="primary"
                              label="Descripción"
                              v-model="form.description"
                              required
                              :error-messages="fieldErrors('form.description')"
                              @blur="$v.form.description.$touch()"
                            ></v-text-field>
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
  description: null,
  amount: null,
  destiny_email: null
};
export default {
  mixins: [validationMixin, ResizeMixin],
  validations: {
    form: {
      description: { required },
      amount: { required },
      destiny_email: { required, email }
    }
  },
  validationMessages: {
    form: {
      description: {
        required: "Campo requerido"
      },
      amount: {
        required: "Campo requerido"
      },
      destiny_email: {
        required: "Por favor ingresa un correo",
        email: "Correo debe ser valido"
      }
    }
  },
  data() {
    return {
      height: window.innerHeight - 72, // 72 is stepper header size
      form: Object.assign({}, defaultForm),
      loader: false,
      modal: false
    };
  },
  methods: {
    submit() {
      this.$emit("next", {
        description: this.form.description,
        amount: this.form.amount,
        destiny_email: this.form.destiny_email
      });
    }
  }
};
</script>
