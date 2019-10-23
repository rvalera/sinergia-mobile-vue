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
          <v-toolbar-title>Detalle de la liquidación</v-toolbar-title>
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
                      label="Balance inicial"
                      v-model="liquidation.initial_balance"
                      filled
                      readonly
                    />
                    <v-text-field
                      label="Balance final"
                      v-model="liquidation.final_balance"
                      filled
                      readonly
                    />
                    <v-text-field
                      label="Fecha de creación"
                      v-model="liquidation.creation_date"
                      filled
                      readonly
                    />
                    <v-text-field
                      label="Tipo de liquidación"
                      v-model="liquidation.liquidation_type_str"
                      filled
                      readonly
                    />
                    <v-text-field
                      label="Monto adeudado"
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
      this.liquidation = data;
      this.dialog = true;
    },
    hide() {
      this.dialog = false;
    }
  }
};
</script>
