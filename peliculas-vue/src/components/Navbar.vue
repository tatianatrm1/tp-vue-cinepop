<script setup>
import { ref } from 'vue'
import logo from '@/logo/cinePop.png'

const mostrarMenu = ref(false)

const opciones = [
  { titulo: 'Home', to: '/', icono: 'mdi-home' },
  { titulo: 'Favoritos', to: '/favorito', icono: 'mdi-heart' },
]
</script>

<template>
  <v-app-bar color="black" dark>

    <v-app-bar-nav-icon
      class="d-md-none"
      @click="mostrarMenu = !mostrarMenu"
    />

    <v-app-bar-title>
      <img :src="logo" alt="Logo" height="40" />
    </v-app-bar-title>

    <div class="d-none d-md-flex">
      <v-btn
        v-for="opcion in opciones"
        :key="opcion.to"
        :to="opcion.to"
        :prepend-icon="opcion.icono"
      >
        {{ opcion.titulo }}
      </v-btn>
    </div>

  </v-app-bar>

  <v-navigation-drawer v-model="mostrarMenu" temporary>
    <v-list>
      <v-list-item
        v-for="opcion in opciones"
        :key="opcion.to"
        :to="opcion.to"
        :prepend-icon="opcion.icono"
      >
        {{ opcion.titulo }}
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>