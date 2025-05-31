<template>
  <header
    class="sticky top-0 z-10 bg-zinc-900/90 backdrop-blur-sm border-b border-zinc-800 px-4 py-3"
  >
    <div class="max-w-screen-xl mx-auto flex items-center justify-between">
      <!-- Logo and navigation -->
      <div class="flex items-center gap-6">
        <div class="flex items-center gap-2">
          <div
            class="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center"
          >
            <span class="font-bold text-white text-sm">UF</span>
          </div>
          <span class="font-bold hidden sm:inline-block text-white"
            >Upfound</span
          >
        </div>

        <nav class="hidden md:flex items-center gap-6">
          <NuxtLink
            to="/explore"
            class="text-zinc-400 hover:text-white"
            :class="{
              'text-orange-500 font-medium': $route.path === '/explore',
            }"
          >
            Explore
          </NuxtLink>
          <NuxtLink
            to="/submit"
            class="text-zinc-400 hover:text-white"
            :class="{
              'text-orange-500 font-medium': $route.path === '/submit',
            }"
          >
            Submit
          </NuxtLink>
        </nav>
      </div>

      <!-- Auth section -->
      <div class="flex items-center gap-3">
        <!-- If user is logged in -->
        <div v-if="isAuthenticated" class="flex items-center gap-2">
          <button
            class="flex items-center gap-2 text-white hover:bg-zinc-800 rounded-full p-1 pr-3"
          >
            <div
              class="w-7 h-7 bg-zinc-700 rounded-full flex items-center justify-center"
            >
              <span class="font-medium text-xs">{{ userInitials }}</span>
            </div>
            <span class="text-sm hidden sm:inline-block">{{ userName }}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4 text-zinc-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        </div>

        <!-- If user is not logged in -->
        <div v-else class="flex items-center gap-2">
          <button
            @click="signIn"
            class="bg-zinc-800 text-white hover:bg-zinc-700 px-3 py-1.5 text-sm rounded-md border border-zinc-700"
          >
            Sign In
          </button>
          <button
            @click="signUp"
            class="bg-orange-500 text-white hover:bg-orange-600 px-3 py-1.5 text-sm rounded-md"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";

// Auth state
const isAuthenticated = ref(false);
const userName = ref("");

// Computed property to generate user initials for avatar
const userInitials = computed(() => {
  if (!userName.value) return "";
  const names = userName.value.split(" ");
  if (names.length > 1) {
    return (names[0][0] + names[1][0]).toUpperCase();
  }
  return names[0][0].toUpperCase();
});

// Check auth status on component mount
onMounted(() => {
  checkAuthStatus();
});

// Function to check if user is authenticated
function checkAuthStatus() {
  // Check if token exists in localStorage
  const token = localStorage.getItem("auth_token");

  if (token) {
    isAuthenticated.value = true;
    // Get user name from localStorage or you might want to fetch from an API
    const storedName = localStorage.getItem("user_name");
    userName.value = storedName || "User";
  } else {
    isAuthenticated.value = false;
    userName.value = "";
  }
}

// Auth functions
function signIn() {
  // Implement sign in functionality or navigation
  console.log("Sign in clicked");
}

function signUp() {
  // Implement sign up functionality or navigation
  console.log("Sign up clicked");
}
</script>
