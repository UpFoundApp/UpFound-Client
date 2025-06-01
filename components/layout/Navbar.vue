<template>
  <header
    class="sticky top-0 z-10 bg-zinc-900/90 backdrop-blur-sm border-b border-zinc-800"
  >
    <div
      class="max-w-screen-xl mx-auto px-4 py-3 flex items-center justify-between"
    >
      <!-- Logo -->
      <div class="flex items-center">
        <NuxtLink to="/" class="flex items-center gap-2">
          <div
            class="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center"
          >
            <span class="font-bold text-white text-sm">UF</span>
          </div>
          <span class="font-bold hidden sm:inline-block">Upfound</span>
        </NuxtLink>
      </div>

      <!-- Desktop Navigation -->
      <nav class="hidden md:flex items-center gap-6">
        <NuxtLink
          to="/explore"
          class="text-zinc-400 hover:text-white transition-colors"
          :class="{
            'text-orange-500 font-medium': $route.path.includes('/explore'),
          }"
        >
          Explore
        </NuxtLink>
        <NuxtLink
          to="/submit"
          class="text-zinc-400 hover:text-white transition-colors"
          :class="{ 'text-orange-500 font-medium': $route.path === '/submit' }"
        >
          Submit
        </NuxtLink>
      </nav>

      <!-- Auth Section -->
      <div class="flex items-center">
        <div class="flex items-center gap-3">
          <!-- Logged-in -->
          <div v-if="isAuthenticated" class="flex items-center">
            <NuxtLink
              to="/submit"
              class="md:hidden mr-3 text-zinc-400 hover:text-white transition-colors"
              :class="{
                'text-orange-500 font-medium': $route.path === '/submit',
              }"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </NuxtLink>

            <div class="relative">
              <button
                id="user-menu-button"
                @click="toggleUserMenu"
                class="flex items-center gap-2 text-white hover:bg-zinc-800 rounded-full p-1 pr-3 transition-colors"
              >
                <div
                  class="w-7 h-7 bg-zinc-700 rounded-full flex items-center justify-center"
                >
                  <span class="font-medium text-xs">{{ userInitials }}</span>
                </div>
                <span class="text-sm hidden sm:inline-block">{{
                  userName
                }}</span>
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

              <!-- Dropdown -->
              <div
                v-if="showUserMenu"
                id="user-menu"
                class="absolute right-0 mt-2 w-48 bg-zinc-800 rounded-md shadow-lg py-1 border border-zinc-700 ring-1 ring-black ring-opacity-5 focus:outline-none"
              >
                <NuxtLink
                  :to="`/profile/${userId}`"
                  class="block px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-700"
                  >Your Profile</NuxtLink
                >
                <button
                  @click="logout"
                  class="block w-full text-left px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-700"
                >
                  Sign out
                </button>
              </div>
            </div>
          </div>

          <!-- Not logged-in -->
          <div v-else class="flex items-center gap-2">
            <NuxtLink
              to="/login"
              class="text-zinc-300 hover:text-white px-2 py-1 text-sm transition-colors"
              >Sign In</NuxtLink
            >
            <NuxtLink
              to="/register"
              class="bg-orange-500 hover:bg-orange-600 px-3 py-1.5 text-sm text-white rounded-md transition-colors"
              >Sign Up</NuxtLink
            >
          </div>
        </div>

        <!-- Mobile Menu Button -->
        <div class="md:hidden flex items-center ml-3">
          <button
            id="mobile-menu-button"
            @click="toggleMobileMenu"
            class="text-zinc-400 hover:text-white focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              :class="{ hidden: showMobileMenu, block: !showMobileMenu }"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              :class="{ block: showMobileMenu, hidden: !showMobileMenu }"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Nav -->
    <div
      v-if="showMobileMenu"
      id="mobile-menu"
      class="md:hidden bg-zinc-800 border-b border-zinc-700"
    >
      <div class="px-2 pt-2 pb-3 space-y-1">
        <NuxtLink
          to="/explore"
          class="block px-3 py-2 rounded-md text-base font-medium text-zinc-300 hover:text-white hover:bg-zinc-700 transition-colors"
          :class="{
            'bg-zinc-700 text-white': $route.path.includes('/explore'),
          }"
          @click="showMobileMenu = false"
          >Explore</NuxtLink
        >
        <NuxtLink
          to="/submit"
          class="block px-3 py-2 rounded-md text-base font-medium text-zinc-300 hover:text-white hover:bg-zinc-700 transition-colors"
          :class="{ 'bg-zinc-700 text-white': $route.path === '/submit' }"
          @click="showMobileMenu = false"
          >Submit</NuxtLink
        >
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";

const isAuthenticated = ref(false);
const userName = ref("");
const userId = ref("");
const showMobileMenu = ref(false);
const showUserMenu = ref(false);

const router = useRouter();

const userInitials = computed(() => {
  if (!userName.value) return "";
  const names = userName.value.split(" ");
  return names.length > 1
    ? (names[0][0] + names[1][0]).toUpperCase()
    : names[0][0].toUpperCase();
});

function checkAuthStatus() {
  if (process.client) {
    const token = localStorage.getItem("token");
    isAuthenticated.value = !!token;
    userName.value = localStorage.getItem("name") || "User";
    userId.value = localStorage.getItem("userId") || "";
  }
}

function logout() {
  if (process.client) {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    localStorage.removeItem("userId");
    isAuthenticated.value = false;
    userName.value = "";
    userId.value = "";
    showUserMenu.value = false;
    router.push("/");
  }
}

function toggleMobileMenu() {
  showMobileMenu.value = !showMobileMenu.value;
  if (showMobileMenu.value) showUserMenu.value = false;
}

function toggleUserMenu() {
  showUserMenu.value = !showUserMenu.value;
}

function handleClickOutside(event) {
  const userBtn = document.querySelector("#user-menu-button");
  const userMenu = document.querySelector("#user-menu");
  const mobileBtn = document.querySelector("#mobile-menu-button");
  const mobileMenu = document.querySelector("#mobile-menu");

  if (
    userMenu &&
    userBtn &&
    !userMenu.contains(event.target) &&
    !userBtn.contains(event.target)
  ) {
    showUserMenu.value = false;
  }
  if (
    mobileMenu &&
    mobileBtn &&
    !mobileMenu.contains(event.target) &&
    !mobileBtn.contains(event.target)
  ) {
    showMobileMenu.value = false;
  }
}

function handleStorageChange(event) {
  if (["token", "name", "userId"].includes(event.key)) {
    checkAuthStatus();
  }
}

onMounted(() => {
  checkAuthStatus();
  document.addEventListener("click", handleClickOutside);
  window.addEventListener("resize", () => {
    if (window.innerWidth >= 768) showMobileMenu.value = false;
  });
  window.addEventListener("storage", handleStorageChange);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
  window.removeEventListener("resize", () => {});
  window.removeEventListener("storage", handleStorageChange);
});
</script>
