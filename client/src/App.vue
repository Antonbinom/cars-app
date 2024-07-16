<script setup>
import HeaderComponent from "./components/HeaderComponent.vue";
</script>

<template>
  <HeaderComponent />

  <main>
    <div class="container">
      <router-view />
    </div>
  </main>
</template>
