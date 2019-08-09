<template>
  <v-container fill-height>
    <v-layout row wrap align-content-center justify-center>
      <v-flex xs12 sm6 class="text-xs-center">
        <v-card elevation="4" class="text-xs-left pa-3">
          <div class="text-xs-center">
            <p class="title my-3 green--text font-weight-bold">
              <v-icon x-large color="green">check_circle_outline</v-icon>
              Transacción exitosa
            </p>
          </div>
          <p class="subheading my-3">
            <b>De:</b><br />
            {{ receipt.source_description }}
          </p>
          <p class="subheading my-3">
            <b>Para:</b><br />
            {{ receipt.target_description }}
          </p>
          <p class="subheading my-3">
            <b>Monto:</b><br />
            {{
              receipt.amount
                | currency("$", 2, {
                  thousandsSeparator: ".",
                  decimalSeparator: ","
                })
            }}
          </p>
          <p class="subheading my-3">
            <b>Concepto:</b><br />
            {{ receipt.observation }}
          </p>
          <p class="subheading my-3">
            <b>Referencia:</b><br />
            {{ receipt.ref_number }}
          </p>
          <p class="subheading my-3">
            <b>Fecha:</b><br />
            {{ receipt.execution_date }}
          </p>
        </v-card>
        <v-layout row class="mt-4">
          <v-flex xs6>
            <v-btn large round block color="primary">
              <v-icon left>share</v-icon>
              Compartir
            </v-btn>
          </v-flex>
          <v-flex xs6>
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
    receipt: Object
  }
};
</script>
