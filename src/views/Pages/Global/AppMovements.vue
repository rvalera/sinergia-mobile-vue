<template>
  <v-layout row>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-list two-line>
          <template v-for="(item, index) in transactions_app">
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
                  v-html="Number(item.amount).format()"
                ></v-list-tile-title>
                <v-list-tile-sub-title
                  v-html="item.execution_date"
                ></v-list-tile-sub-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <div class="text-xs-center">
                  <v-chip v-if="item.type === 'Pago'" color="green" outline>
                    {{ item.type }}
                  </v-chip>

                  <v-chip
                    v-if="item.type === 'Activación'"
                    color="secondary"
                    outline
                    >{{ item.type }}</v-chip
                  >

                  <v-chip v-if="item.type === 'Recarga'" color="red" outline>
                    {{ item.type }}
                  </v-chip>

                  <v-chip
                    v-if="item.type === 'Desconocida'"
                    outline
                    color="primary"
                    >{{ item.type }}</v-chip
                  >
                </div>
              </v-list-tile-action>
            </v-list-tile>
          </template>
        </v-list>
      </v-card>

      <mov-info ref="modal"></mov-info>

      <v-dialog v-model="dialog" persistent max-width="290">
        <v-card>
          <v-card-title class="headline">{{ textDialog.title }}</v-card-title>
          <v-card-text>{{ textDialog.body }}</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" flat @click.native="dialog = false"
              >Cancelar</v-btn
            >
            <v-btn color="primary" flat @click.native="handleLookCard"
              >Aceptar</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
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
    transactions: {},
    dialog: false,
    textDialog: {},
    autoNumericModel: 12345.67
  }),
  computed: {
    ...mapGetters(["transactions_app"])
  },
  methods: {
    ...mapActions(["setTitleApp"]),

    async handleClick(data) {
      console.log(data);
      this.$refs.modal.show(data);
    },
    handleClickOptions() {
      console.log("options");
      //this.$refs.modal.show(data);
    }
  },
  async mounted() {
    this.setTitleApp("Movimientos");
    console.log(this.transactions_app);
    this.transactions = await this.transactions_app;
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
