<template>
  <v-layout row>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-list two-line>
          <template v-if="fetched && !terminals.length">
            <v-flex xs12 sm6 class="text-xs-center pa-4">
              <v-alert :value="true" dense type="info" outline>
                <strong> {{ $t("terminal.withoutTerminals") }}</strong>
              </v-alert>
            </v-flex>
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
                  v-html="new Date().toLocaleDateString()"
                ></v-list-tile-sub-title>
              </v-list-tile-content>
              <v-list-tile-action class="row-centered">
                <div class="text-xs-center">
                  <v-chip
                    outline
                    :color="terminalColor(item.status)"
                    class="max-width-chip"
                    >{{ item.named_status }}</v-chip
                  >
                </div>
                <v-menu bottom left>
                  <template v-slot:activator="{ on }">
                    <v-btn icon v-on="on">
                      <v-icon color="grey lighten-1">mdi-dots-vertical</v-icon>
                    </v-btn>
                  </template>
                  <v-list>
                    <v-list-tile
                      @click="handleDelete(item.id)"
                      v-if="item.status === TERMINAL_STATUS_GENERATED"
                    >
                      <v-list-tile-title>{{
                        $t("common.delete")
                      }}</v-list-tile-title>
                    </v-list-tile>
                    <v-list-tile
                      v-if="item.status === TERMINAL_STATUS_ACTIVE"
                      @click="askLockUnlock(item)"
                    >
                      <v-list-tile-title>{{
                        $t("common.lock")
                      }}</v-list-tile-title>
                    </v-list-tile>
                    <v-list-tile
                      v-if="item.status === TERMINAL_STATUS_LOCK"
                      @click="askLockUnlock(item)"
                    >
                      <v-list-tile-title>{{
                        $t("common.unlock")
                      }}</v-list-tile-title>
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
    <v-dialog v-model="dialog.flag" persistent max-width="290">
      <v-card>
        <v-card-title class="headline">{{ dialog.title }}</v-card-title>
        <v-card-text>{{ dialog.body }}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" flat @click.native="dialog.flag = false">{{
            $t("common.cancel")
          }}</v-btn>
          <v-btn color="primary" flat @click.native="handleLockUnlock">{{
            $t("common.accept")
          }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import {
  getTerminalsApi,
  deleteTerminalApi,
  lockTerminalApi,
  unlockTerminalApi
} from "@/api/modules";
import TerminalInfo from "./TerminalInfo";
import {
  TERMINAL_TYPES_ICONS,
  TERMINAL_STATUS_COLORS,
  TERMINAL_STATUS_ACTIVE,
  TERMINAL_STATUS_GENERATED,
  TERMINAL_STATUS_LOCK
} from "@/config/constants";
export default {
  components: { TerminalInfo },
  data: () => ({
    dialog: {
      title: "",
      body: "",
      flag: false,
      data: null
    },
    TERMINAL_STATUS_ACTIVE,
    TERMINAL_STATUS_LOCK,
    TERMINAL_STATUS_GENERATED,
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
    terminalColor(status) {
      return TERMINAL_STATUS_COLORS[status];
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
    },
    async handleLockUnlock() {
      this.dialog.flag = false;
      const item = this.dialog.data;
      const body = {
        terminal_id: item.id
      };
      let serviceResponse;
      if (item.status === TERMINAL_STATUS_ACTIVE) {
        serviceResponse = await lockTerminalApi(body);
      } else if (item.status === TERMINAL_STATUS_LOCK) {
        serviceResponse = await unlockTerminalApi(body);
      }
      if (serviceResponse.ok) {
        this.getTerminals();
        const params = { text: serviceResponse.message.text };
        window.getApp.$emit("SHOW_MESSAGE", params);
      } else {
        const params = { text: serviceResponse.message.text };
        window.getApp.$emit("SHOW_ERROR", params);
      }
    },
    askLockUnlock(item) {
      this.dialog.data = item;
      if (item.status === TERMINAL_STATUS_ACTIVE) {
        this.dialog.title = this.$t("common.lock");
        this.dialog.body = this.$t("common.sureWannaLock");
      } else if (item.status === TERMINAL_STATUS_LOCK) {
        this.dialog.title = this.$t("common.unlock");
        this.dialog.body = this.$t("common.sureWannaUnlock");
      }
      this.dialog.flag = true;
    }
  },
  async mounted() {
    this.getTerminals();
  }
};
</script>
<style>
.row-centered {
  flex-direction: row !important;
  align-items: center !important;
}
</style>
