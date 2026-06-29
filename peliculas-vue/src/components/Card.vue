<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps(['pelicula'])

const esFavorito = ref(false)


const checkFavorito = () => {
  const favs = JSON.parse(localStorage.getItem('favorito')) || []
  esFavorito.value = favs.some(f => f.id === props.pelicula.id)
}


const toggleFavorito = () => {
  let favs = JSON.parse(localStorage.getItem('favorito')) || []

  if (esFavorito.value) {
    favs = favs.filter(f => f.id !== props.pelicula.id)
  } else {
    favs.push(props.pelicula)
  }

  esFavorito.value = !esFavorito.value
  localStorage.setItem('favorito', JSON.stringify(favs))
}

onMounted(checkFavorito)
</script>


<template>
  <v-card
    class="mx-auto d-flex flex-column movie-card"
    max-width="340"
    height="520"
    elevation="4"
    rounded="xl"
  >

    <v-img
      :src="pelicula.poster_path
        ? 'https://image.tmdb.org/t/p/w500' + pelicula.poster_path
        : 'https://placehold.co/300x450?text=Sin+imagen'"
      height="240"
      cover
    >

      <div class="rating">

        <template v-if="pelicula.vote_average > 0">

          <v-icon
            v-for="estrella in 5"
            :key="estrella"
            size="16"
            :color="estrella <= Math.round(pelicula.vote_average / 2)
              ? 'yellow-darken-2'
              : 'grey-darken-1'"
          >
            mdi-star
          </v-icon>

        </template>

        <span v-else class="no-rating">
          Sin calificación
        </span>

      </div>

    </v-img>

    <v-card-title class="text-subtitle-1 font-weight-bold pt-3">
      {{ pelicula.title || 'Sin título' }}
    </v-card-title>

    <v-card-subtitle class="text-caption text-medium-emphasis">
      {{ pelicula.release_date || 'Sin fecha' }}
    </v-card-subtitle>

    <v-card-text class="text-body-2 text-medium-emphasis">
      <div class="clamp-text">
        {{ pelicula.overview || 'Sin descripción disponible.' }}
      </div>
    </v-card-text>

    <v-card-actions class="mt-auto px-3 pb-3 actions">

      <v-btn
        :to="'/detalle/' + pelicula.id"
        color="primary"
        variant="tonal"
        size="small"
        class="flex-grow-1 btn-details"
      >
        Detalles
      </v-btn>

      <v-btn
        icon
        color="red"
        variant="tonal"
        @click="toggleFavorito"
      >
        <v-icon>
          {{ esFavorito ? 'mdi-heart' : 'mdi-heart-outline' }}
        </v-icon>
      </v-btn>

    </v-card-actions>

  </v-card>
</template>
```


<style scoped>
.movie-card {
  overflow: hidden;
  background: #1b1b1b;
  color: white;
}

.rating {
  position: absolute;
  top: 8px;
  left: 8px;
  background: rgba(0,0,0,0.6);
  padding: 4px 6px;
  border-radius: 8px;
  display: flex;
  gap: 2px;
}

.no-rating {
  color: white;
  font-size: 12px;
  opacity: 0.9;
}

.movie-card :deep(.v-card-title) {
  color: white;
}

.movie-card :deep(.v-card-subtitle) {
  color: rgba(255,255,255,0.65);
}

.movie-card :deep(.v-card-text) {
  color: rgba(255,255,255,0.8);
}

.clamp-text {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;

  display: box;
  box-orient: vertical;
  line-clamp: 3;
}

.btn-details {
  height: 48px !important;
  border-radius: 20px;
}

.actions {
  gap: 8px;
  border-top: 1px solid rgba(255,255,255,0.08);
}
</style>