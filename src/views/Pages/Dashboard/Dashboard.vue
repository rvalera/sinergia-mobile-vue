<template>
  <v-container fill-height>
    <v-layout row wrap align-content-center-top justify-center>
      <v-flex xs12 sm6 class="text-xs-center">
        <v-card elevation="4" class="text-xs-left pa-1">
          <v-flex>
            <mini-chart
              class="box-white-500-glow"
              type="line-chart"
              title="Balance"
              sub-title="to target"
              icon="trending_up"
              icon-color="success"
              subtitle-large="45,00 VR"
              pre-subtitle="28%"
              :data="lineChartData.dashboardDownloads.data"
              :option="lineChartData.dashboardDownloads.option"
            ></mini-chart>
          </v-flex>
          <v-card-text>
            <v-form @submit.prevent="$v.$invalid ? null : submit()" ref="form">
              <v-container grid-list-xl fluid>
                <v-layout wrap>
                  <v-flex xs12 pa-0>
                    <v-text-field
                      color="primary"
                      label="Monto"
                      type="number"
                      v-model="form.amount"
                      required
                      :error-messages="fieldErrors('form.amount')"
                      @blur="$v.form.amount.$touch()"
                    ></v-text-field>
                    <v-text-field
                      color="primary"
                      label="Concepto"
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
                          >Continue</v-btn
                        >
                        <v-btn
                          large
                          block
                          round
                          color="gray"
                          class="mt-4"
                          @click="$emit('back')"
                          >Volver</v-btn
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
import MiniChart from "@/components/Widgets/Chart/MiniChart";
import ResizeMixin from "@/mixins/ResizeMixin";
import { required } from "vuelidate/lib/validators";
import validationMixin from "@/mixins/validationMixin";
import { lineChartJs as lineChartData } from "@/data/ChartWidget";
const defaultForm = {
  description: null,
  amount: null
};
export default {
  components: {
    MiniChart
  },
  props: {
    payData: Object
  },
  mixins: [validationMixin, ResizeMixin],
  validations: {
    form: {
      description: { required },
      amount: { required }
    }
  },
  validationMessages: {
    form: {
      description: {
        required: "Campo requerido"
      },
      amount: {
        required: "Campo requerido"
      }
    }
  },
  data() {
    return {
      height: window.innerHeight - 72, // 72 is stepper header size
      form: Object.assign({}, defaultForm),
      loader: false,
      modal: false,
      lineChartData
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
