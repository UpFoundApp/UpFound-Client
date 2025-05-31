<template>
  <div class="min-h-screen bg-zinc-900 text-white">
    <!-- Main content -->
    <main class="px-4 py-6 md:py-10">
      <div class="max-w-screen-xl mx-auto">
        <!-- Profile header -->
        <div class="mb-8 flex flex-col md:flex-row md:items-end gap-6">
          <div class="relative">
            <div
              class="w-24 h-24 md:w-32 md:h-32 rounded-full bg-zinc-800 border-4 border-zinc-700 overflow-hidden"
            >
              <img
                v-if="user.profilePicture"
                :src="user.profilePicture"
                :alt="user.name"
                class="w-full h-full object-cover"
              />
              <div
                v-else
                class="w-full h-full flex items-center justify-center text-3xl md:text-4xl font-bold text-zinc-500"
              >
                {{ getUserInitials(user.name) }}
              </div>
            </div>
            <button
              class="absolute bottom-0 right-0 bg-zinc-700 hover:bg-zinc-600 p-1.5 rounded-full border border-zinc-600"
              title="Change profile picture"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </button>
          </div>

          <div class="flex-1">
            <h1 class="text-2xl md:text-3xl font-bold">{{ user.name }}</h1>
            <p class="text-zinc-400 mt-1">{{ user.bio || "No bio yet" }}</p>
            <div class="mt-3 flex items-center gap-4 text-sm text-zinc-400">
              <div class="flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <span>Joined {{ formatDate(user.joinedDate) }}</span>
              </div>
              <div class="flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
                <span>{{ user.location || "Location not specified" }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Activity tabs -->
        <div class="border-b border-zinc-800 mb-6">
          <div class="flex space-x-8">
            <button
              @click="activeTab = 'submissions'"
              class="px-1 py-4 text-sm font-medium relative"
              :class="
                activeTab === 'submissions'
                  ? 'text-white'
                  : 'text-zinc-400 hover:text-zinc-300'
              "
            >
              Submissions
              <span
                v-if="activeTab === 'submissions'"
                class="absolute bottom-0 left-0 w-full h-0.5 bg-orange-500"
                style="transform-origin: left center"
                :style="{
                  transform: 'scaleX(1)',
                  transition: 'transform 0.2s ease',
                }"
              ></span>
            </button>
            <button
              @click="activeTab = 'upvoted'"
              class="px-1 py-4 text-sm font-medium relative"
              :class="
                activeTab === 'upvoted'
                  ? 'text-white'
                  : 'text-zinc-400 hover:text-zinc-300'
              "
            >
              Upvoted Products
              <span
                v-if="activeTab === 'upvoted'"
                class="absolute bottom-0 left-0 w-full h-0.5 bg-orange-500"
                style="transform-origin: left center"
                :style="{
                  transform: 'scaleX(1)',
                  transition: 'transform 0.2s ease',
                }"
              ></span>
            </button>
          </div>
        </div>

        <!-- Loading skeleton -->
        <div v-if="isLoading" class="space-y-6">
          <div
            v-for="i in 3"
            :key="i"
            class="bg-zinc-800 animate-pulse rounded-xl p-4"
          >
            <div class="flex items-center gap-4">
              <div class="w-16 h-16 bg-zinc-700 rounded-xl"></div>
              <div class="flex-1">
                <div class="h-5 bg-zinc-700 rounded w-1/3 mb-2"></div>
                <div class="h-4 bg-zinc-700 rounded w-2/3"></div>
              </div>
              <div class="h-8 w-16 bg-zinc-700 rounded-md"></div>
            </div>
          </div>
        </div>

        <!-- Error state -->
        <div
          v-else-if="error"
          class="flex flex-col items-center justify-center py-12 text-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-12 w-12 text-zinc-500 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <h3 class="text-lg font-medium mb-2">Failed to load data</h3>
          <p class="text-zinc-400 mb-4">{{ error }}</p>
          <button
            @click="loadData"
            class="bg-zinc-800 hover:bg-zinc-700 px-4 py-2 rounded-md text-sm"
          >
            Try Again
          </button>
        </div>

        <!-- Empty state -->
        <template v-else-if="activeItems.length === 0">
          <div
            class="flex flex-col items-center justify-center py-12 text-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-12 w-12 text-zinc-500 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
              />
            </svg>
            <h3 class="text-lg font-medium mb-2">
              {{
                activeTab === "submissions"
                  ? "No submissions yet"
                  : "No upvoted products"
              }}
            </h3>
            <p class="text-zinc-400 mb-4">
              {{
                activeTab === "submissions"
                  ? "Share your amazing products with the community."
                  : "Discover and upvote products you love."
              }}
            </p>
            <button
              class="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md text-sm"
              v-if="activeTab === 'submissions'"
            >
              Submit a Product
            </button>
            <button
              class="bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-2 rounded-md text-sm"
              v-else
            >
              Explore Products
            </button>
          </div>
        </template>

        <!-- Products grid -->
        <TransitionGroup
          v-else
          tag="div"
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          name="products-list"
        >
          <div
            v-for="product in visibleItems"
            :key="product.id"
            class="bg-zinc-800 border border-zinc-700 rounded-xl overflow-hidden hover:border-zinc-600 transition cursor-pointer"
          >
            <div class="p-4">
              <div class="flex items-center gap-3 mb-3">
                <img
                  :src="product.logo || '/placeholder-logo.png'"
                  :alt="product.name"
                  class="w-12 h-12 rounded-xl object-cover bg-zinc-700 border border-zinc-600"
                />
                <div class="min-w-0">
                  <h3
                    class="font-medium text-white group-hover:text-orange-500 transition truncate"
                  >
                    {{ product.name }}
                  </h3>
                  <p class="text-sm text-zinc-400 truncate">
                    {{ product.tagline }}
                  </p>
                </div>
              </div>

              <div class="flex justify-between items-center">
                <div class="flex items-center">
                  <span
                    class="bg-zinc-700/50 text-xs py-0.5 px-2 rounded-md text-zinc-300"
                  >
                    {{ product.category }}
                  </span>
                </div>

                <div
                  class="flex items-center gap-1 bg-zinc-700/50 py-1 px-2 rounded-md"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-3.5 w-3.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 15l7-7 7 7"
                    />
                  </svg>
                  <span class="text-sm font-medium">{{ product.upvotes }}</span>
                </div>
              </div>
            </div>

            <div
              class="border-t border-zinc-700 px-4 py-3 flex justify-between items-center"
            >
              <div class="flex items-center gap-2 text-xs text-zinc-400">
                <span>{{ formatDate(product.datePublished) }}</span>
              </div>

              <button
                @click.stop="toggleUpvote(product)"
                class="flex items-center gap-1 px-3 py-1 rounded-md text-sm"
                :class="
                  product.hasUpvoted
                    ? 'bg-orange-500/20 text-orange-500'
                    : 'bg-zinc-700 hover:bg-zinc-600 text-zinc-300'
                "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4"
                  :fill="product.hasUpvoted ? 'currentColor' : 'none'"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 15l7-7 7 7"
                  />
                </svg>
                <span>{{ product.hasUpvoted ? "Upvoted" : "Upvote" }}</span>
              </button>
            </div>
          </div>
        </TransitionGroup>

        <!-- Infinite scrolling trigger and loading indicator -->
        <!-- Replace the infinite scrolling trigger and loading indicator with a Load More button -->
        <div
          v-if="canLoadMore && !isLoading && activeItems.length > 0"
          class="mt-4 py-8 flex justify-center"
        >
          <button
            @click="loadMoreItems"
            class="bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-300 hover:text-white py-2 px-2 rounded-md text-sm flex items-center justify-center gap-2 transition-all w-fit"
          >
            <span>Load More</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4"
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
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch, nextTick } from "vue";

// User data
const user = ref({
  id: 1,
  name: "Alexandra Chen",
  username: "alexchen",
  profilePicture: null, // Set to null to show initials
  bio: "Product designer and developer. Building useful tools for creators.",
  location: "San Francisco, CA",
  joinedDate: "2023-03-15",
});

// Tab state
const activeTab = ref("submissions");

// Data loading state
const isLoading = ref(true);
const error = ref(null);
const submissions = ref([]);
const upvotedProducts = ref([]);
const page = ref(1);
const canLoadMore = ref(true);

// Virtual scroll implementation
const visibleItems = ref([]);
const loadMoreTrigger = ref(null);
const itemsPerPage = 6;

// Computed property to get active items based on current tab
const activeItems = computed(() => {
  return activeTab.value === "submissions"
    ? submissions.value
    : upvotedProducts.value;
});

// Initial data loading
onMounted(async () => {
  await loadData();

  // Setup intersection observer for infinite scroll
  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting && canLoadMore.value && !isLoading.value) {
        loadMoreItems();
      }
    },
    { threshold: 0.1 }
  );

  if (loadMoreTrigger.value) {
    observer.observe(loadMoreTrigger.value);
  }
});

// Watch for tab changes and reset pagination
watch(activeTab, async () => {
  page.value = 1;
  visibleItems.value = activeItems.value.slice(0, itemsPerPage);
  canLoadMore.value = activeItems.value.length > itemsPerPage;

  // Scroll to top when tab changes
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Format date helper
function formatDate(dateString) {
  if (!dateString) return "";
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

// Get user initials for avatar
function getUserInitials(name) {
  if (!name) return "";
  return name
    .split(" ")
    .map((part) => part.charAt(0))
    .join("")
    .toUpperCase()
    .substring(0, 2);
}

// Toggle upvote on a product
function toggleUpvote(product) {
  product.hasUpvoted = !product.hasUpvoted;
  product.upvotes += product.hasUpvoted ? 1 : -1;
}

// Load more items on scroll
async function loadMoreItems() {
  if (isLoading.value) return; // Prevent multiple clicks
  
  isLoading.value = true;
  
  try {
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
    
    page.value++;
    const startIndex = visibleItems.value.length;
    const endIndex = startIndex + itemsPerPage;
    const newItems = activeItems.value.slice(startIndex, endIndex);
    
    // Animation delay between items
    for (let i = 0; i < newItems.length; i++) {
      visibleItems.value.push(newItems[i]);
      if (i < newItems.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 100));
      }
    }
    
    canLoadMore.value = endIndex < activeItems.value.length;
  } catch (err) {
    error.value = 'Failed to load more items. Please try again.';
  } finally {
    isLoading.value = false;
  }
}

// Load initial data
async function loadData() {
  isLoading.value = true;
  error.value = null;

  try {
    // Simulate API call with a delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Mock data for submissions
    submissions.value = Array.from({ length: 15 }, (_, i) => ({
      id: `submission-${i + 1}`,
      name: `Project ${String.fromCharCode(65 + (i % 26))}`,
      tagline: `A ${
        ["revolutionary", "game-changing", "innovative", "powerful", "modern"][
          i % 5
        ]
      } tool for ${
        ["designers", "developers", "marketers", "creators", "businesses"][
          i % 5
        ]
      }`,
      logo: `/placeholder-logo${(i % 5) + 1}.png`,
      category: ["AI", "SaaS", "Design", "Productivity", "Marketing"][i % 5],
      upvotes: Math.floor(Math.random() * 200) + 10,
      datePublished: new Date(
        Date.now() - Math.floor(Math.random() * 10000000000)
      ).toISOString(),
      hasUpvoted: Math.random() > 0.5,
    }));

    // Mock data for upvoted products
    upvotedProducts.value = Array.from({ length: 22 }, (_, i) => ({
      id: `upvoted-${i + 1}`,
      name: `Tool ${String.fromCharCode(65 + (i % 26))}`,
      tagline: `${
        ["Automate", "Simplify", "Enhance", "Optimize", "Streamline"][i % 5]
      } your ${
        [
          "workflow",
          "productivity",
          "design process",
          "development",
          "marketing",
        ][i % 5]
      }`,
      logo: `/placeholder-logo${(i % 5) + 1}.png`,
      category: ["DevTools", "Analytics", "E-commerce", "AI", "Finance"][i % 5],
      upvotes: Math.floor(Math.random() * 200) + 50,
      datePublished: new Date(
        Date.now() - Math.floor(Math.random() * 20000000000)
      ).toISOString(),
      hasUpvoted: true,
    }));

    // Initialize visible items with first batch
    visibleItems.value = activeItems.value.slice(0, itemsPerPage);
    canLoadMore.value = activeItems.value.length > itemsPerPage;
  } catch (err) {
    error.value = "Failed to load your profile data. Please try again.";
  } finally {
    isLoading.value = false;
  }
}
</script>

<style scoped>
/* Transition effects for list items */
.products-list-enter-active,
.products-list-leave-active {
  transition: all 0.3s ease;
}

.products-list-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.products-list-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}

/* Staggered enter animation */
.products-list-enter-active {
  transition-delay: calc(0.05s * var(--i));
}

/* Add product card hover effect */
.product-card {
  transition: transform 0.2s ease, border-color 0.2s ease;
}

.product-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}
</style>
