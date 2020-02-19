<template>
  <v-layout row>
    <v-flex xs12 sm6 offset-sm3>
      <v-card elevation="0">
        <v-list two-line>
          <template v-if="!transactions_app.length">
            <v-flex xs12 sm6 class="text-xs-center pa-3">
              <v-alert :value="true" dense type="info" outline>
                <strong>{{ $t("movements.withoutMov") }}</strong>
              </v-alert>
            </v-flex>
          </template>
          <template v-for="(item, index) in transactions_app">
            <v-divider :key="index + 'e'"></v-divider>
            <v-list-tile :key="item.id" avatar @click="handleClick(item)">
              <v-list-tile-avatar width="60px" class="avatarCard" tile>
                <v-img
                  :src="
                    getSource(item.source.id)
                      ? require('@/assets/images/arrow_out_red.png')
                      : require('@/assets/images/arrow_in_green.png')
                  "
                ></v-img>
              </v-list-tile-avatar>

              <v-list-tile-content>
                <v-list-tile-title
                  :class="
                    getSource(item.source.id) ? 'red--text' : 'green--text'
                  "
                  style="font-size:20px"
                  v-html="
                    '<b>' +
                      Number(item.amount).format() +
                      ' ' +
                      item.coin.diminutive +
                      '<b/>'
                  "
                ></v-list-tile-title>

                <v-list-tile-sub-title
                  v-html="item.execution_date"
                ></v-list-tile-sub-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <div class="text-xs-center">
                  <v-chip
                    :color="getSource(item.source.id) ? 'red' : 'green'"
                    outline
                    class="max-width-chip"
                    >{{ item.type }}</v-chip
                  >
                </div>
              </v-list-tile-action>
            </v-list-tile>
          </template>
        </v-list>
      </v-card>
      <!-- <v-flex v-if="activeAutoScroll" xs12 sm6 class="text-xs-center">
        <div v-if="setActiveProgres">
          <v-progress-circular indeterminate color="primary" class="bottom" />
        </div> -->
      <!-- <v-btn
          v-if="activeAutoScroll"
          block
          color="primary"
          text-color="white"
          @click="handleLoadMov"
        >
          <v-icon class="paddingBottom: 10px" color="white"
            >mdi-chevron-double-down</v-icon
          >
        </v-btn> -->
      <!-- </v-flex> -->
      <mov-info ref="modal"></mov-info>
      <template v-if="hasFilterFab">
        <movement-filter ref="filter" />
        <v-btn
          @click="handleShowFilter"
          dark
          fab
          bottom
          right
          fixed
          color="primary"
          class="fab-btn"
        >
          <v-icon large>mdi-filter</v-icon>
        </v-btn>
      </template>
    </v-flex>
  </v-layout>
</template>

<script>
import MovInfo from "./MovInfo";
import MovementFilter from "./MovementFilter";
import { mapActions, mapGetters } from "vuex";
import "../../../assets/utils";

export default {
  props: {
    activeAutoScroll: {
      type: Boolean,
      default: true
    },
    hasFilterFab: {
      type: Boolean,
      default: true
    }
  },
  components: { MovInfo, MovementFilter },
  data: () => ({
    transactions: [],
    filter: {},
    person_id: localStorage.person_id,
    type: "number",
    bottom: false,
    arrLength: 0,
    activeProgres: true //this used where lengt in array transaccitons is equals to latest
  }),
  computed: {
    ...mapGetters(["transactions_app", "filter_app"]),
    target() {
      const value = this[this.type];
      if (!isNaN(value)) return Number(value);
      else return value;
    },
    options() {
      return {
        duration: 300,
        offset: 0,
        easing: "easeInOutCubic"
      };
    },
    setactiveAutoScroll() {
      return this.activeAutoScroll;
    },
    setActiveProgres() {
      return this.activeProgres;
    }
  },
  watch: {
    bottom(bottom) {
      if (bottom && this.getValidateBottom()) {
        this.activeProgres = true;
        this.handleLoadMov();
      } else this.activeProgres = false;
    }
  },
  methods: {
    ...mapActions(["setTransactionsApp"]),
    bottomVisible() {
      const scrollY = window.scrollY;
      const visible = document.documentElement.clientHeight;
      const pageHeight = document.documentElement.scrollHeight;
      const bottomOfPage = visible + scrollY >= pageHeight;
      return bottomOfPage || pageHeight < visible;
    },
    async handleClick(data) {
      this.$refs.modal.show(data);
    },
    handleLoadMov() {
      this.arrLength = this.transactions_app.length;
      this.filter = this.filter_app;
      this.filter.perPage = this.filter.perPage + 5;
      this.setTransactionsApp(this.filter);
    },
    getValidateBottom() {
      if (this.arrLength != this.transactions_app.length) return true;
      else return false;
    },
    getSource(id) {
      if (this.person_id.toString() === id.toString()) return true;
      else return false;
    },
    handleShowFilter() {
      this.$refs.filter.show();
    }
  },
  async mounted() {
    console.log(this.activeAutoScroll);
    this.filter.page = 1;
    //event to listen scroll botton
    if (this.activeAutoScroll)
      window.addEventListener("scroll", () => {
        this.bottom = this.bottomVisible();
      });
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
