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
          text:
            "ziSfokQ8b50Vs+rzfBb5kwUqM/svQva/LtQQ0p4kEKlEBeHY28UHr73+KKcWCsc4/trmsPJ56DFu9ad00FTtN8fRNc6iCWV0vfAgF5Ada8/BdM0h+wX0Cxl8l+711J1w1YUiyf/cmicrw4Iap+TZWh7VDX8tx179oHh/36lWTr+01jbujOBPNOKDkruKh07B"
          //text: "08mSPIBxAaMFKQscDjkUjwYK0tiVnksuS8bT01U1KAWLncRnLzL7P+ms0kBQkrn3qebKXgKUPgM35j3s+emKsCjcATL1KjGhn9MICGGMN53a7VWsCgTapvwldoQWNe+Zh89hvNYPJNjv8js75IiFKA1V5frlZTGhIqzE/xEUVpU="
          //text: "858dxpn7adELRBlcKYbK0zEw1/8Kckn6sdfPkyzLmSm9k1y4lylc4hKk6ClH3R96j6LLFdU6tKOa+gew8y8f3RF5AKNjt77vW115u2mMJjZe+qoXMrlPGR/R4vC98uQQOxJzhAqafywO2GyGEnZRyQGqWOnU7ofzCRBREB3Ttj+SFkGYtKxGJpvO3ijqa4tTnwLxS9eJPv0gjy9rK2ZbRg=="
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
