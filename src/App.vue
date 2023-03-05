<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import AddBook from './components/AddBook.vue'
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />
       <nav>
        <RouterLink to="/"></RouterLink>
      </nav>
    </header>  
    <div class="wrapper">
      <AddBook/>
    </div>
  <RouterView />
</template>
