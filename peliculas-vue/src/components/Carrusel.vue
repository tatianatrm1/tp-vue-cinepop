<script setup>
defineProps({
  peliculas: Array,
})
</script>

<template>
  <v-carousel
    height="500"
    hide-delimiter-background
    show-arrows="hover"
    cycle
  >
    <v-carousel-item
      v-for="pelicula in peliculas.slice(0, 5)"
      :key="pelicula.id"
    >
      <v-img
        :src="`https://image.tmdb.org/t/p/original${pelicula.backdrop_path}`"
        height="500"
        cover
      >
        <div class="degradado d-flex flex-column justify-end fill-height">

          <div class="pa-8 text-white">

            <h1 class="text-h3 font-weight-bold mb-2">
              {{ pelicula.title }}
            </h1>

            <p class="text-body-1 mb-4">
              {{ pelicula.overview }}
            </p>

            <v-btn
              color="red"
              :to="'/detalle/' + pelicula.id"
            >
              Ver detalles
            </v-btn>

          </div>

        </div>
      </v-img>
    </v-carousel-item>
  </v-carousel>
</template>

<style scoped>
.degradado {
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.9),
    rgba(0, 0, 0, 0.2)
  );
}
</style>