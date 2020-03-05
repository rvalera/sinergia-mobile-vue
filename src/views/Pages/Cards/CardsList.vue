<template>
  <v-layout row>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <!-- <v-toolbar color="#333333" dark>
          <v-toolbar-title>Tarjetas</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>-->

        <v-list two-line>
          <template v-if="fetched && !cards.length">
            <v-flex xs12 sm6 class="text-xs-center pa-4">
              <v-alert :value="true" dense type="info" outline>
                <strong> {{ $t("paymentInstrument.withoutCards") }}</strong>
              </v-alert>
            </v-flex>
          </template>
          <template
            v-else-if="fetched && cards.length"
            v-for="(item, index) in cards"
          >
            <v-divider :inset="true" :key="index"></v-divider>
            <v-list-tile :key="item.validation_number" avatar>
              <v-list-tile-avatar
                class="avatarCard"
                tile
                @click="handleClick(item)"
              >
                <v-icon :disabled="item.status !== 'A'" x-large
                  >far fa-credit-card</v-icon
                >
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
                <v-chip
                  @click="handleClick(item)"
                  v-if="item.status === 'A'"
                  color="green"
                  outline
                  >{{ $t("cards.active") }}</v-chip
                >
                <v-chip
                  @click="handleClick(item)"
                  v-if="item.status != 'A'"
                  color="red"
                  outline
                  >{{ $t("cards.block") }}</v-chip
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
                      <v-list-tile-title>{{
                        $t("cards.movements")
                      }}</v-list-tile-title>
                    </v-list-tile>
                    <v-list-tile
                      v-if="item.status === 'A'"
                      @click="showPinChange(item)"
                    >
                      <v-list-tile-title>{{
                        $t("cards.pinChange")
                      }}</v-list-tile-title>
                    </v-list-tile>
                    <v-list-tile
                      v-if="item.status === 'A'"
                      @click="showLockCard(item)"
                    >
                      <v-list-tile-title>{{
                        $t("cards.blockA")
                      }}</v-list-tile-title>
                    </v-list-tile>
                    <v-list-tile
                      v-if="item.status === 'L'"
                      @click="showLockCard(item)"
                    >
                      <v-list-tile-title>{{
                        $t("cards.unblock")
                      }}</v-list-tile-title>
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
            <v-btn color="primary" round @click.native="dialog = false">{{
              $t("common.cancel")
            }}</v-btn>
            <v-btn color="primary" round @click.native="handleLookCard">{{
              $t("common.accept")
            }}</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-flex>
  </v-layout>
</template>

<script>
import { getCardsApi, lockCardApi, unlockCardApi } from "@/api/modules";
import CardsInfo from "./CardsInfo";
import { mapActions, mapGetters } from "vuex";
export default {
  components: { CardsInfo },
  data: () => ({
    cards: {},
    dialog: false,
    textDialog: {},
    items2: [
      { title: "Movimientos" },
      { title: "Cambio de Pin" },
      { title: "Bloqueo/Desbloqueo" }
    ],
    fetched: false
  }),
  computed: {
    ...mapGetters(["user"])
  },
  methods: {
    ...mapActions(["setTransactionsApp"]),
    async handleClick(data) {
      this.$refs.modal.show(data);
    },
    handleClickOptions() {
      //this.$refs.modal.show(data);
    },
    async showMovementsByCard(data) {
      let filter = {
        page: 1,
        perPage: 10,
        id: data.id,
        field: "blockchain_id"
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
        serviceResponse = await lockCardApi(this.textDialog.data.id);
      else serviceResponse = await unlockCardApi(this.textDialog.data.id);

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
      let serviceResponse = await getCardsApi();
      if (serviceResponse.ok) {
        this.cards = serviceResponse.data;
        this.fetched = true;
      } else {
        const params = { text: serviceResponse.message.text };
        window.getApp.$emit("SHOW_ERROR", params);
      }
    }
  },
  async mounted() {
    await this.getCards();
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
