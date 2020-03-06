<template>
  <v-layout row wrap align-content-center-top justify-center>
    <date-filter ref="modal" @filter="setFilter"></date-filter>
    <v-flex xs12 sm6 class="text-xs-center">
      <v-card elevation="0" class="text-xs-left pa-1">
        <v-flex>
          <template v-if="!activeGraph">
            <v-card-text class="textAlign">
              <p class="subheading my-0 grey--text text-right">
                {{ $t("dashboard.balance") }}
              </p>
              <span class="display-1 font-weight-black green--text darken-4"
                >0,00 {{ coin }}</span
              >
            </v-card-text>
            <v-flex xs12 sm6 class="text-xs-center pa-3">
              <br />
              <br />
              <br />
              <br />
              <br />
              <hr />
            </v-flex>
          </template>
          <mini-chart
            v-if="activeGraph"
            class="box-white-500-glow"
            type="line-chart"
            :title="$t('dashboard.balance')"
            sub-title="to target"
            icon="trending_up"
            icon-color="success"
            :subtitle-large="balance.format() + ' ' + coin"
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
      <v-btn @click="handleShowMovements" color="white" small icon fab light>
        <v-icon medium color="primary">mdi-magnify</v-icon>
      </v-btn>
    </v-toolbar>
    <movement-filter ref="filter" />
    <app-movements
      :activeAutoScroll="false"
      :hasFilterFab="false"
    ></app-movements>
    <v-dialog v-model="dialog" persistent max-width="290">
      <v-card>
        <v-card-title class="headline">
          {{ $t("dashboard.confirm") }}
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn round color="primary" @click.native="closeDialogExit">{{
            $t("common.cancel")
          }}</v-btn>
          <v-btn round color="primary" @click.native="exitApp">{{
            $t("common.accept")
          }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>
<script>
import MiniChart from "@/components/Widgets/Chart/MiniChart";
import { lineChartJs as lineChartData } from "@/data/ChartWidget";
import { mapActions, mapGetters } from "vuex";
import AppMovements from "../Global/AppMovements";
import MovementFilter from "../Global/MovementFilter";
import { getDashboardGraph } from "@/api/modules";
import DateFilter from "./DateFilter";
//import { labeledStatement } from "babel-types";
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
      dialog: false,
      coin: localStorage.getItem("coin"),
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
  watch: {
    dialogIsUp(value) {
      if (value)
        document.removeEventListener("backbutton", this.openDialogExit);
      else document.addEventListener("backbutton", this.openDialogExit, false);
    },
    dialog(value) {
      this.handleDialog(value);
      if (value)
        document.addEventListener("backbutton", this.closeDialogExit, false);
      else document.removeEventListener("backbutton", this.closeDialogExit);
    }
  },
  computed: {
    ...mapGetters(["dialogIsUp"]),
    setGraphData() {
      return this.graphData;
    }
  },
  methods: {
    ...mapActions([
      "setTransactionsApp",
      "setBalanceWallet",
      "logoutAction",
      "handleDialog"
    ]),
    showModal() {
      this.$refs.modal.show();
    },
    setFilter(data) {
      this.activeGraph = false;
      this.getGraphData(data);
    },
    async showMovements(pages = 5) {
      let filter = {
        page: 1,
        perPage: pages,
        field: "blockchain_id"
      };

      this.setTransactionsApp(filter);
    },

    async getGraphData(filter = {}) {
      const params = {
        filter
      };
      var serviceResponse = await getDashboardGraph(params);
      console.log(serviceResponse);
      if (serviceResponse.ok) {
        let data = serviceResponse.data;

        let labels = [];
        let keys = Object.keys(data.daily_balance);

        keys.map(item => {
          labels.push(item.substr(5));
        });
        let datasets = Object.values(data.daily_balance);
        this.balance = data.current_balance;
        this.setBalanceWallet(data.current_balance);
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
      } else {
        const params = { text: serviceResponse.message.text };
        window.getApp.$emit("SHOW_ERROR", params);
      }
    },
    handleShowMovements() {
      this.$router.push({
        name: "/MovementContainer"
      });
    },
    openDialogExit() {
      this.dialog = true;
    },
    closeDialogExit() {
      this.dialog = false;
    },
    async exitApp() {
      await this.logoutAction();
      navigator.app.exitApp();
    }
  },
  mounted() {
    this.showMovements();
    this.getGraphData();
    document.addEventListener("backbutton", this.openDialogExit, false);
  },
  beforeDestroy() {
    document.removeEventListener("backbutton", this.openDialogExit);
  }
};
</script>
