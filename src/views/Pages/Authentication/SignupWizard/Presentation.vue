<template>
  <v-layout wrap>
    <v-flex xs12 primary>
      <v-container fill-height>
        <v-layout align-center>
          <v-flex xs12 class="text-xs-center">
            <img
              src="static/vuse.svg"
              alt="Vuse"
              class="text-xs-center"
              height="300"
            />
            <div class="body-2 white--text">Bienvenido a CryptoPos</div>
          </v-flex>
        </v-layout>
      </v-container>
    </v-flex>
    <div class=" put-bottom px-3">
      <v-btn color="primary" round block @click="$emit('next')" class="ml-0">{{
        $t("common.continue")
      }}</v-btn>
    </div>
  </v-layout>
</template>
<script>
export default {};
</script>
