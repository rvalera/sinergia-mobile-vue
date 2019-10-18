<template>
  <v-layout row>
    <v-flex xs12 sm6 offset-sm3>
      <v-card elevation="0">
        <v-list two-line>
          <template v-for="(item, index) in transactions_app">
            <v-divider :key="index + 'e'"></v-divider>
            <v-list-tile :key="item.id" avatar>
              <v-list-tile-avatar
                width="60px"
                class="avatarCard"
                tile
                @click="handleClick(item)"
              >
                <v-img
                  :src="
                    getSource(item.source.id)
                      ? require('@/assets/images/arrow_out_red.png')
                      : require('@/assets/images/arrow_in_green.png')
                  "
                ></v-img>
              </v-list-tile-avatar>

              <v-list-tile-content @click="handleClick(item)">
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
                  >
                    {{ item.type }}
                  </v-chip>
                </div>
              </v-list-tile-action>
            </v-list-tile>
          </template>
        </v-list>
      </v-card>
      <v-flex xs12 sm6 class="text-xs-center">
        <v-btn
          v-if="activeButton"
          block
          color="primary"
          text-color="white"
          @click="handleLoadMov"
        >
          <v-icon class="paddingBottom: 10px" color="white"
            >mdi-chevron-double-down</v-icon
          >
        </v-btn>
      </v-flex>
      <mov-info ref="modal"></mov-info>
    </v-flex>
  </v-layout>
</template>

<script>
import MovInfo from "./MovInfo";
import { mapActions, mapGetters } from "vuex";
import "../../../assets/utils";

export default {
  props: {
    activeButton: {
      type: Boolean,
      default: true
    }
  },
  components: { MovInfo },
  data: () => ({
    transactions: [],
    filter: {},
    person_id: localStorage.person_id,
    type: "number"
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
    setActiveButton() {
      return this.activeButton;
    }
  },

  methods: {
    ...mapActions(["setTransactionsApp"]),

    async handleClick(data) {
      this.$refs.modal.show(data);
    },
    handleLoadMov() {
      this.transactions = this.transactions_app;
      this.filter = this.filter_app;
      this.filter.perPage = this.filter.perPage + 5;
      this.setTransactionsApp(this.filter);
    },
    getSource(id) {
      if (this.person_id.toString() === id.toString()) return true;
      else return false;
    }
  },
  updated() {
    window.scrollTo(0, document.body.scrollHeight);
  },
  async mounted() {
    this.filter.page = 1;
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
