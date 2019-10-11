<template>
  <v-layout row>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-list two-line>
          <template v-for="(item, index) in transactions_app">
            <v-divider :key="index + 'e'"></v-divider>
            <v-list-tile :key="item.id" avatar>
              <v-list-tile-avatar
                width="60px"
                class="avatarCard"
                tile
                @click="handleClick(item)"
              >
                <v-img
                  :src="
                    getSource(item.source.id)
                      ? require('@/assets/images/arrow_out_red.png')
                      : require('@/assets/images/arrow_in_green.png')
                  "
                ></v-img>
              </v-list-tile-avatar>

              <v-list-tile-content @click="handleClick(item)">
                <v-list-tile-title
                  v-if="getSource(item.source.id)"
                  class="red--text"
                  v-html="
                    Number(item.amount).format() + ' ' + item.coin.diminutive
                  "
                ></v-list-tile-title>
                <v-list-tile-title
                  v-if="!getSource(item.source.id)"
                  class="green--text"
                  v-html="
                    Number(item.amount).format() + ' ' + item.coin.diminutive
                  "
                ></v-list-tile-title>
                <v-list-tile-sub-title
                  v-html="item.execution_date"
                ></v-list-tile-sub-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <div class="text-xs-center">
                  <v-chip v-if="getSource(item.source.id)" color="red" outline>
                    {{ item.type }}
                  </v-chip>

                  <v-chip
                    v-if="!getSource(item.source.id)"
                    color="green"
                    outline
                    >{{ item.type }}</v-chip
                  >
                </div>
              </v-list-tile-action>
            </v-list-tile>
          </template>
        </v-list>
      </v-card>
      <v-flex xs12 sm6 class="text-xs-center">
        <!-- <v-chip class="ma-2" color="primary" text-color="white" outlined @click="handleLoadMov">
          <v-avatar left>
            <v-icon color="white">mdi-chevron-double-down</v-icon>
          </v-avatar>Ver Mas
        </v-chip>-->
        <v-btn block color="primary" text-color="white" @click="handleLoadMov">
          <v-icon class="paddingBottom: 10px" color="white"
            >mdi-chevron-double-down</v-icon
          >
        </v-btn>
      </v-flex>
      <mov-info ref="modal"></mov-info>
    </v-flex>
  </v-layout>
</template>

<script>
import MovInfo from "./MovInfo";
import { mapActions, mapGetters } from "vuex";
import "../../../assets/utils";
//import image1 from "../../../assets/images/arrow_out_red"

export default {
  components: { MovInfo },
  data: () => ({
    transactions: [],
    filter: {},
    person_id: localStorage.person_id,
    type: "number"
  }),
  computed: {
    ...mapGetters(["transactions_app", "filter_app"]),
    target() {
      const value = this[this.type];
      if (!isNaN(value)) return Number(value);
      else return value;
    },
    options() {
      return {
        duration: 300,
        offset: 0,
        easing: "easeInOutCubic"
      };
    }

    // getTransactions() {
    //   var trans = [];
    //   this.transactions_app.map(item => {
    //     trans.push(item);
    //   });
    //   return trans;
    // }
  },

  methods: {
    ...mapActions(["setTitleApp", "setTransactionsApp"]),

    async handleClick(data) {
      this.$refs.modal.show(data);
    },
    handleLoadMov() {
      this.transactions = this.transactions_app;
      this.filter = this.filter_app;
      this.filter.perPage = this.filter.perPage + 5;
      this.setTransactionsApp(this.filter);
      console.log(this.filter_app);
      //this.$vuetify.goTo(this.target, this.options);
    },
    getSource(id) {
      //console.log(this.person_id);
      if (this.person_id.toString() === id.toString()) return true;
      else return false;
    }
  },
  updated() {
    console.log("update");
    window.scrollTo(0, document.body.scrollHeight);
  },
  async mounted() {
    this.filter.page = 1;
    this.setTitleApp("Movimientos");
  },
  beforeDestroy() {
    this.setTitleApp("Mark-One");
  }
};
</script>
<style>
.avatarCard {
  padding-right: 30px;
}

.v-stepper__wrapper {
  height: 100%;
}
</style>
