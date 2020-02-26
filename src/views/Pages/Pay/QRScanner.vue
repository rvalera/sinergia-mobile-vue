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

export default {
  methods: {
    descryptToken(resultQR) {
      try {
        var decipher = crypto.createDecipheriv(
            "aes-256-cbc",
            localStorage.app_key,
            localStorage.app_iv
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

        const { lastEmailLogged } = localStorage;
        const { target } = decodeResult;
        if (lastEmailLogged === target) {
          const params = { text: this.$t("pay.sameTarget") };
          window.getApp.$emit("SHOW_ERROR", params);
        } else
          this.$emit("next", {
            resultQR,
            decodeResult
          });
      } catch (error) {
        console.log(error);
        const params = { text: this.$t("pay.invalidQR") };
        window.getApp.$emit("SHOW_ERROR", params);
      }
    },
    startCamera() {
      if (typeof cordova === "undefined")
        this.descryptToken({
          //text: "lqhrQuu8EiIcDPH9BuiJzTE4ELgOfLk+kd0jgowLoi9XbyzH4mpxf+mE5rclbEV5t9chy89wDOZPRDhS1Dvv7X8p/3DwDH2eGSoWjS2dze1WIDWp+7+btrUCHYXyrYZ4eBAst3g3U2DAzSvXj4Q0oJZoRIiaKfl4WhTZdsEZsvVRdjPR/e6sls5qvaXjEHkNHxY2DfoTzE3viBXgO4/XsSc4KDT6tlQdd/9DThfQghwogmG/AC8pcUQiDT1cUyoV"
          text:
            "lqhrQuu8EiIcDPH9BuiJzTE4ELgOfLk+kd0jgowLoi9XbyzH4mpxf+mE5rclbEV5t9chy89wDOZPRDhS1Dvv7X8p/3DwDH2eGSoWjS2dze1WIDWp+7+btrUCHYXyrYZ4eBAst3g3U2DAzSvXj4Q0oJZoRIiaKfl4WhTZdsEZsvVKEPM5AJcT0HrAZdPOwBwIj5LOi773djXdJf1TpFVwvnONRrDSy9iDObog/F4sbUScV0vsAo/ZyKhyP01qXIVA"
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
