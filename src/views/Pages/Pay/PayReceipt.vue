<template>
  <v-container fill-height>
    <v-layout row wrap align-content-center justify-center>
      <v-flex xs12 sm6 class="text-xs-center">
        <v-card elevation="4" class="text-xs-left pa-3">
          <div class="text-xs-center">
            <v-icon x-large color="green">check_circle_outline</v-icon>
          </div>
          <p class="subheading my-4"><b>Destino:</b> {{ payData.target }}</p>
          <p class="subheading my-4">
            <b>Monto:</b>
            {{
              payData.amount
                | currency("$", 2, {
                  thousandsSeparator: ".",
                  decimalSeparator: ","
                })
            }}
          </p>
          <p class="subheading my-4"><b>Concepto:</b> {{ payData.concept }}</p>
          <p class="subheading my-4">
            <b>Fecha:</b> {{ new Date().toISOString().substr(0, 10) }}
          </p>
        </v-card>
        <v-layout row class="mt-4">
          <v-flex xs2>
            <v-btn large icon>
              <v-icon>share</v-icon>
            </v-btn>
          </v-flex>
          <v-flex xs10>
            <v-btn large round block color="primary" @click="$emit('finish')"
              >Finalizar</v-btn
            >
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
export default {
  props: {
    payData: Object
  }
};
</script>
