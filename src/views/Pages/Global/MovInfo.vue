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
        <v-container fill-height :id="'sharingMov-' + mov.id">
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
              <p class="body-1 mb-3 text-xs-center">{{ mov.execution_date }}</p>
              <v-text-field
                :label="$t('pay.origin') + '          '"
                v-model="mov.source_description"
                box
                readonly
              />
              <v-text-field
                :label="$t('pay.destination') + '          '"
                v-model="mov.target_description"
                box
                readonly
              />
              <v-text-field
                :label="$t('pay.concept') + '          '"
                v-model="mov.observation"
                box
                readonly
              />
              <v-text-field
                :label="$t('pay.reference') + '          '"
                v-model="mov.ref_number"
                box
                readonly
              />
            </v-card>
            <v-layout justify-center>
              <img width="100%" id="logo" :src="LOGO" class="hide" />
            </v-layout>
            <v-layout justify-space-around>
              <v-flex xs5 data-html2canvas-ignore>
                <v-btn
                  large
                  round
                  block
                  color="primary"
                  @click.prevent="handleSharing"
                >
                  <v-icon left>share</v-icon>
                  {{ $t("pay.sharing") }}
                </v-btn>
              </v-flex>
              <v-flex xs5></v-flex>
            </v-layout>
          </v-flex>
        </v-container>
      </v-card>
    </v-dialog>
  </v-layout>
</template>
<script>
import "../../../assets/utils";
import { mapActions } from "vuex";
import html2canvas from "html2canvas";
import { LOGO } from "@/config/constants";
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
  watch: {
    dialog(value) {
      this.handleDialog(value);
      if (value) document.addEventListener("backbutton", this.hide, false);
      else document.removeEventListener("backbutton", this.hide);
    }
  },
  created() {
    this.LOGO = LOGO;
  },
  methods: {
    ...mapActions(["handleDialog"]),
    show(data) {
      this.mov = data;
      this.amount = Number(this.mov.amount).format();
      this.dialog = true;
    },
    hide() {
      this.dialog = false;
    },
    async handleSharing() {
      try {
        window.getApp.$emit("LOADING", true);
        const canvas = await html2canvas(
          document.querySelector("#sharingMov-" + this.mov.id),
          {
            logging: false,
            scrollY: 0,
            height:
              document.querySelector("#sharingMov-" + this.mov.id)
                .clientHeight + 30,
            onclone: document => {
              document.getElementById("logo").classList.remove("hide");
            }
          }
        );
        // this is the complete list of currently supported params you can pass to the plugin (all optional)
        const options = {
          message: "Compartido desde DOCFabric", // not supported on some apps (Facebook, Instagram)
          files: [canvas.toDataURL("image/png")], // an array of filenames either locally or remotely
          chooserTitle: this.$t("common.selectAnApp") // Android only, you can override the default share sheet title
        };
        const onSuccess = function(result) {
          console.log("Share completed? " + result.completed); // On Android apps mostly return false even while it's true
          console.log("Shared to app: " + result.app); // On Android result.app since plugin version 5.4.0 this is no longer empty. On iOS it's empty when sharing is cancelled (result.completed=false)
        };

        const onError = function(msg) {
          alert("Sharing failed with message: " + msg);
        };
        window.plugins.socialsharing.shareWithOptions(
          options,
          onSuccess,
          onError
        );
      } catch (error) {
        alert(error.message);
      }
      window.getApp.$emit("LOADING", false);
    }
  },
  beforeDestroy() {
    document.removeEventListener("backbutton", this.hide);
  }
};
</script>
