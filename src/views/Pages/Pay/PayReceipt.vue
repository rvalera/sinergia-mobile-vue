<template>
  <v-container fill-height py-1 id="sharingReceipt">
    <v-layout row wrap justify-center>
      <v-flex xs12 sm6 class="text-xs-center">
        <v-card elevation="0" class="text-xs-left px-3">
          <div class="text-xs-center">
            <p
              class="title mb-3 green--text font-weight-bold d-flex headerSuccess"
            >
              <v-icon x-large color="green">check_circle_outline</v-icon>
            </p>
          </div>
          <p class="display-1 mb-0 font-weight-bold text-xs-center">
            {{
              receipt.amount
                | currency(receipt.coin ? receipt.coin.diminutive : coin, 2, {
                  thousandsSeparator: ".",
                  decimalSeparator: ",",
                  symbolOnLeft: false,
                  spaceBetweenAmountAndSymbol: true
                })
            }}
          </p>
          <p class="body-1 mb-3 text-xs-center">
            {{ receipt.execution_date }}
            <br />
            {{ receipt.ref_number }}
          </p>
          <v-text-field
            :label="$t('pay.origin') + '          '"
            v-model="receipt.source_description"
            box
            readonly
          />
          <v-text-field
            :label="$t('pay.destination') + '          '"
            v-model="receipt.target_description"
            box
            readonly
          />
          <v-text-field
            :label="$t('pay.concept') + '          '"
            v-model="receipt.observation"
            box
            readonly
          />
        </v-card>
        <v-layout justify-center>
          <img width="100%" id="logo" :src="LOGO" class="hide" />
        </v-layout>
        <v-layout
          justify-space-around
          class="put-bottom"
          data-html2canvas-ignore
        >
          <v-flex xs5>
            <v-btn large round block color="primary" @click="handleSharing">
              <v-icon left>share</v-icon>
              {{ $t("pay.sharing") }}
            </v-btn>
          </v-flex>
          <v-flex xs5>
            <v-btn large round block color="primary" @click="$emit('finish')">{{
              $t("common.finish")
            }}</v-btn>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import html2canvas from "html2canvas";
import { LOGO } from "@/config/constants";
export default {
  props: {
    receipt: Object
  },
  data() {
    return {
      coin: localStorage.coin
    };
  },
  created() {
    this.LOGO = LOGO;
  },
  methods: {
    async handleSharing() {
      try {
        window.getApp.$emit("LOADING", true);
        const canvas = await html2canvas(
          document.querySelector("#sharingReceipt"),
          {
            logging: false,
            scrollY: 0,
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
  }
};
</script>

<style>
.headerSuccess {
  flex-direction: column;
}
</style>
