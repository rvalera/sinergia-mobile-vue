<template>
  <v-layout row>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-list two-line>
          <template v-if="fetched && !liquidations.length">
            <v-flex xs12 sm6 class="text-xs-center pa-4">
              <v-alert :value="true" dense type="info" outline>
                <strong> {{ $t("liquidation.withoutLiquidations") }}</strong>
              </v-alert>
            </v-flex>
          </template>
          <template
            v-else-if="fetched && liquidations.length"
            v-for="(item, index) in liquidations"
          >
            <v-divider :key="index + 'e'"></v-divider>
            <v-list-tile :key="index + 'z'" avatar @click="handleClick(item)">
              <v-list-tile-content>
                <v-list-tile-title style="font-size:20px">
                  {{
                    item.final_balance
                      | currency(coin, 2, {
                        thousandsSeparator: ".",
                        decimalSeparator: ",",
                        symbolOnLeft: false,
                        spaceBetweenAmountAndSymbol: true
                      })
                  }}
                </v-list-tile-title>
                <v-list-tile-sub-title
                  v-html="item.creation_date"
                ></v-list-tile-sub-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <div class="text-xs-center">
                  <v-chip outline class="max-width-chip">
                    {{ item.liquidation_type_str }}
                  </v-chip>
                </div>
              </v-list-tile-action>
            </v-list-tile>
          </template>
        </v-list>
      </v-card>
    </v-flex>
    <liquidation-info ref="modal" />
  </v-layout>
</template>

<script>
import { getLiquidationsApi } from "@/api/modules";
import LiquidationInfo from "./LiquidationInfo";
const PER_PAGE = 10;
export default {
  components: { LiquidationInfo },
  data: () => ({
    coin: localStorage.coin,
    fetched: false,
    liquidations: [],
    totalLiquidations: 0,
    page: 0
  }),
  watch: {
    bottom(bottom) {
      if (bottom && this.getValidateBottom()) {
        this.getLiquidations();
      }
    }
  },
  methods: {
    async handleClick(data) {
      this.$refs.modal.show(data);
    },
    async getLiquidations() {
      const start = this.page * PER_PAGE;
      const end = start + PER_PAGE - 1;
      const params = {
        range: JSON.stringify([start, end])
      };
      var serviceResponse = await getLiquidationsApi(params);
      this.fetched = true;
      if (serviceResponse.ok) {
        this.liquidations = [...this.liquidations, ...serviceResponse.data];
        this.page++;
        this.totalLiquidations = serviceResponse.total;
      } else {
        const params = { text: serviceResponse.message.text };
        window.getApp.$emit("SHOW_ERROR", params);
      }
    },
    bottomVisible() {
      const scrollY = window.scrollY;
      const visible = document.documentElement.clientHeight;
      const pageHeight = document.documentElement.scrollHeight;
      const bottomOfPage = visible + scrollY >= pageHeight;
      return bottomOfPage || pageHeight < visible;
    },
    getValidateBottom() {
      return this.liquidations.length != this.totalLiquidations;
    }
  },
  mounted() {
    this.getLiquidations();
  }
};
</script>
<style>
.avatarCard {
  padding-right: 20px;
}

.v-stepper__wrapper {
  height: 100%;
}

.max-width-chip .v-chip__content {
  line-height: 32px;
  display: inline-block !important;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  position: relative;
  width: 100px;
  font-size: 85%;
}
</style>
