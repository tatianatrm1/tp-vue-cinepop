<script setup>
import { ref, watch } from 'vue'
import Card from '@/components/Card.vue'
import Carrusel from '@/components/Carrusel.vue'

const peliculas = ref([])
const peliculasOriginales = ref([])
const buscador = ref('')
const genero = ref('')
const cargando = ref(false)

const TOKEN = import.meta.env.VITE_TMDB_API_KEY
const BASE_URL = 'https://api.themoviedb.org/3'

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${TOKEN}`,
  },
}


const getPeliculas = () => {
  cargando.value = true

  fetch(`${BASE_URL}/movie/popular?language=es-ES&page=1`, options)
    .then(res => res.json())
    .then(data => {
      peliculas.value = data.results
      peliculasOriginales.value = data.results
    })
    .finally(() => {
      cargando.value = false
    })
}

getPeliculas()


const buscarPeliculas = (query) => {
  if (!query) {
    peliculas.value = peliculasOriginales.value
    return
  }

  cargando.value = true

  fetch(`${BASE_URL}/search/movie?query=${query}&language=es-ES`, options)
    .then(res => res.json())
    .then(data => {
      peliculas.value = data.results
    })
    .finally(() => {
      cargando.value = false
    })
}


let timeout = null

watch(buscador, (valor) => {
  clearTimeout(timeout)
  timeout = setTimeout(() => {
    buscarPeliculas(valor)
  }, 400)
})


const filtrarGenero = () => {
  const base = buscador.value
    ? peliculas.value
    : peliculasOriginales.value

  if (!genero.value) {
    if (buscador.value) {
      buscarPeliculas(buscador.value)
    } else {
      peliculas.value = peliculasOriginales.value
    }
    return
  }

  peliculas.value = base.filter(p =>
    p.genre_ids?.includes(Number(genero.value))
  )
}
</script>

<template>

  
  <Carrusel :peliculas="peliculas" />

  
  <v-container fluid class="px-6 px-md-12 py-6 home-bg ">

    <h1 class="text-center font-weight-bold my-6 text-white">
      Peliculas
    </h1>

    
    <v-card class="search-bar mb-8" elevation="10" rounded="xl" >

      <v-card-text class="py-5 text-white" >

        
        <v-row align="center">

          
          <v-col cols="12" md="8">
            <v-text-field
              
              v-model="buscador"
              label="Buscar películas..."
              id="buscador"
              name="buscador"
              prepend-inner-icon="mdi-magnify"
              variant="filled"
              density="comfortable"
              hide-details
              clearable
            
            />
          </v-col>

          
          <v-col cols="12" md="4">
            <v-select
              v-model="genero"
              label="Género"
              id="genero"
              name="genero"
              prepend-inner-icon="mdi-filter"
              variant="filled"
              density="comfortable"
              hide-details
              clearable
              :items="[
                { title: 'Acción', value: 28 },
                { title: 'Comedia', value: 35 },
                { title: 'Terror', value: 27 },
                { title: 'Animación', value: 16 },
                { title: 'Ciencia ficción', value: 878 },
                { title: 'Romance', value: 10749 },
                { title: 'Suspenso', value: 53 }
              ]"
              @update:modelValue="filtrarGenero"
            />
          </v-col>

        </v-row>

      </v-card-text>

    </v-card>

    <h2 class="text-h5 font-weight-bold mb-4 text-white">
      Películas populares
    </h2>

    
    <div v-if="cargando" class="text-center">
      <v-progress-circular indeterminate color="white" />
    </div>

    
    <v-row v-else>
      <v-col
        v-for="item in peliculas"
        :key="item.id"
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <Card :pelicula="item" />
      </v-col>
    </v-row>

  </v-container>

</template>

<style scoped>
.home-bg {
  background: #0d0d0d;
  min-height: 100vh;
}

.search-bar {
  background: rgba(25, 25, 25, 0.75);
  backdrop-filter: blur(16px);
}


</style>