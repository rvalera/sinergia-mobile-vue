<template>
  <div class="text-xs-center">
    <v-bottom-sheet v-model="sheet">
      <template v-slot:activator>
        <v-btn dark fab bottom right fixed color="primary" class="fab-btn">
          <v-icon>add</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-subheader>Open in</v-subheader>
        <v-list-tile
          v-for="tile in tiles"
          :key="tile.title"
          @click="sheet = false"
        >
          <v-list-tile-avatar>
            <v-avatar size="32px" tile>
              <img
                :src="
                  `https://cdn.vuetifyjs.com/images/bottom-sheets/${tile.img}`
                "
                :alt="tile.title"
              />
            </v-avatar>
          </v-list-tile-avatar>
          <v-list-tile-title>{{ tile.title }}</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-bottom-sheet>
  </div>
</template>
<script>
export default {
  data: () => ({
    sheet: false,
    tiles: [
      { img: "keep.png", title: "Pagar Factura QR" },
      { img: "inbox.png", title: "Realizar Pago Confiable" },
      { img: "hangouts.png", title: "Transferir Saldo" },
      { img: "messenger.png", title: "Recargar Saldo" },
      { img: "google.png", title: "Generar Pago Confiable" },
      { img: "inbox.png", title: "Solicitar Liquidación" }
    ]
  })
};
</script>

<style>
.fab-btn {
  bottom: 5% !important;
}
</style>
