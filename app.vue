<template>
  <div class="min-h-screen flex flex-col bg-zinc-900 text-white">
    <Navbar class="flex-shrink-0" />
    <main class="flex-grow overflow-y-auto">
      <NuxtPage />
    </main>
  </div>
</template>

<script setup>
import Navbar from "./components/layout/Navbar.vue";
useHead({
  title: "Upfound",
  meta: [
    {
      name: "description",
      content: "Upfound - Discover and share amazing products",
    },
  ],
});
</script>
