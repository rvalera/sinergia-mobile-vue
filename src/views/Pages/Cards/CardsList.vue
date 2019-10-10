<template>
  <v-layout row>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <!-- <v-toolbar color="#6a1b9a" dark>
          <v-toolbar-title>Tarjetas</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>-->

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
              <v-list-tile-avatar tile>
                <v-chip v-if="item.status === 'A'" color="green" outline
                  >Activa</v-chip
                >
                <v-chip v-if="item.status != 'A'" color="red" outline
                  >Bloqueada</v-chip
                >
              </v-list-tile-avatar>
              <v-list-tile-action>
                <v-menu bottom left>
                  <template v-slot:activator="{ on }">
                    <v-btn icon v-on="on">
                      <v-icon color="grey lighten-1">mdi-dots-vertical</v-icon>
                    </v-btn>
                  </template>

                  <v-list>
                    <v-list-tile @click="showMovementsByCard(item)">
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
import { getAppCardsData, blockCard, unblockCard } from "@/api/modules";
import CardsInfo from "./CardsInfo";
import { mapActions, mapGetters } from "vuex";
export default {
  components: { CardsInfo },
  data: () => ({
    avatarActive:
      "https://www.trzcacak.rs/myfile/full/367-3670440_credit-card.png",
    avatarDisabled:
      "https://www.trzcacak.rs/myfile/full/149-1497778_card-back-png-transparent-background-credit-card-icon.png",
    cards: {},
    dialog: false,
    textDialog: {},
    items2: [
      { title: "Movimientos" },
      { title: "Cambio de Pin" },
      { title: "Bloqueo/Desbloqueo" }
    ]
  }),
  computed: {
    ...mapGetters(["user"])
  },
  methods: {
    ...mapActions(["setTitleApp", "setTransactionsApp"]),
    async handleClick(data) {
      this.$refs.modal.show(data);
    },
    handleClickOptions() {
      //this.$refs.modal.show(data);
    },
    async showMovementsByCard(data) {
      console.log(data);
      let filter = {
        page: 1,
        perPage: 5,
        id: data.id
      };

      this.setTransactionsApp(filter);

      this.$router.push({
        name: "/AppMovements",
        params: {
          validation_number: data.validation_number
        }
      });
    },
    showPinChange(data) {
      this.$router.push({
        name: "/CardsPinStepper",
        params: {
          card: data
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
    async handleLookCard() {
      let serviceResponse;
      if (this.textDialog.data.status === "A")
        serviceResponse = await blockCard(this.textDialog.data.id);
      else serviceResponse = await unblockCard(this.textDialog.data.id);

      if (serviceResponse.ok) {
        const params = { text: serviceResponse.message.text };
        window.getApp.$emit("SHOW_MESSAGE", params);
      } else {
        const params = { text: serviceResponse.message.text };
        window.getApp.$emit("SHOW_ERROR", params);
      }
      this.dialog = false;
      await this.getCards();
      //provisional code for look or unlook cards
      // this.cards.map(item => {
      //   if (item.validation_number === this.textDialog.data.validation_number)
      //     item.status = status.toString();
      // });
      //=======================================
    },
    async getCards() {
      const { person_id } = localStorage;
      let data = await getAppCardsData(person_id);
      this.cards = data.data.cards;
    }
  },
  async mounted() {
    this.setTitleApp("Tarjetas");
    await this.getCards();
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
