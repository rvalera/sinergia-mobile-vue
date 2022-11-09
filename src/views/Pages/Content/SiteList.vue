<template>
  <v-layout row>
    <v-flex>
      <template v-if="fetched && !sites.length">
        <v-flex xs12 sm6 class="text-xs-center pa-4">
          <v-alert :value="true" dense type="info" outline>
            <strong> {{ $t(" .withoutContent") }}</strong>
          </v-alert>
        </v-flex>
      </template>
      <template
        v-else-if="fetched && sites.length"
        v-for="(item, index) in sites"
      >
        <v-card class="mx-auto" max-width="344">
          <v-card-title class="text-h5">
            {{ item.name }}
          </v-card-title>

          <v-card-subtitle>
            {{ item.description }}
          </v-card-subtitle>

          <v-card-actions>
            <v-btn icon @click="handleLove(item)">
              <v-icon>mdi-heart</v-icon>
            </v-btn>

            <v-btn icon @click="handleFollow(item)">
              <v-icon>mdi-bookmark</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </v-flex>
  </v-layout>
</template>

<script>
import { getAllSiteApi, putFollowSiteApi, putLoveSiteApi } from "@/api/modules";
// import ContentList from "./ContentList";
export default {
  data: () => ({
    sites: [],
    fetched: false,
    show: false
  }),
  methods: {
    async getSites() {
      let serviceResponse = await getAllSiteApi();
      if (serviceResponse.ok) {
        this.sites = serviceResponse.data;
        this.fetched = true;
      } else {
        const params = { text: serviceResponse.message.text };
        window.getApp.$emit("SHOW_ERROR", params);
      }
    },
    async handleFollow(item) {
      let payload = { id: item.id };
      var serviceResponse = await putFollowSiteApi(payload);
      if (serviceResponse.ok) {
        const params = { text: "Follow" };
        window.getApp.$emit("SHOW_MESSAGE", params);
      } else {
        const params = { text: serviceResponse.message.text };
        window.getApp.$emit("SHOW_ERROR", params);
      }
    },
    async handleLove(item) {
      let payload = { id: item.id };
      var serviceResponse = await putLoveSiteApi(payload);
      if (serviceResponse.ok) {
        const params = { text: "Love" };
        window.getApp.$emit("SHOW_MESSAGE", params);
      } else {
        const params = { text: serviceResponse.message.text };
        window.getApp.$emit("SHOW_ERROR", params);
      }
    }
  },
  async mounted() {
    await this.getSites();
  }
};
</script>
