<template>
  <v-layout row>
    <v-flex xs12 sm6 offset-sm3>
      <v-card elevation="4" class="text-xs-left pa-3">
        <v-toolbar color="#6a1b9a" dark>
          <v-toolbar-title>Tarjetas</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>

        <v-list two-line>
          <template v-for="(item, index) in cards">
            <v-divider :inset="true" :key="index"></v-divider>
            <v-list-tile :key="item.validation_number" avatar>
              <v-list-tile-avatar
                width="60px"
                class="avatarCard"
                tile
                @click="handleClick(item)"
              >
                <v-img
                  width="60px"
                  :src="item.status === 'A' ? avatarActive : avatarDisabled"
                ></v-img>
              </v-list-tile-avatar>

              <v-list-tile-content @click="handleClick(item)">
                <v-list-tile-title
                  v-html="item.validation_number"
                ></v-list-tile-title>
                <v-list-tile-sub-title
                  v-html="item.activation_date"
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
                      @click="handleClickOptions"
                    >
                      <v-list-tile-title>Cambio de PIN</v-list-tile-title>
                    </v-list-tile>
                    <v-list-tile
                      v-if="item.status === 'A'"
                      @click="handleClickOptions"
                    >
                      <v-list-tile-title>Bloquear</v-list-tile-title>
                    </v-list-tile>
                    <v-list-tile
                      v-if="item.status === 'L'"
                      @click="handleClickOptions"
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
      "https://www.trzcacak.rs/myfile/full/367-3670440_credit-card.png",
    avatarDisabled:
      "https://www.trzcacak.rs/myfile/full/149-1497778_card-back-png-transparent-background-credit-card-icon.png",
    cards: {},

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
    }
  },
  async mounted() {
    axios
      .get("http://www.mocky.io/v2/5d8248f9300000b61d699cbc")
      .then(response => {
        this.cards = response.data.data.cards;
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
