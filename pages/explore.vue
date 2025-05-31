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
              @click="selectedCategory = category"
            >
              {{ category }}
            </button>
          </div>

          <div class="flex items-center gap-2">
            <span class="text-sm text-zinc-400">Sort by:</span>
            <select
              v-model="sortOption"
              class="bg-zinc-800 text-zinc-300 border border-zinc-700 rounded-md py-1 px-2 text-sm focus:outline-none focus:ring-1 focus:ring-zinc-600"
            >
              <option>Trending</option>
              <option>Latest</option>
            </select>
          </div>
        </div>

        <!-- Products grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="product in filteredProducts"
            :key="product.id"
            class="bg-zinc-800 border border-zinc-700 rounded-xl overflow-hidden hover:border-zinc-600 transition cursor-pointer group"
          >
            <div class="p-4">
              <div class="flex items-center gap-3 mb-3">
                <img
                  :src="product.logo"
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
              <div class="flex items-center gap-2">
                <button
                  class="flex items-center gap-1 text-zinc-400 hover:text-orange-500"
                  @click.stop="toggleUpvote(product)"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4"
                    :fill="product.hasUpvoted ? 'currentColor' : 'none'"
                    :stroke="product.hasUpvoted ? 'none' : 'currentColor'"
                    :class="product.hasUpvoted ? 'text-orange-500' : ''"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 15l7-7 7 7"
                    />
                  </svg>
                  <span class="text-xs">Upvote</span>
                </button>
              </div>

              <button class="text-xs text-zinc-400 hover:text-zinc-200">
                View Details
              </button>
            </div>
          </div>
        </div>

        <!-- Load more button -->
        <div class="mt-8 flex justify-center">
          <button
            class="bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 rounded-md px-6 py-2 text-sm"
            @click="loadMore"
          >
            Load More
          </button>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

// Categories and sorting options
const categories = [
  "All",
  "AI",
  "SaaS",
  "Devtools",
  "Design",
  "Productivity",
  "E-commerce",
];
const selectedCategory = ref("All");
const sortOption = ref("Trending");

// Mock product data
const products = ref([
  {
    id: 1,
    name: "AICodeReview",
    productId: "aicode-review",
    datePublished: "2023-10-01",
    logo: "/placeholder-logo1.png",
    tagline: "AI-powered code review for better software",
    category: "AI",
    upvotes: 342,
    comments: 1,
    hasUpvoted: false,
  },
  {
    id: 2,
    name: "TaskFlow Pro",
    productId: "taskflow-pro",
    datePublished: "2023-09-15",
    logo: "/placeholder-logo2.png",
    tagline: "Project management reimagined for remote teams",
    category: "SaaS",
    upvotes: 287,
    comments: 0,
    hasUpvoted: false,
  },
  {
    id: 3,
    name: "DesignSync",
    productId: "designsync",
    datePublished: "2023-09-10",
    logo: "/placeholder-logo3.png",
    tagline: "Real-time design collaboration platform",
    category: "Design",
    upvotes: 203,
    comments: 0,
    hasUpvoted: false,
  },
  {
    id: 4,
    name: "DevConsole++",
    productId: "devconsole++",
    datePublished: "2023-09-05",
    logo: "/placeholder-logo4.png",
    tagline: "Enhanced developer console with superpowers",
    category: "Devtools",
    upvotes: 156,
    comments: 1,
    hasUpvoted: false,
  },
  {
    id: 5,
    name: "NoCodeCommerce",
    productId: "nocodecommerce",
    datePublished: "2023-08-30",
    logo: "/placeholder-logo5.png",
    tagline: "Launch your online store without writing code",
    category: "E-commerce",
    upvotes: 128,
    comments: 3,
    hasUpvoted: false,
  },
  {
    id: 6,
    name: "FocusTime",
    productId: "focustime",
    datePublished: "2023-08-25",
    logo: "/placeholder-logo6.png",
    tagline: "Productivity timer with team analytics",
    category: "Productivity",
    upvotes: 97,
    comments: 2,
    hasUpvoted: false,
  },
]);

// Upvote toggle logic
const toggleUpvote = (product) => {
  product.hasUpvoted = !product.hasUpvoted;
  product.upvotes += product.hasUpvoted ? 1 : -1;
};

// Computed: Filtered + Sorted products
const filteredProducts = computed(() => {
  let filtered =
    selectedCategory.value === "All"
      ? [...products.value]
      : products.value.filter((p) => p.category === selectedCategory.value);

  // Sorting
  switch (sortOption.value) {
    case "Trending":
      return filtered.sort((a, b) => b.upvotes - a.upvotes);
    case "New & Noteworthy":
      return filtered.sort((a, b) => b.id - a.id); // assuming 'id' implies newness
    case "Most Upvoted":
      return filtered.sort((a, b) => b.upvotes - a.upvotes);
    default:
      return filtered;
  }
});

// Placeholder for loading more products (simulate API call)
const loadMore = async () => {
  // Simulate API call
  console.log("Fetching more products...");
  // const res = await $fetch('/api/products?offset=6') // example
  // products.value.push(...res)
};
</script>
