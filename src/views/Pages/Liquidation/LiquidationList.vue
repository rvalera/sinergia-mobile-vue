<template>
  <v-layout row>
    <v-flex xs12 sm6 offset-sm3>
      <v-card elevation="0">
        <v-list two-line>
          <template v-if="fetched && !liquidations.length">
            <v-alert :value="true" color="warning" icon="priority_high" outline>
              <p class="title text-xs-center">
                {{ $t("liquidation.withoutLiquidations") }}
              </p>
            </v-alert>
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
                      | currency(item.coin.diminutive + " ", 2, {
                        thousandsSeparator: ".",
                        decimalSeparator: ","
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
      <v-flex v-if="moreLiquidations" xs12 sm6 class="text-xs-center">
        <v-btn fab color="primary" text-color="white" @click="getLiquidations">
          <v-icon class="paddingBottom: 10px" color="white"
            >mdi-chevron-double-down</v-icon
          >
        </v-btn>
      </v-flex>
    </v-flex>
    <liquidation-info ref="modal" />
  </v-layout>
</template>

<script>
import { getLiquidationsApi } from "@/api/modules";
import LiquidationInfo from "./LiquidationInfo";
export default {
  components: { LiquidationInfo },
  data: () => ({
    fetched: false,
    liquidations: [],
    filter: {
      person_id: localStorage.person_id
    },
    page: 0,
    perPage: 5,
    total: 0
  }),
  computed: {
    moreLiquidations() {
      return this.liquidations.length < this.total;
    }
  },
  methods: {
    async handleClick(data) {
      this.$refs.modal.show(data);
    },
    async getLiquidations() {
      const { filter, page, perPage } = this;
      const start = 0;
      const end = (page + 1) * perPage;
      const params = {
        filter,
        range: JSON.stringify([start, end])
      };
      var serviceResponse = await getLiquidationsApi(params);
      this.fetched = true;
      if (serviceResponse.ok) {
        this.liquidations = serviceResponse.data;
        this.page++;
        this.total = serviceResponse.total;
      } else {
        const params = { text: serviceResponse.message.text };
        window.getApp.$emit("SHOW_ERROR", params);
      }
    }
  },
  updated() {
    window.scrollTo(0, document.body.scrollHeight);
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
