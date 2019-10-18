<template>
  <v-layout row wrap align-content-center-top justify-center>
    <v-flex xs12 sm6 class="text-xs-center">
      <v-card elevation="0" class="text-xs-left pa-1">
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
      </v-card>

      <v-btn block color="blue">
        <v-icon>mdi-filter</v-icon>
      </v-btn>
    </v-flex>

    <v-toolbar color="primary" dark>
      <v-toolbar-title>Actividad</v-toolbar-title>
    </v-toolbar>

    <app-movements :activeButton="false"> </app-movements>
  </v-layout>
</template>
<script>
import MiniChart from "@/components/Widgets/Chart/MiniChart";
import { lineChartJs as lineChartData } from "@/data/ChartWidget";
import { mapActions } from "vuex";
import AppMovements from "../Global/AppMovements";

export default {
  components: {
    MiniChart,
    AppMovements
  },
  props: {
    payData: Object
  },

  data() {
    return {
      height: window.innerHeight - 72, // 72 is stepper header size
      loader: false,
      modal: false,
      lineChartData
    };
  },
  methods: {
    ...mapActions(["setTransactionsApp"]),
    async showMovements() {
      const { person_id } = localStorage;
      let filter = {
        page: 1,
        perPage: 5,
        id: person_id
      };

      this.setTransactionsApp(filter);
    }
  },
  mounted() {
    this.showMovements();
  }
};
</script>
