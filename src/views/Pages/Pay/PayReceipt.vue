<template>
  <v-container fill-height py-1>
    <v-layout row wrap justify-center>
      <v-flex xs12 sm6 class="text-xs-center">
        <v-card elevation="0" class="text-xs-left px-3">
          <div class="text-xs-center">
            <p
              class="title mb-3 green--text font-weight-bold d-flex headerSuccess"
            >
              <v-icon x-large class="mb-2" color="green"
                >check_circle_outline</v-icon
              >
              Transacción exitosa
            </p>
          </div>
          <p class="display-1 mb-0 font-weight-bold text-xs-center">
            {{
              receipt.amount
                | currency("$", 2, {
                  thousandsSeparator: ".",
                  decimalSeparator: ","
                })
            }}
          </p>
          <p class="body-1 mb-3 text-xs-center">
            {{ receipt.execution_date }}
          </p>
          <v-text-field
            label="Origen"
            v-model="receipt.source_description"
            filled
            readonly
          />
          <v-text-field
            label="Destino"
            v-model="receipt.target_description"
            filled
            readonly
          />
          <v-text-field
            label="Concepto"
            v-model="receipt.observation"
            filled
            readonly
          />
          <v-text-field
            label="Referencia"
            v-model="receipt.ref_number"
            filled
            readonly
          />
        </v-card>
        <v-layout justify-space-around>
          <v-flex xs5>
            <v-btn large round block color="primary">
              <v-icon left>share</v-icon>
              Compartir
            </v-btn>
          </v-flex>
          <v-flex xs5>
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

<style>
.headerSuccess {
  flex-direction: column;
}
</style>
