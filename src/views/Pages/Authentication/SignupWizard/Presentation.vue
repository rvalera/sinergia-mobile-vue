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
            <div class="body-2 white--text">Bienvenido a CryptoPos blabla</div>
            <v-btn color="act" @click="$emit('next')" class="ml-0"
              >Continue</v-btn
            >
          </v-flex>
        </v-layout>
      </v-container>
    </v-flex>
  </v-layout>
</template>
<script>
export default {};
</script>
