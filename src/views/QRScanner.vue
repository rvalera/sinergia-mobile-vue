<template>
  <div>
    <v-container>
      <v-layout row wrap v-if="bottomNav == 'decode'">
        <v-flex xs12 sm8 md12>
          <section-header v-text="'QR decode'"></section-header>
          <v-card>
            <v-btn large block color="primary" @click="startCamera"
              >Scan QR</v-btn
            >
            <p><b>Text:</b> {{ resultQR.text }}</p>
            <p><b>Format:</b> {{ resultQR.format }}</p>
            <p><b>Cancelled:</b> {{ resultQR.cancelled }}</p>
          </v-card>
        </v-flex>
        <v-divider></v-divider>
        <br />
        <v-flex xs12 sm8 md12>
          <v-card>
            <v-btn
              large
              block
              color="primary"
              :disabled="!Object.keys(resultQR).length"
              @click="descryptToken"
            >
              Decode with crypto
            </v-btn>
            <p><b>target:</b> {{ decodeResult.target }}</p>
            <p><b>amount:</b> {{ decodeResult.amount }}</p>
            <p><b>deviceid:</b> {{ decodeResult.deviceid }}</p>
            <p><b>datetime:</b> {{ decodeResult.datetime }}</p>
          </v-card>
        </v-flex>
      </v-layout>
      <v-layout row wrap v-if="bottomNav == 'encode'">
        <v-flex xs12 sm8 md12>
          <section-header v-text="'QR encode'"></section-header>
          JSON to encode
          <v-card>
            <p><b>target:</b> {{ decodeResult.target }}</p>
            <p><b>amount:</b> {{ decodeResult.amount }}</p>
            <p><b>deviceid:</b> {{ decodeResult.deviceid }}</p>
            <p><b>datetime:</b> {{ decodeResult.datetime }}</p>
          </v-card>
        </v-flex>
        <v-divider></v-divider>
        <br />
        <v-flex xs12 sm8 md12>
          <v-card>
            <v-btn
              large
              block
              color="primary"
              :disabled="!Object.keys(decodeResult).length"
              @click="encryptToken"
            >
              Encode with crypto
            </v-btn>
            <p><b>Text:</b> {{ encodeCrypto }}</p>
          </v-card>
        </v-flex>
        <v-divider></v-divider>
        <br />
        <v-flex xs12 sm8 md12>
          <v-card>
            <v-btn
              large
              block
              color="primary"
              :disabled="!encodeCrypto"
              @click="encodeQR"
            >
              Encode to QR
            </v-btn>
            <v-img :src="QR" />
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    <v-bottom-nav :active.sync="bottomNav" :value="true" fixed>
      <v-btn color="blue" flat value="decode">
        <span>QR Decode</span>
        <v-icon>phone_android</v-icon>
      </v-btn>

      <v-btn color="blue" flat value="encode">
        <span>QR Encode</span>
        <v-icon>vpn_key</v-icon>
      </v-btn>
    </v-bottom-nav>
  </div>
</template>
<script>
import * as crypto from "crypto";
import QRCode from "qrcode";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      bottomNav: "decode",
      resultQR: {},
      decodeResult: {},
      encodeCrypto: null,
      QR: ""
    };
  },
  computed: {
    ...mapGetters(["app_iv", "app_key"])
  },
  methods: {
    descryptToken() {
      var decipher = crypto.createDecipheriv(
          "aes-256-cbc",
          this.app_key,
          this.app_iv
        ),
        buffer = Buffer.concat([
          decipher.update(Buffer.from(this.resultQR.text, "base64")),
          decipher.final()
        ]);
      var bufferString = buffer.toString();
      this.decodeResult = JSON.parse(
        bufferString
          .split("")
          .reverse()
          .join("")
      );
      console.log(this.decodeResult);
    },
    encryptToken() {
      var jsonString = JSON.stringify(this.decodeResult)
        .split("")
        .reverse()
        .join("");
      var encipher = crypto.createCipheriv(
          "aes-256-cbc",
          this.app_key,
          this.app_iv
        ),
        buffer = Buffer.concat([encipher.update(jsonString), encipher.final()]);
      this.encodeCrypto = buffer.toString("base64");
    },
    encodeQR() {
      QRCode.toDataURL(this.encodeCrypto)
        .then(url => {
          this.QR = url;
          console.log(url);
        })
        .catch(err => {
          console.error(err);
        });
    },
    startCamera() {
      if (typeof cordova === "undefined")
        this.resultQR = {
          text:
            "A5lIYhEHUXcSoMWgGUPTh2ImbkeuJyCXAENfwAHkRzQlnprVVRvNrLfWn0rTg5eLosPeZpicDw8jKmub7Wopjg4Pt16+fiPTRuPCUN16WZT8Obo2ftXTWiwSDKYFV41k"
        };
      /* eslint-disable-next-line no-undef */ else
        cordova.plugins.barcodeScanner.scan(
          result => {
            this.resultQR = result;
          },
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
