<script setup>
import { ref, onMounted } from 'vue'
import Card from '@/components/Card.vue'

const peliculas = ref([])


const cargarFavoritos = () => {
  peliculas.value = JSON.parse(localStorage.getItem('favorito')) || []
}


onMounted(() => {
  cargarFavoritos()
})


const refrescar = () => {
  cargarFavoritos()
}
</script>

<template>
  <v-container>

    <h1 class="text-h4 font-weight-bold mb-6">
      Mis peliculas favoritas
    </h1>

    
    <div v-if="peliculas.length === 0" class="text-center py-10">

      <v-icon size="80" color="grey">
        mdi-heart-outline
      </v-icon>

      <h2 class="mt-4 mb-2">
        Aún no tenés películas favoritas
      </h2>

      <p class="text-grey mb-6">
        Explorá películas y guardá las que más te gusten
      </p>

      <v-btn color="primary" to="/">
        Ir a la home
      </v-btn>

    </div>

    
    <v-row v-else>
      <v-col
        v-for="item in peliculas"
        :key="item.id"
        cols="12"
        md="4"
      >
        <Card
          :pelicula="item"
          @click="refrescar"
        />
      </v-col>
    </v-row>

  </v-container>
</template>