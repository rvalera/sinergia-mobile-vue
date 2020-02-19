<template>
  <v-container fill-height>
    <v-layout row wrap>
      <v-flex xs12 sm6 class="text-xs-center">
        <v-card elevation="0" class="text-xs-left ">
          <br />

          <div class="text-xs-center">
            <v-icon x-large color="primary">email</v-icon>
          </div>
          <v-card-text>
            <v-form @submit.prevent="$v.$invalid ? null : submit()" ref="form">
              <v-container grid-list-xl fluid>
                <v-layout wrap>
                  <v-flex xs12 pa-0>
                    <v-text-field
                      type="email"
                      color="primary"
                      :label="$t('common.destinyEmail')"
                      v-model="form.destiny_email"
                      required
                      :error-messages="fieldErrors('form.destiny_email')"
                      @blur="$v.form.destiny_email.$touch()"
                    ></v-text-field>
                  </v-flex>

                  <div v-if="!keyboardIsUp" class="put-bottom px-3">
                    <!-- Login form submit -->

                    <v-btn
                      :loading="loader"
                      color="primary"
                      round
                      block
                      type="submit"
                      :disabled="$v.$invalid"
                      class="mt-4"
                      :class="$v.$invalid ? '' : 'white--text'"
                    >
                      {{ $t("common.next") }}
                    </v-btn>
                  </div>
                </v-layout>
              </v-container>
            </v-form>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import ResizeMixin from "@/mixins/ResizeMixin";
import { required, email } from "vuelidate/lib/validators";
import validationMixin from "@/mixins/validationMixin";
import { mapGetters } from "vuex";
const defaultForm = {
  destiny_email: null
};
export default {
  mixins: [validationMixin, ResizeMixin],
  validations: {
    form: {
      destiny_email: { required, email }
    }
  },
  validationMessages: {
    form: {
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
      modal: false,
      coin: localStorage.getItem("coin")
    };
  },
  computed: {
    ...mapGetters(["keyboardIsUp"])
  },
  methods: {
    submit() {
      const { lastEmailLogged } = localStorage;
      if (lastEmailLogged === this.form.destiny_email) {
        const params = { text: this.$t("message.myEmail") };
        window.getApp.$emit("SHOW_ERROR", params);
      } else
        this.$emit("next", {
          destiny_email: this.form.destiny_email
        });
    }
  }
};
</script>
<style>
.textAlign {
  text-align: center;
  padding-bottom: 0px !important;
}
</style>
