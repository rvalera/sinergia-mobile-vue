<template>
  <v-container fill-height>
    <v-layout row wrap>
      <v-flex xs12 sm6 class="text-xs-center">
        <v-card elevation="0" class="text-xs-left pa-1">
          <v-card-text>
            <v-form @submit.prevent="$v.$invalid ? null : submit()" ref="form">
              <v-container grid-list-xl fluid>
                <div class="text-xs-center">
                  <v-icon x-large color="primary">receipt</v-icon>
                </div>
                <v-layout wrap>
                  <p class="subheading my-4">
                    <b>{{ $t("pay.destination") }}:</b>
                    {{ payData.target }}
                    <br />
                    <br />
                    <b>{{ $t("common.firstName") }}:</b>
                    {{ payData.target_name }}
                    <br />
                    <br />
                    <b>{{ $t("pay.device") }}:</b>
                    {{ payData.terminal }}
                  </p>

                  <v-flex xs12 pa-0>
                    <v-text-field
                      color="primary"
                      :label="$t('common.amount')"
                      type="number"
                      v-model="form.amount"
                      required
                      :error-messages="fieldErrors('form.amount')"
                      @blur="$v.form.amount.$touch()"
                    ></v-text-field>
                    <v-text-field
                      color="primary"
                      :label="$t('pay.concept')"
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
                          color="primary"
                          large
                          block
                          round
                          type="submit"
                          :disabled="$v.$invalid"
                          class="ml-0"
                          :class="$v.$invalid ? '' : 'white--text'"
                          >{{ $t("common.next") }}</v-btn
                        >
                        <v-btn
                          large
                          block
                          round
                          color="gray"
                          class="mt-4"
                          @click="$emit('back')"
                          >{{ $t("common.goBack") }}</v-btn
                        >
                      </v-flex>
                    </v-layout>
                  </v-flex>
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
import { required } from "vuelidate/lib/validators";
import validationLangMixin from "@/mixins/validationLangMixin";
const defaultForm = {
  description: null,
  amount: null
};
export default {
  props: {
    payData: Object
  },
  mixins: [validationLangMixin, ResizeMixin],
  validations: {
    form: {
      description: { required },
      amount: { required }
    }
  },
  validationMessages: {
    form: {
      description: {
        required: "validation.fieldRequired"
      },
      amount: {
        required: "validation.fieldRequired"
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
        amount: this.form.amount
      });
    }
  }
};
</script>
