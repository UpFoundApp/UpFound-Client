<template>
  <div class="min-h-screen bg-zinc-900 text-white">
    <!-- Main content -->
    <main class="px-4 py-6 md:py-10">
      <div class="max-w-screen-xl mx-auto">
        <!-- Loading state for user profile -->
        <div v-if="isLoadingUser" class="flex justify-center py-16">
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
            <p class="text-zinc-400">Loading profile...</p>
          </div>
        </div>

        <!-- User profile error state -->
        <div
          v-else-if="userError"
          class="flex flex-col items-center justify-center py-16 text-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-16 w-16 text-zinc-600 mx-auto mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <h3 class="text-lg font-medium mb-2">{{ userError }}</h3>
          <button
            @click="fetchUserProfile"
            class="text-orange-500 hover:text-orange-400 mt-2"
          >
            Try Again
          </button>
          <NuxtLink
            to="/"
            class="mt-6 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-md"
          >
            Go to Homepage
          </NuxtLink>
        </div>

        <template v-else>
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
                  <span>Joined {{ formatDate(user.createdAt) }}</span>
                </div>
                <div class="flex items-center gap-1" v-if="user.location">
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
                  <span>{{ user.location }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Activity tabs -->
          <div class="border-b border-zinc-800 mb-6">
            <div class="flex space-x-8">
              <button
                @click="switchTab('submissions')"
                class="px-1 py-4 text-sm font-medium relative"
                :class="
                  activeTab === 'submissions'
                    ? 'text-white'
                    : 'text-zinc-400 hover:text-zinc-300'
                "
              >
                Submissions ({{ user.totalSubmissions || 0 }})
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
                @click="switchTab('upvoted')"
                class="px-1 py-4 text-sm font-medium relative"
                :class="
                  activeTab === 'upvoted'
                    ? 'text-white'
                    : 'text-zinc-400 hover:text-zinc-300'
                "
              >
                Upvoted Products ({{ user.totalVotes || 0 }})
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

          <!-- Loading skeleton for products -->
          <div v-if="isLoadingProducts" class="space-y-6">
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

          <!-- Error state for products -->
          <div
            v-else-if="productsError"
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
            <p class="text-zinc-400 mb-4">{{ productsError }}</p>
            <button
              @click="fetchProductData"
              class="bg-zinc-800 hover:bg-zinc-700 px-4 py-2 rounded-md text-sm"
            >
              Try Again
            </button>
          </div>

          <!-- Empty state -->
          <div
            v-else-if="activeItems.length === 0"
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
          </div>

          <!-- Products grid -->
          <div
            v-else
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            <div
              v-for="product in displayedProducts"
              :key="product._id"
              class="bg-zinc-800 border border-zinc-700 rounded-xl overflow-hidden hover:border-zinc-600 transition cursor-pointer"
              @click="navigateToProduct(product._id)"
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
                    <span class="text-sm font-medium">{{
                      product.upvotes
                    }}</span>
                  </div>
                </div>
              </div>

              <div
                class="border-t border-zinc-700 px-4 py-3 flex justify-between items-center"
              >
                <div class="flex items-center gap-2 text-xs text-zinc-400">
                  <span>{{ formatDate(product.createdAt) }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Load More button -->
          <div
            v-if="canLoadMore && !isLoadingProducts && activeItems.length > 0"
            class="mt-8 py-4 flex justify-center"
          >
            <button
              @click="loadMoreItems"
              :disabled="isLoadingMore"
              class="bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-300 hover:text-white py-2 px-4 rounded-md text-sm flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <template v-if="isLoadingMore">
                <svg
                  class="animate-spin h-4 w-4 mr-1"
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
                Loading...
              </template>
              <template v-else>
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
              </template>
            </button>
          </div>
        </template>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import {toast} from "vue3-toastify";

const route = useRoute();
const router = useRouter();

// API URL
const runtimeConfig = useRuntimeConfig();
const baseUrl = runtimeConfig.public.apiUrl;

// Check if viewing own profile
const isCurrentUser = computed(() => {
  if (process.client) {
    const userId = localStorage.getItem("userId");
    return userId === route.params.userId;
  }
  return false;
});

// User data state
const user = ref({});
const isLoadingUser = ref(true);
const userError = ref(null);

// Tab state
const activeTab = ref("submissions");

// Products data state
const isLoadingProducts = ref(true);
const isLoadingMore = ref(false);
const productsError = ref(null);

// Pagination
const page = ref(1);
const ITEMS_PER_PAGE = 9;
const totalItems = ref(0);
const canLoadMore = computed(() => {
  return displayedProducts.value.length < totalItems.value;
});

const submissions = ref([]);
const upvotedProducts = ref([]);
const displayedProducts = ref([]);

// Authentication state
const token = ref("");

function navigateToProduct(productId) {
  router.push(`/product/${productId}`);
}

const activeItems = computed(() => {
  return activeTab.value === "submissions"
    ? submissions.value
    : upvotedProducts.value.map((item) => {
        if (item.product) {
          return {
            ...item.product,
            hasUpvoted: true,
          };
        }
        return item;
      });
});

function switchTab(tab) {
  activeTab.value = tab;
  page.value = 1;
  isLoadingProducts.value = true;
  displayedProducts.value = [];
  fetchProductData();
}

function formatDate(dateString) {
  if (!dateString) return "";
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

function getUserInitials(name) {
  if (!name) return "";
  return name
    .split(" ")
    .map((part) => part.charAt(0))
    .join("")
    .toUpperCase()
    .substring(0, 2);
}

async function toggleUpvote(product) {
  if (!token.value) {
    toast.error("Please login to upvote");
    return;
  }

  const isUpvoting = !product.hasUpvoted;
  product.hasUpvoted = isUpvoting;
  product.upvotes += isUpvoting ? 1 : -1;

  try {
    const response = await fetch(`${baseUrl}/products/${product._id}/upvote`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.value}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to update upvote");
    }

  } catch (err) {
    console.error("Toggle upvote error:", err);

    // Revert optimistic update
    product.hasUpvoted = !isUpvoting;
    product.upvotes += !isUpvoting ? 1 : -1;

    toast.error("Failed to update upvote. Please try again.");
  }
}

// Load more items
async function loadMoreItems() {
  if (isLoadingMore.value) return;

  isLoadingMore.value = true;
  page.value++;

  try {
    await fetchProductData(true);
  } catch (error) {
    page.value--;
    console.error("Error loading more items:", error);
    toast.error("Failed to load more items");
  } finally {
    isLoadingMore.value = false;
  }
}

// Fetch user profile data
async function fetchUserProfile() {
  isLoadingUser.value = true;
  userError.value = null;

  if (process.client) {
    token.value = localStorage.getItem("token") || "";
  }

  try {
    const headers = {};
    if (token.value) {
      headers.Authorization = `Bearer ${token.value}`;
    }

    const response = await fetch(`${baseUrl}/users/${route.params.userId}`, {
      headers,
    });

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("User not found");
      }
      throw new Error("Failed to load profile data");
    }

    const data = await response.json();
    user.value = {
      ...data,
      bio: data.bio || null,
      location: data.location || null,
      profilePicture: data.profilePicture || null,
      joinedDate: data.createdAt,
      totalSubmissions: data.totalSubmissions || 0,
      totalVotes: data.totalVotes || 0,
    };

    fetchProductData();
  } catch (err) {
    console.error("Error fetching user profile:", err);
    userError.value = err.message || "Failed to load user profile";
  } finally {
    isLoadingUser.value = false;
  }
}

// Fetch products data based on active tab
async function fetchProductData(append = false) {
  if (!append) {
    isLoadingProducts.value = true;
    productsError.value = null;
  }

  try {
    const endpoint =
      activeTab.value === "submissions"
        ? `${baseUrl}/users/submissions`
        : `${baseUrl}/users/votes`;

    const params = new URLSearchParams({
      userId: route.params.userId,
      page: page.value,
      limit: ITEMS_PER_PAGE,
    });

    const headers = {};
    if (token.value) {
      headers.Authorization = `Bearer ${token.value}`;
    }

    const response = await fetch(`${endpoint}?${params.toString()}`, {
      headers,
    });

    if (!response.ok) {
      throw new Error(`Failed to load ${activeTab.value} data`);
    }

    const data = await response.json();

    if (activeTab.value === "submissions") {
      totalItems.value = data.total;

      if (append) {
        submissions.value = [...submissions.value, ...data.submissions];
        displayedProducts.value = [
          ...displayedProducts.value,
          ...data.submissions,
        ];
      } else {
        submissions.value = data.submissions;
        displayedProducts.value = data.submissions;
      }
    } else {
      totalItems.value = data.total;

      const products = data.votedProducts.map((item) => ({
        ...item.product,
        hasUpvoted: true,
      }));

      if (append) {
        upvotedProducts.value = [
          ...upvotedProducts.value,
          ...data.votedProducts,
        ];
        displayedProducts.value = [...displayedProducts.value, ...products];
      } else {
        upvotedProducts.value = data.votedProducts;
        displayedProducts.value = products;
      }
    }
  } catch (err) {
    console.error(`Error fetching ${activeTab.value} data:`, err);
    productsError.value =
      err.message || `Failed to load ${activeTab.value} data`;
  } finally {
    if (!append) {
      isLoadingProducts.value = false;
    }
  }
}

function checkAuth() {
  if (process.client) {
    token.value = localStorage.getItem("token") || "";
  }
}

watch(
  () => route.params.userId,
  (newId) => {
    if (newId) {
      page.value = 1;
      fetchUserProfile();
    }
  }
);

// Initialize
onMounted(() => {
  checkAuth();
  fetchUserProfile();
});
</script>

<style scoped>
.product-card {
  transition: transform 0.2s ease, border-color 0.2s ease;
}

.product-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}
</style>
