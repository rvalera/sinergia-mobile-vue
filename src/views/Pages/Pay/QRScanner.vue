<template>
  <v-container fill-height>
    <v-layout row wrap>
      <v-flex xs12 sm6 class="text-xs-center">
        <v-card elevation="0" class="pa-3">
          <v-icon x-large color="primary">photo_camera</v-icon>
          <p class="title my-5 text-xs-center ">
            {{ $t("pay.scanQR") }}
          </p>
          <div class="put-bottom px-3">
            <v-btn round large block color="primary" @click="startCamera">{{
              $t("pay.scan")
            }}</v-btn>
          </div>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import * as crypto from "crypto";
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["app_iv", "app_key"])
  },
  methods: {
    descryptToken(resultQR) {
      try {
        var decipher = crypto.createDecipheriv(
            "aes-256-cbc",
            this.app_key,
            this.app_iv
          ),
          buffer = Buffer.concat([
            decipher.update(Buffer.from(resultQR.text, "base64")),
            decipher.final()
          ]);
        var bufferString = buffer.toString();
        let decodeResult = JSON.parse(
          bufferString
            .split("")
            .reverse()
            .join("")
        );
        this.$emit("next", {
          resultQR,
          decodeResult
        });
      } catch (error) {
        const params = { text: this.$t("pay.invalidQR") };
        window.getApp.$emit("SHOW_ERROR", params);
      }
    },
    startCamera() {
      if (typeof cordova === "undefined")
        this.descryptToken({
          text:
            "RH3aqd8G6aoDzTl/tHJbGLG1yx1oaeA9Vfs/r6+DxDaIBqxMKlL7w+np+n3XiI4Cp78ziqfqtfdP83zFkwyFNBgG1eS/R1UdW9Lyusb6inF3ORTQGyffWnYrSEJyJ2osIKTTzX/D7qVGkNwWf1fit7rAobIhX/FhdNFjsIJDkAfxwxNOX3QCqA1EshowFeV+"
        });
      /* eslint-disable-next-line no-undef */ else
        cordova.plugins.barcodeScanner.scan(
          this.descryptToken, //receive result as params
          error => {
            alert("Scanning failed: " + error);
          },
          {
            preferFrontCamera: false, // iOS and Android
            showFlipCameraButton: true, // iOS and Android
            showTorchButton: true, // iOS and Android
            torchOn: false, // Android, launch with the torch switched on (if available)
            saveHistory: true, // Android, save scan history (default false)
            prompt: this.$t("pay.cameraPrompt"), // Android
            resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
            formats: "QR_CODE,PDF_417", // default: all but PDF_417 and RSS_EXPANDED
            orientation: "portrait", // Android only (portrait|landscape), default unset so it rotates with the device
            disableAnimations: true, // iOS
            disableSuccessBeep: false // iOS and Android
          }
        );
    }
  }
};
</script>
