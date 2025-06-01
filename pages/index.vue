<template>
  <div class="min-h-screen bg-zinc-900 text-white">
    <!-- Main content -->
    <main class="px-4 py-6 md:py-10">
      <div class="max-w-screen-xl mx-auto">
        <!-- Hero section -->
        <div class="mb-8">
          <h1 class="text-3xl md:text-4xl font-bold mb-2">
            Discover the best new products
          </h1>
          <p class="text-zinc-400">
            Every day, thousands of people discover new products on Product Hunt
          </p>
        </div>

        <!-- Category filters -->
        <div class="flex justify-between items-center flex-wrap gap-4 mb-6">
          <div class="flex flex-wrap gap-2">
            <button
              v-for="category in categories"
              :key="category"
              :class="[
                'px-3 py-1 text-sm rounded-md transition',
                selectedCategory === category
                  ? 'bg-orange-500 text-white'
                  : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700',
              ]"
              @click="selectCategory(category)"
            >
              {{ category }}
            </button>
          </div>

          <div class="flex items-center gap-2">
            <span class="text-sm text-zinc-400">Sort by:</span>
            <select
              v-model="sortOption"
              @change="handleSort"
              class="bg-zinc-800 text-zinc-300 border border-zinc-700 rounded-md py-1 px-2 text-sm focus:outline-none focus:ring-1 focus:ring-zinc-600"
            >
              <option value="trending">Trending</option>
              <option value="latest">Latest</option>
            </select>
          </div>
        </div>

        <!-- Loading state -->
        <div
          v-if="isLoading && !products.length"
          class="py-12 flex justify-center"
        >
          <div class="flex flex-col items-center">
            <svg
              class="animate-spin h-10 w-10 text-orange-500 mb-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <p class="text-zinc-400">Loading products...</p>
          </div>
        </div>

        <!-- Products grid -->
        <div
          v-else
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <NuxtLink
            v-for="product in products"
            :key="product._id"
            :to="`/product/${product._id}`"
            class="bg-zinc-800 border border-zinc-700 rounded-xl overflow-hidden hover:border-zinc-600 transition cursor-pointer group"
            @click.stop
          >
            <div class="p-4">
              <div class="flex items-center gap-3 mb-3">
                <img
                  :src="product.logo"
                  :alt="product.name + ' logo'"
                  class="w-12 h-12 rounded-xl object-cover bg-zinc-700"
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
                  <div class="ml-3 flex items-center gap-1 text-zinc-400">
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
                        d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                      />
                    </svg>
                    <span class="text-xs">{{ product.comments }}</span>
                  </div>
                </div>

                <div
                  class="flex items-center gap-1 bg-zinc-700/50 py-1 px-2 rounded-md"
                >
                  <span class="font-medium text-sm">{{ product.upvotes }}</span>
                </div>
              </div>
            </div>

            <div
              class="border-t border-zinc-700 px-4 py-3 flex justify-between items-center"
            >
              <span class="text-xs text-zinc-400">
                {{ formatDate(product.createdAt) }}
              </span>
            </div>
          </NuxtLink>
        </div>

        <!-- Empty state -->
        <div
          v-if="!isLoading && products.length === 0"
          class="py-16 flex flex-col items-center justify-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-16 w-16 text-zinc-700 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
            />
          </svg>
          <h3 class="text-lg font-medium text-zinc-400">No products found</h3>
          <p class="text-zinc-500 mt-1">
            Try changing your filters or check back later
          </p>
        </div>

        <!-- Load more button -->
        <div
          v-if="
            !isLoading && products.length > 0 && products.length < totalCount
          "
          class="mt-8 flex justify-center"
        >
          <button
            @click="loadMore"
            :disabled="isLoadingMore"
            class="bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 rounded-md px-6 py-2 text-sm flex items-center gap-2 transition-all"
          >
            <svg
              v-if="isLoadingMore"
              class="animate-spin h-4 w-4 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <span>{{ isLoadingMore ? "Loading..." : "Load More" }}</span>
          </button>
        </div>

        <!-- All products loaded message -->
        <div
          v-else-if="products.length >= totalCount && products.length > 0"
          class="mt-8 text-center text-zinc-400 text-sm"
        >
          All products loaded
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
const runtimeConfig = useRuntimeConfig()
const baseUrl = runtimeConfig.public.apiUrl;

// Categories and sorting options
const categories = [
  "All",
  "AI",
  "SaaS",
  "Devtool",
  "Design",
  "Productivity",
  "E-commerce",
];
const selectedCategory = ref("All");
const sortOption = ref("trending");

// Pagination and loading state
const page = ref(1);
const limit = ref(6);
const isLoading = ref(true);
const isLoadingMore = ref(false);
const products = ref([]);
const totalCount = ref(0);

// Initial data fetch
onMounted(() => {
  fetchProducts();
});

// Fetch products function
async function fetchProducts(isLoadMore = false) {
  if (isLoadMore) {
    isLoadingMore.value = true;
  } else {
    isLoading.value = true;
    page.value = 1;
    products.value = []; // Reset products when filtering/sorting
  }

  try {
    // Build query parameters
    const params = new URLSearchParams();
    params.append("page", page.value);
    params.append("limit", limit.value);
    params.append("sort", sortOption.value);

    if (selectedCategory.value !== "All") {
      params.append("category", selectedCategory.value);
    }

    // Fetch data from API
    const response = await fetch(`${baseUrl}/products?${params.toString()}`);
    const data = await response.json();

    // Add client-side properties to each product
    const processedProducts = data.products.map((product) => ({
      ...product,
      hasUpvoted: false, // Add client-side state
    }));

    if (isLoadMore) {
      // Append new products
      products.value = [...products.value, ...processedProducts];
    } else {
      // Replace products
      products.value = processedProducts;
    }

    totalCount.value = data.totalCount;
  } catch (error) {
    console.error("Failed to fetch products:", error);
  } finally {
    isLoading.value = false;
    isLoadingMore.value = false;
  }
}

// Handle category selection
function selectCategory(category) {
  if (selectedCategory.value !== category) {
    selectedCategory.value = category;
    fetchProducts();
  }
}

// Handle sort change
function handleSort() {
  fetchProducts();
}

// Load more products
function loadMore() {
  if (products.value.length < totalCount.value) {
    page.value++;
    fetchProducts(true);
  }
}

// Toggle upvote (this would typically make an API call)
async function toggleUpvote(product) {
  try {
    product.hasUpvoted = !product.hasUpvoted;
    product.upvotes += product.hasUpvoted ? 1 : -1;

    // In a real app, you'd make an API call here
    // await fetch(`/api/products/${product._id}/upvote`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ upvote: product.hasUpvoted })
    // });
  } catch (error) {
    // Revert on failure
    product.hasUpvoted = !product.hasUpvoted;
    product.upvotes += product.hasUpvoted ? 1 : -1;
    console.error("Failed to update upvote:", error);
  }
}

// Format date helper
function formatDate(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now - date);
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    return "Today";
  } else if (diffDays === 1) {
    return "Yesterday";
  } else if (diffDays < 7) {
    return `${diffDays}d ago`;
  } else {
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  }
}
</script>

<style scoped>
/* Add shadow to product cards on hover for a subtle elevation effect */
.group:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  transform: translateY(-2px);
  transition: all 0.2s ease;
}

/* Smooth transitions */
.group {
  transition: all 0.2s ease;
}

/* Prevent text selection on buttons */
button {
  user-select: none;
}

/* Loading animation */
.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
