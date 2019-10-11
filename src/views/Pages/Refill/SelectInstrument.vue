<template>
  <v-layout id="CardsInfo" row justify-center>
    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card elevation="4" class="text-xs-left pa-3">
        <v-toolbar dark color="#6a1b9a">
          <v-btn icon dark @click.native="dialog = false">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>Tarjetas afiliadas</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-container fill-height>
          <v-layout row wrap align-content-center justify-center>
            <v-flex xs12 sm6 class="text-xs-center">
              <v-card elevation="4" class="pa-3">
                <v-list two-line>
                  <template v-for="(item, index) in paymentInstruments">
                    <v-divider :inset="true" :key="index + 'e'"></v-divider>
                    <v-list-tile
                      :key="item.id"
                      avatar
                      @click="handleSelectInstrument(index)"
                    >
                      <v-list-tile-avatar width="60px" class="avatarCard" tile>
                        <v-img width="60px" :src="paymentInsturmentImg"></v-img>
                      </v-list-tile-avatar>

                      <v-list-tile-content>
                        <v-list-tile-title
                          v-html="item.payment_medium.name"
                        ></v-list-tile-title>
                        <v-list-tile-sub-title
                          v-html="'**** **** **** ' + item.last4"
                        ></v-list-tile-sub-title>
                      </v-list-tile-content>
                    </v-list-tile>
                  </template>
                </v-list>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
        <v-divider></v-divider>
      </v-card>
    </v-dialog>
  </v-layout>
</template>
<script>
import "../../../assets/utils";
export default {
  data() {
    return {
      dialog: false,
      paymentInstruments: [],
      paymentInsturmentImg: "static/paymentInstrument.png"
    };
  },
  methods: {
    show(paymentInstruments) {
      this.paymentInstruments = paymentInstruments;
      this.dialog = true;
    },
    hide() {
      this.dialog = false;
    },
    handleSelectInstrument(index) {
      const paymentInstrument = this.paymentInstruments[index];
      this.$emit("onSelectInstrument", paymentInstrument);
      this.hide();
    }
  }
};
</script>
