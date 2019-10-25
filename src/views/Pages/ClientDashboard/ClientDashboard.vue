<template>
  <v-layout row wrap align-content-center-top justify-center>
    <date-filter ref="modal" @filter="setFilter"></date-filter>
    <v-flex xs12 sm6 class="text-xs-center">
      <v-card elevation="0" class="text-xs-left pa-1">
        <v-flex>
          <mini-chart
            v-if="activeGraph"
            class="box-white-500-glow"
            type="line-chart"
            title="Balance"
            sub-title="to target"
            icon="trending_up"
            icon-color="success"
            :subtitle-large="balance.format() + ' Vr'"
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
//import "../../../assets/utils";
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
      balance: 0,
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
          animation: {
            duration: 0
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
      console.log(person_id + filter);
      var serviceResponse = await getDashboardGraph(person_id, filter);
      console.log(serviceResponse);
      let data = serviceResponse.data;

      // var response = {
      //   ok: 1,
      //   data: {
      //     current_balance: 850.36,
      //     daily_balance: {
      //       "18-10": 888.58,
      //       "19-10": 718,
      //       "20-10": 850.36,
      //       "21-10": 878.58,
      //       "22-10": 748,
      //       "23-10": 850.36
      //     }
      //   }
      // };
      //==================================================

      let labels = Object.keys(data.daily_balance);
      let datasets = Object.values(data.daily_balance);
      this.balance = data.current_balance;
      // for (let item in data.daily_balance) {
      //   console.log(item + " " + data.daily_balance[item]);
      //   labels.push(item.toString());
      //   datasets.push(data.daily_balance[item]);
      // }

      //this is data to fill graph width
      labels.push("");
      labels.splice(0, 0, "");
      datasets.push(datasets[datasets.length - 1]);
      datasets.splice(0, 0, datasets[0]);

      console.log(labels);
      console.log(datasets);
      this.graphData.data.labels = labels;
      this.graphData.data.datasets[0].data = datasets;
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
