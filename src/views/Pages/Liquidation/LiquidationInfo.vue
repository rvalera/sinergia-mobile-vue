<template>
  <v-layout id="CardsInfo" row justify-center>
    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card elevation="0" class="text-xs-left pa-3">
        <v-toolbar dark color="primary">
          <v-btn icon dark @click.native="dialog = false">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>{{ $t("liquidation.detail") }}</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-container fill-height>
          <v-layout row wrap align-content-center justify-center>
            <v-flex xs12 sm6 class="text-xs-center">
              <v-card elevation="0" class="pa-3">
                <v-list>
                  <v-spacer></v-spacer>
                  <v-layout column v-if="liquidation">
                    <v-text-field
                      :label="$t('liquidation.initialBalance')"
                      v-model="liquidation.initial_balance"
                      filled
                      readonly
                    />
                    <v-text-field
                      :label="$t('liquidation.finalBalance')"
                      v-model="liquidation.final_balance"
                      filled
                      readonly
                    />
                    <v-text-field
                      :label="$t('liquidation.creationDate')"
                      v-model="liquidation.creation_date"
                      filled
                      readonly
                    />
                    <v-text-field
                      :label="$t('liquidation.liquidationType')"
                      v-model="liquidation.liquidation_type_str"
                      filled
                      readonly
                    />
                    <v-text-field
                      :label="$t('liquidation.debtAmount')"
                      v-model="liquidation.debt_amount"
                      filled
                      readonly
                    />
                  </v-layout>
                </v-list>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </v-dialog>
  </v-layout>
</template>
<script>
export default {
  data() {
    return {
      dialog: false,
      liquidation: null
    };
  },
  methods: {
    show(data) {
      this.liquidation = Object.assign({}, data);
      this.liquidation.initial_balance =
        this.liquidation.initial_balance.format() + " " + localStorage.coin;
      this.liquidation.final_balance =
        this.liquidation.final_balance.format() + " " + localStorage.coin;
      this.liquidation.debt_amount =
        this.liquidation.debt_amount.format() + " " + localStorage.coin;
      this.dialog = true;
    },
    hide() {
      if (this.dialog) this.dialog = false;
      else this.$router.back();
    }
  },
  mounted() {
    document.addEventListener("backbutton", this.hide, false);
  },
  beforeDestroy() {
    document.removeEventListener("backbutton", this.hide);
  }
};
</script>
