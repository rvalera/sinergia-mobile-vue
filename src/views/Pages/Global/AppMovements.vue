<template>
  <v-layout row>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-list two-line>
          <template v-for="(item, index) in getTransactions">
            <v-divider :inset="true" :key="index + 'e'"></v-divider>
            <v-list-tile :key="item.id" avatar>
              <v-list-tile-avatar
                width="60px"
                class="avatarCard"
                tile
                @click="handleClick(item)"
              >
                <v-img
                  :src="item.type === 'Pago' ? avatarRetire : avatarDeposit"
                ></v-img>
              </v-list-tile-avatar>

              <v-list-tile-content @click="handleClick(item)">
                <v-list-tile-title
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
                  <v-chip v-if="item.type === 'Pago'" color="red" outline>{{
                    item.type
                  }}</v-chip>

                  <v-chip
                    v-if="item.type === 'Activación'"
                    color="green"
                    outline
                    >{{ item.type }}</v-chip
                  >

                  <v-chip
                    v-if="item.type === 'Recarga'"
                    color="green"
                    outline
                    >{{ item.type }}</v-chip
                  >

                  <v-chip
                    v-if="item.type === 'Desconocida'"
                    outline
                    color="red"
                    >{{ item.type }}</v-chip
                  >
                </div>
              </v-list-tile-action>
            </v-list-tile>
          </template>
        </v-list>
      </v-card>
      <v-flex xs12 sm6 class="text-xs-center">
        <v-chip
          class="ma-2"
          color="primary"
          text-color="white"
          outlined
          @click="handleLoadMov"
        >
          <v-avatar left>
            <v-icon color="white">mdi-chevron-double-down</v-icon>
          </v-avatar>
          Ver Mas
        </v-chip>
      </v-flex>
      <mov-info ref="modal"></mov-info>
    </v-flex>
  </v-layout>
</template>

<script>
//import { getAppCardsData } from "@/api/modules";
//import axios from "axios";
import MovInfo from "./MovInfo";
import { mapActions, mapGetters } from "vuex";
import "../../../assets/utils";
export default {
  components: { MovInfo },
  data: () => ({
    avatarRetire:
      "https://st3.depositphotos.com/14846838/18027/v/1600/depositphotos_180272254-stock-illustration-atm-withdrawal-line-vector-icon.jpg",
    avatarDeposit: "https://cdn.onlinewebfonts.com/svg/img_459174.png",
    transactions: [],
    filter: {}
  }),
  computed: {
    ...mapGetters(["transactions_app", "filter_app"])
  },
  watch: {
    getTransactions: function() {
      if (this.filter.page === 1) this.transactions = this.transactions_app;
      else if (
        this.transactions_app != this.transactions &&
        this.transactions_app !== []
      ) {
        console.log(this.transactions_app);
        this.transactions_app.map(item => {
          this.transactions.push(item);
        });
      }

      return this.transactions;
    }
  },
  methods: {
    ...mapActions(["setTitleApp", "setTransactionsApp"]),

    async handleClick(data) {
      //console.log(data);
      this.$refs.modal.show(data);
    },
    handleLoadMov() {
      this.filter = this.filter_app;
      this.filter.page = this.filter.page + 1;
      console.log(this.filter.page);
      this.setTransactionsApp(this.filter);

      console.log(this.filter_app);
    }
  },
  async mounted() {
    this.filter.page = 1;
    this.setTitleApp("Movimientos");
    console.log(this.transactions_app);
    // this.transactions = await this.transactions_app;
    // axios
    //   .get("http://www.mocky.io/v2/5d840100300000510022d7c3")
    //   .then(response => {
    //     this.transactions = response.data.data.transactions;
    //     console.log(this.transactions);
    //     // this.cards.map(card=>{
    //     //   card.avatar="1";
    //     // });
    //     // console.log(this.cards);
    //   });
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
