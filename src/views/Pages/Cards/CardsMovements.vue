<template>
  <v-layout row>
    <v-flex xs12 sm6 offset-sm3>
      <v-card elevation="4" class="text-xs-left pa-3">
        <v-toolbar color="#6a1b9a" dark>
          <v-toolbar-title>Movimientos</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>

        <v-list two-line>
          <template v-for="(item, index) in cards">
            <v-divider :inset="true" :key="index"></v-divider>
            <v-list-tile :key="item.id" avatar>
              <v-list-tile-avatar
                width="60px"
                class="avatarCard"
                tile
                @click="handleClick(item)"
              >
                <v-img
                  width="60px"
                  :src="item.tipe === 'D' ? avatarActive : avatarDisabled"
                ></v-img>
              </v-list-tile-avatar>

              <v-list-tile-content @click="handleClick(item)">
                <v-list-tile-title v-html="item.amount"></v-list-tile-title>
                <v-list-tile-sub-title
                  v-html="item.date"
                ></v-list-tile-sub-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-menu bottom left>
                  <template v-slot:activator="{ on }">
                    <v-btn icon v-on="on">
                      <v-icon color="grey lighten-1">mdi-dots-vertical</v-icon>
                    </v-btn>
                  </template>

                  <v-list>
                    <v-list-tile @click="handleClickOptions">
                      <v-list-tile-title>Movimientos</v-list-tile-title>
                    </v-list-tile>
                    <v-list-tile
                      v-if="item.status === 'A'"
                      @click="showPinChange(item)"
                    >
                      <v-list-tile-title>Cambio de PIN</v-list-tile-title>
                    </v-list-tile>
                    <v-list-tile
                      v-if="item.status === 'A'"
                      @click="showLockCard(item)"
                    >
                      <v-list-tile-title>Bloquear</v-list-tile-title>
                    </v-list-tile>
                    <v-list-tile
                      v-if="item.status === 'L'"
                      @click="showLockCard(item)"
                    >
                      <v-list-tile-title>Desbloquear</v-list-tile-title>
                    </v-list-tile>
                  </v-list>
                </v-menu>
              </v-list-tile-action>
            </v-list-tile>
          </template>
        </v-list>
      </v-card>

      <cards-info ref="modal"></cards-info>

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
import axios from "axios";
import CardsInfo from "./CardsInfo";
export default {
  components: { CardsInfo },
  data: () => ({
    avatarActive:
      "https://st3.depositphotos.com/14846838/18027/v/1600/depositphotos_180272254-stock-illustration-atm-withdrawal-line-vector-icon.jpg",
    avatarDisabled: "https://cdn.onlinewebfonts.com/svg/img_459174.png",
    cards: {},
    dialog: false,
    textDialog: {},
    items2: [
      { title: "Movimientos" },
      { title: "Cambio de Pin" },
      { title: "Bloqueo/Desbloqueo" }
    ]
  }),
  methods: {
    async handleClick(data) {
      console.log(data);
      this.$refs.modal.show(data);
    },
    handleClickOptions() {
      console.log("options");
      //this.$refs.modal.show(data);
    },
    showPinChange(data) {
      console.log(data);
      this.$router.push({
        name: "/CardsPinChange",
        params: {
          validation_number: data.validation_number
        }
      });
    },
    showLockCard(data) {
      this.textDialog.data = data;
      if (data.status === "A") {
        this.textDialog.title = "¿Seguro que Desea Bloquear la Tarjeta?";
        this.textDialog.body =
          "Esta opcion bloqueara la tarjeta:" + data.validation_number;
      } else {
        this.textDialog.title = "¿Seguro que Desea Desbloquear la Tarjeta?";
        this.textDialog.body =
          "Esta opcion desbloqueara la tarjeta:" + data.validation_number;
      }
      this.dialog = true;
    },
    handleLookCard() {
      let status;
      if (this.textDialog.data.status === "A") status = "L";
      else status = "A";
      //provisional code for look or unlook cards
      this.cards.map(item => {
        if (item.validation_number === this.textDialog.data.validation_number)
          item.status = status.toString();
      });
      //=======================================
      this.dialog = false;
    }
  },
  async mounted() {
    axios
      .get("http://www.mocky.io/v2/5d840100300000510022d7c3")
      .then(response => {
        this.cards = response.data.data.transactions;
        console.log(this.cards);
        // this.cards.map(card=>{
        //   card.avatar="1";
        // });
        // console.log(this.cards);
      });
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
