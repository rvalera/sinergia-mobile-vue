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
          <v-toolbar-title>Detalle de transacción</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-container fill-height>
          <v-flex xs12 sm6 class="text-xs-center">
            <v-card elevation="0" class="text-xs-left px-3">
              <p class="display-1 mb-0 font-weight-bold text-xs-center">
                {{
                  mov.amount
                    | currency(mov.coin ? " " + mov.coin.diminutive : " ", 2, {
                      thousandsSeparator: ".",
                      decimalSeparator: ",",
                      symbolOnLeft: false
                    })
                }}
              </p>
              <p class="body-1 mb-3 text-xs-center">
                {{ mov.execution_date }}
              </p>
              <v-text-field
                :label="$t('pay.origin')"
                v-model="mov.source_description"
                filled
                readonly
              />
              <v-text-field
                :label="$t('pay.destination')"
                v-model="mov.target_description"
                filled
                readonly
              />
              <v-text-field
                :label="$t('pay.concept')"
                v-model="mov.observation"
                filled
                readonly
              />
              <v-text-field
                :label="$t('pay.reference')"
                v-model="mov.ref_number"
                filled
                readonly
              />
            </v-card>
            <v-layout justify-space-around>
              <v-flex xs5>
                <v-btn large round block color="primary">
                  <v-icon left>share</v-icon>
                  {{ $t("pay.sharing") }}
                </v-btn>
              </v-flex>
              <v-flex xs5> </v-flex>
            </v-layout>
          </v-flex>
        </v-container>
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
      amount: 0,
      mov: {
        id: 0,
        execution_date: "",
        target_description: "",
        source_description: "",
        source: {
          id: 0,
          fullname: "",
          phone_number: ""
        },
        target: {
          id: 0,
          fullname: "",
          phone_number: ""
        },
        amount: 0,
        type: ""
      }
    };
  },
  methods: {
    show(data) {
      this.mov = data;
      this.amount = Number(this.mov.amount).format();
      this.dialog = true;
    },
    hide() {
      this.dialog = false;
    },
    onBackKeyDown() {
      this.dialog = false;
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
