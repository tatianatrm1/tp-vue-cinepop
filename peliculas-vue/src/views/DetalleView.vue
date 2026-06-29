<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const pelicula = ref(null)
const esFavorito = ref(false)

const TOKEN = import.meta.env.VITE_TMDB_API_KEY
const BASE_URL = 'https://api.themoviedb.org/3'

const origen = ref('/')


const getDetalle = () => {
  fetch(`${BASE_URL}/movie/${route.params.id}?language=es-ES`, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${TOKEN}`,
    },
  })
    .then(res => res.json())
    .then(data => {
      pelicula.value = data
      checkFavorito()
    })
}

getDetalle()


onMounted(() => {
  const state = window.history.state

  if (state && state.back) {
    origen.value = state.back.includes('favorito')
      ? '/favorito'
      : '/'
  } else {
    origen.value = '/'
  }
})


const checkFavorito = () => {
  const favs = JSON.parse(localStorage.getItem('favorito')) || []

  if (!pelicula.value) return

  esFavorito.value = favs.some(f => f.id === pelicula.value.id)
}

const toggleFavorito = () => {
  if (!pelicula.value) return

  let favs = JSON.parse(localStorage.getItem('favorito')) || []

  const index = favs.findIndex(f => f.id === pelicula.value.id)

  if (index === -1) {
    favs.push(pelicula.value)
    esFavorito.value = true
  } else {
    favs.splice(index, 1)
    esFavorito.value = false
  }

  localStorage.setItem('favorito', JSON.stringify(favs))
}


const volver = () => {
  router.push(origen.value)
}
</script>

<template>

  <v-container v-if="pelicula" class="py-10">

    <v-row justify="center" align="start">

      <v-col cols="12" md="4" class="text-center">

        <v-img
          :src="`https://image.tmdb.org/t/p/w500${pelicula.poster_path}`"
          max-width="350"
          class="mx-auto rounded-xl"
          cover
        />

      </v-col>

      <v-col cols="12" md="8">

        <h1 class="text-h3 font-weight-bold mb-2">
          {{ pelicula.title }}
        </h1>

        <div class="text-grey mb-6" v-if="pelicula.tagline">
          {{ pelicula.tagline }}
        </div>

        <p class="text-body-1 mb-8">
          {{ pelicula.overview }}
        </p>

        <v-row>

          <v-col cols="12" sm="6">
            <v-icon color="primary">mdi-calendar</v-icon>
            <strong> Estreno</strong>
            <div>{{ pelicula.release_date }}</div>
          </v-col>

          <v-col cols="12" sm="6">
            <v-icon color="amber-darken-2">mdi-star</v-icon>
            <strong> Rating</strong>
            <div>
              {{ pelicula.vote_average ? pelicula.vote_average.toFixed(1) : '0' }}/10
              ({{ pelicula.vote_count || 0 }} votos)
            </div>
          </v-col>

          <v-col cols="12" sm="6">
            <v-icon color="green">mdi-clock-outline</v-icon>
            <strong> Duración</strong>
            <div>{{ pelicula.runtime || '-' }} min</div>
          </v-col>

          <v-col cols="12" sm="6">
            <v-icon color="deep-purple">mdi-translate</v-icon>
            <strong> Idioma</strong>
            <div>
              {{ pelicula.original_language ? pelicula.original_language.toUpperCase() : '-' }}
            </div>
          </v-col>

        </v-row>

        <div class="mt-8 d-flex ga-3">

          <v-btn
            color="primary"
            prepend-icon="mdi-arrow-left"
            @click="volver"
          >
            Volver
          </v-btn>

          <v-btn
            :color="esFavorito ? 'red-darken-2' : 'red'"
            prepend-icon="mdi-heart"
            variant="tonal"
            @click="toggleFavorito"
          >
            {{ esFavorito ? 'En favoritos' : 'Agregar a favorito' }}
          </v-btn>

          <v-btn
            color="grey-darken-2"
            prepend-icon="mdi-heart-outline"
            to="/favorito"
            variant="tonal"
          >
            Ver favoritos
          </v-btn>

        </div>

      </v-col>

    </v-row>

  </v-container>

  <div v-else class="text-center mt-10">
    <v-progress-circular indeterminate color="primary" />
  </div>

</template>

<style scoped>
.rounded-xl {
  border-radius: 20px;
}

.text-grey {
  color: #757575;
}
</style>