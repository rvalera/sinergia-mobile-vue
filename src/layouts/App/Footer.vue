<template>
  <v-bottom-sheet v-model="sheet">
    <template v-slot:activator>
      <v-btn dark fab bottom right fixed color="primary" class="fab-btn">
        <v-icon>add</v-icon>
      </v-btn>
    </template>
    <v-list subheader>
      <v-subheader>{{ $t("menu.transactions") }}</v-subheader>
      <v-list-tile
        v-for="tile in clientFabMenu"
        :key="tile.title"
        @click="
          () => {
            $router.push({ name: tile.name });
            sheet = false;
          }
        "
      >
        <v-list-tile-avatar>
          <v-avatar size="32px" tile>
            <v-icon x-large>{{ tile.icon }}</v-icon>
          </v-avatar>
        </v-list-tile-avatar>
        <v-list-tile-title>{{ tile.title }}</v-list-tile-title>
      </v-list-tile>
    </v-list>
    <template v-if="isAffiliate">
      <v-divider />
      <v-list subheader>
        <v-subheader>{{ $t("menu.myBusiness") }}</v-subheader>
        <v-list-tile
          v-for="tile in affiliateFabMenu"
          :key="tile.title"
          @click="
            () => {
              $router.push({ name: tile.name });
              sheet = false;
            }
          "
        >
          <v-list-tile-avatar>
            <v-avatar size="32px" tile>
              <v-icon x-large>{{ tile.icon }}</v-icon>
            </v-avatar>
          </v-list-tile-avatar>
          <v-list-tile-title>{{ tile.title }}</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </template>
  </v-bottom-sheet>
</template>
<script>
import { clientFabMenu, affiliateFabMenu } from "@/data/menu";
import { USER_TYPE_AFFILIATE } from "@/config/constants";
export default {
  data: () => ({
    sheet: false,
    clientFabMenu,
    affiliateFabMenu
  }),
  computed: {
    isAffiliate() {
      return USER_TYPE_AFFILIATE === localStorage.userType;
    }
  }
};
</script>

<style>
.fab-btn {
  bottom: 5% !important;
}
</style>
