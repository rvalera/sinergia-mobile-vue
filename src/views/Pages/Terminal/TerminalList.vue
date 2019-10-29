<template>
  <v-layout row>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-list two-line>
          <template v-if="fetched && !terminals.length">
            <v-alert :value="true" color="warning" icon="priority_high" outline>
              <p class="title text-xs-center no-mrpd">
                {{ $t("terminal.withoutTerminals") }}
              </p>
            </v-alert>
          </template>
          <template
            v-else-if="fetched && terminals.length"
            v-for="(item, index) in terminals"
          >
            <v-divider :inset="true" :key="index + 'e'"></v-divider>
            <v-list-tile :key="item.id" avatar>
              <v-list-tile-avatar tile @click="handleClick(item)">
                <v-icon x-large>{{ terminalIcon(item.type) }}</v-icon>
              </v-list-tile-avatar>
              <v-list-tile-content @click="handleClick(item)">
                <v-list-tile-title
                  v-html="item.validation_code"
                ></v-list-tile-title>
                <v-list-tile-sub-title
                  v-html="item.named_status"
                ></v-list-tile-sub-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-menu bottom left>
                  <template v-slot:activator="{ on }">
                    <v-btn icon v-on="on">
                      <v-icon color="grey lighten-1">mdi-dots-vertical</v-icon>
                    </v-btn>
                  </template>
                  <v-list>
                    <v-list-tile @click="handleDelete(item.id)">
                      <v-list-tile-title>
                        {{ $t("common.delete") }}
                      </v-list-tile-title>
                    </v-list-tile>
                  </v-list>
                </v-menu>
              </v-list-tile-action>
            </v-list-tile>
          </template>
        </v-list>
      </v-card>
    </v-flex>
    <v-btn
      dark
      fab
      bottom
      right
      fixed
      color="primary"
      class="fab-btn"
      @click="() => $router.push({ name: 'TerminalForm' })"
    >
      <v-icon>add</v-icon>
    </v-btn>
    <terminal-info ref="modal" />
  </v-layout>
</template>

<script>
import { getTerminalsApi, deleteTerminalApi } from "@/api/modules";
import TerminalInfo from "./TerminalInfo";
import { TERMINAL_TYPES_ICONS } from "@/config/constants";
export default {
  components: { TerminalInfo },
  data: () => ({
    terminals: [],
    fetched: false,
    filter: {
      person_id: localStorage.person_id
    },
    page: 0,
    perPage: 5,
    total: 0
  }),
  methods: {
    async handleClick(data) {
      this.$refs.modal.show(data);
    },
    terminalIcon(type) {
      return TERMINAL_TYPES_ICONS[type];
    },
    async getTerminals() {
      const { filter, page, perPage } = this;
      const start = 0;
      const end = (page + 1) * perPage;
      const params = {
        filter,
        range: JSON.stringify([start, end])
      };
      var serviceResponse = await getTerminalsApi(params);
      if (serviceResponse.ok) {
        this.terminals = serviceResponse.data;
        this.fetched = true;
      } else {
        const params = { text: serviceResponse.message.text };
        window.getApp.$emit("SHOW_ERROR", params);
      }
    },
    async handleDelete(id) {
      var serviceResponse = await deleteTerminalApi(id);
      if (serviceResponse.ok) {
        this.getTerminals();
        const params = { text: serviceResponse.message.text };
        window.getApp.$emit("SHOW_MESSAGE", params);
      } else {
        const params = { text: serviceResponse.message.text };
        window.getApp.$emit("SHOW_ERROR", params);
      }
    }
  },
  async mounted() {
    this.getTerminals();
  }
};
</script>
<style>
.avatarCard {
  padding-right: 30px;
}

.v-stepper__wrapper {
  height: 100%;
}
</style>
