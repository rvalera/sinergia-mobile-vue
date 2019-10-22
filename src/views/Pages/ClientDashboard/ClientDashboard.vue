<template>
  <v-layout row wrap align-content-center-top justify-center>
    <date-filter ref="modal" @filter="setFilter"></date-filter>
    <v-flex xs12 sm6 class="text-xs-center">
      <v-card elevation="0" class="text-xs-left pa-1">
        <v-flex>
          <mini-chart
            v-if="this.activeGraph"
            class="box-white-500-glow"
            type="line-chart"
            title="Balance"
            sub-title="to target"
            icon="trending_up"
            icon-color="success"
            subtitle-large="45,00 VR"
            pre-subtitle="28%"
            :data="this.setGraphData.data"
            :option="this.setGraphData.option"
            @show="showModal"
          ></mini-chart>
        </v-flex>
      </v-card>
    </v-flex>

    <v-toolbar color="primary" dark>
      <v-toolbar-title>Actividad</v-toolbar-title>
      <v-spacer />
      <v-btn @click="handleShowFilter" color="white" small icon fab light>
        <v-icon medium color="primary">mdi-filter</v-icon>
      </v-btn>
    </v-toolbar>
    <movement-filter ref="filter" />
    <app-movements
      :activeButton="false"
      :activeAutoScroll="false"
      :hasFilterFab="false"
    ></app-movements>
  </v-layout>
</template>
<script>
import MiniChart from "@/components/Widgets/Chart/MiniChart";
import { lineChartJs as lineChartData } from "@/data/ChartWidget";
import { mapActions } from "vuex";
import AppMovements from "../Global/AppMovements";
import MovementFilter from "../Global/MovementFilter";
import { getDashboardGraph } from "@/api/modules";
import DateFilter from "./DateFilter";
export default {
  components: {
    MiniChart,
    AppMovements,
    DateFilter,
    MovementFilter
  },
  props: {
    payData: Object
  },

  data() {
    return {
      height: window.innerHeight - 72, // 72 is stepper header size
      loader: false,
      modal: false,
      lineChartData,
      activeGraph: false,
      graphData: {
        data: {
          labels: [],
          datasets: [
            {
              fill: true,
              backgroundColor: "#d1effa",
              data: [],
              borderColor: "#39BAE8",
              pointBorderColor: "#39BAE8",
              pointBackgroundColor: "#39BAE8",
              shadowOffsetX: 3,
              shadowOffsetY: 3,
              shadowBlur: 10,
              shadowColor: "rgba(0, 196, 134, 0.5)",
              pointRadius: 2,
              pointBevelWidth: 3,
              pointBevelHighlightColor: "rgba(255, 255, 255, 0.75)",
              pointBevelShadowColor: "rgba(0, 196, 134, 0.5)",
              pointHoverRadius: 6,
              pointHoverBevelWidth: 4.5,
              pointHoverInnerGlowWidth: 20,
              pointHoverInnerGlowColor: `rgba(0, 196, 134, 0.5)`,
              pointHoverOuterGlowWidth: 20,
              pointHoverOuterGlowColor: `rgba(0, 196, 134, 0.5)`
            }
          ]
        },
        option: {
          responsive: true,
          maintainAspectRatio: false,
          legend: {
            display: false
          },
          layout: {
            padding: {
              left: 0,
              right: 50,
              top: 0,
              bottom: 10
            }
          },
          scales: {
            xAxes: [
              {
                display: true,
                ticks: {
                  autoSkip: true,
                  maxTicksLimit: 6,
                  fontSize: 12
                },
                gridLines: {
                  //offsetGridLines: true
                }
              }
            ],
            yAxes: [
              {
                display: false
              }
            ]
          }
        }
      }
    };
  },
  computed: {
    setGraphData() {
      return this.graphData;
    }
  },
  methods: {
    ...mapActions(["setTransactionsApp"]),
    showModal() {
      this.$refs.modal.show();
    },
    setFilter(data) {
      const { person_id } = localStorage;
      this.activeGraph = false;
      this.getGraphData(person_id, data);
    },
    async showMovements(person_id) {
      let filter = {
        page: 1,
        perPage: 5,
        id: person_id
      };

      this.setTransactionsApp(filter);
    },

    async getGraphData(person_id, filter = {}) {
      var serviceResponse = await getDashboardGraph(person_id, filter);
      let data = serviceResponse.data;
      //this is data to fill graph width
      data.labels.push("");
      data.labels.splice(0, 0, "");
      data.values.push(data.values[data.values.length - 1]);
      data.values.splice(0, 0, data.values[0]);
      this.graphData.data.labels = data.labels;
      this.graphData.data.datasets[0].data = data.values;
      //=============================================
      this.activeGraph = true;
    },
    handleShowFilter() {
      this.$refs.filter.show();
    }
  },
  mounted() {
    const { person_id } = localStorage;
    this.showMovements(person_id);
    // window.getApp.$emit("LOADING", true);
    this.getGraphData(person_id);
  }
};
</script>
