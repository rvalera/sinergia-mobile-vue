<template>
  <v-container fill-height>
    <v-layout row wrap align-content-center justify-center>
      <v-flex xs12 sm6 class="text-xs-center">
        <v-card elevation="4" class="pa-3">
          <v-icon x-large color="primary">photo_camera</v-icon>
          <p class="title my-5 text-xs-left ">
            Escanea el código QR para realizar pago
          </p>
          <v-btn round large block color="primary" @click="startCamera"
            >Escanear</v-btn
          >
        </v-card>
        <!-- <v-card elevantion="4" class="text-xs-left pa-3">
            <p class="subheading my-4"><b>Destino:</b> {{ decodeResult.target }}</p>
            <p class="subheading my-4"><b>Monto:</b> {{ decodeResult.amount }}</p>
            <p class="subheading my-4"><b>Concepto:</b> {{ decodeResult.concept }}</p>
          </v-card>
          <v-btn large block color="green" @click="startCamera">Pagar</v-btn> -->
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
    },
    startCamera() {
      if (typeof cordova === "undefined")
        this.descryptToken({
          text:
            "858dxpn7adELRBlcKYbK0zEw1/8Kckn6sdfPkyzLmSm9k1y4lylc4hKk6ClH3R96j6LLFdU6tKOa+gew8y8f3RF5AKNjt77vW115u2mMJjZe+qoXMrlPGR/R4vC98uQQOxJzhAqafywO2GyGEnZRyQGqWOnU7ofzCRBREB3Ttj+SFkGYtKxGJpvO3ijqa4tTnwLxS9eJPv0gjy9rK2ZbRg=="
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
            prompt: "Place a QR inside the scan area", // Android
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
