<template>
  <div v-if="!error" class="min-h-screen bg-zinc-900 text-white">
    <div v-if="isLoading" class="flex justify-center items-center h-[60vh]">
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
        <p class="text-zinc-400">Loading product details...</p>
      </div>
    </div>

    <div v-else-if="error" class="flex justify-center items-center h-[60vh]">
      <div class="text-center">
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
        <h3 class="text-lg font-medium text-zinc-400 mb-2">{{ error }}</h3>
        <button
          @click="fetchProduct"
          class="text-orange-500 hover:text-orange-400"
        >
          Try again
        </button>
      </div>
    </div>

    <template v-else>
      <div
        v-if="selectedImage"
        class="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
        @click.self="selectedImage = null"
      >
        <div
          class="max-w-4xl w-full bg-zinc-900 border border-zinc-700 rounded-lg overflow-hidden"
        >
          <div
            class="flex items-center justify-between p-4 border-b border-zinc-700"
          >
            <h3 class="text-lg font-medium">Image Preview</h3>
            <button
              @click="selectedImage = null"
              class="p-1 hover:bg-zinc-700 rounded-full"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
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
          <div class="p-4">
            <img
              :src="selectedImage"
              alt="Product image"
              class="w-full h-auto max-h-[80vh] object-contain rounded"
            />
          </div>
        </div>
      </div>

      <main class="px-4 py-6">
        <div class="max-w-screen-xl mx-auto">
          <div
            class="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6"
          >
            <div class="flex items-start gap-4">
              <img
                :src="product.logo"
                alt="Logo"
                class="w-16 h-16 rounded-xl object-cover border border-zinc-700 bg-zinc-800"
              />
              <div>
                <h1 class="text-2xl font-bold">{{ product.name }}</h1>
                <p class="text-zinc-400 mt-1">{{ product.tagline }}</p>
              </div>
            </div>
            <div class="flex items-center gap-3">
              <span
                :title="`${upvotes} upvotes`"
                class="mx-4 text-2xl font-semibold inline-flex items-center gap-2"
              >
                <Triangle /> {{ upvotes }}
              </span>
              <a
                :href="product.website"
                target="_blank"
                class="flex items-center gap-2 border border-zinc-600 bg-zinc-800 hover:bg-zinc-700 px-4 py-2 rounded-md"
              >
                <span class="font-medium">Visit Website</span>
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
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
            </div>
          </div>

          <div class="flex flex-wrap gap-2 mb-6">
            <span
              v-for="cat in product.categories"
              :key="cat"
              class="text-sm px-3 py-1 bg-zinc-800 text-zinc-300 rounded-full"
            >
              {{ cat }}
            </span>
          </div>

          <div class="mb-8">
            <div
              v-if="product.images && product.images.length === 1"
              class="cursor-pointer"
              @click="openImageModal(product.images[0])"
            >
              <img
                :src="product.images[0]"
                alt="Product image"
                class="w-full h-[400px] object-cover bg-zinc-800 border border-zinc-700 rounded-md hover:opacity-90 transition-opacity"
              />
            </div>

            <div
              v-else-if="product.images && product.images.length > 1"
              class="relative"
            >
              <div
                class="mb-3 cursor-pointer"
                @click="openImageModal(product.images[0])"
              >
                <img
                  :src="product.images[0]"
                  alt="Product main image"
                  class="w-full h-[350px] object-cover bg-zinc-800 border border-zinc-700 rounded-md hover:opacity-90 transition-opacity"
                />
              </div>

              <div class="relative">
                <div
                  class="absolute left-0 top-0 bottom-0 w-12 z-10 bg-gradient-to-r from-zinc-900 to-transparent pointer-events-none"
                ></div>

                <div
                  class="overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory flex gap-3"
                >
                  <div
                    v-for="(image, index) in product.images.slice(1)"
                    :key="index"
                    class="flex-none w-[200px] h-[120px] cursor-pointer snap-start relative overflow-hidden"
                    @click="openImageModal(image)"
                  >
                    <img
                      :src="image"
                      :alt="`Product image ${index + 2}`"
                      class="w-full h-full object-cover bg-zinc-800 border border-zinc-700 rounded-md hover:opacity-90 transition-opacity"
                    />

                    <div
                      v-if="
                        index === product.images.length - 2 &&
                        product.images.length > 5
                      "
                      class="absolute inset-0 bg-black/70 flex items-center justify-center rounded-md"
                    >
                      <p class="text-base font-medium text-white">
                        All Images ({{ product.images.length }})
                      </p>
                    </div>
                  </div>
                </div>

                <div
                  class="absolute right-0 top-0 bottom-0 w-12 z-10 bg-gradient-to-l from-zinc-900 to-transparent pointer-events-none"
                ></div>
              </div>
            </div>

            <div
              v-else
              class="w-full h-[400px] bg-zinc-800 border border-zinc-700 rounded-md flex items-center justify-center"
            >
              <p class="text-zinc-500">No images available</p>
            </div>
          </div>

          <div class="border-b border-zinc-800 mb-8">
            <nav class="flex space-x-8">
              <button
                class="border-b-2 border-orange-500 px-1 py-4 text-sm font-medium"
              >
                Description
              </button>
            </nav>
          </div>

          <div class="max-w-3xl mb-8">
            <p class="mb-4 text-zinc-300">{{ product.description }}</p>
          </div>

          <div class="">
            <div
              class="py-4 border-t border-zinc-800 flex items-center justify-start gap-3"
            >
              <span class="text-sm text-zinc-400">Submitted By</span>
              <NuxtLink
                :to="`/profile/${product.submittedBy?.userId || ''}`"
                class="group inline-block relative cursor-pointer"
              >
                <p
                  class="font-semibold text-lg hover:text-orange-400 transition-colors duration-300"
                >
                  {{ product.submittedBy?.name || "Unknown User" }}
                </p>
                <span
                  class="block absolute bottom-0 left-0 w-0 h-0.5 bg-orange-500 transition-all duration-300 ease-out group-hover:w-full origin-left"
                ></span>
              </NuxtLink>
            </div>
          </div>

          <div class="max-w-3xl mb-8">
            <div class="border-t border-zinc-800 pt-6">
              <div class="flex items-center justify-between mb-6">
                <div class="flex items-center gap-4">
                  <span class="flex items-center gap-2">
                    <button
                      @click="toggleUpvote"
                      class="flex items-center gap-1.5 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-md font-medium"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-4 w-4"
                        :fill="hasUpvoted ? 'currentColor' : 'none'"
                        :stroke="hasUpvoted ? 'transparent' : 'currentColor'"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M5 15l7-7 7 7"
                        />
                      </svg>
                      {{ hasUpvoted ? "Upvoted" : "Upvote" }}
                      <span class="font-bold">• {{ upvotes }}</span>
                    </button>
                  </span>
                </div>
                <div class="text-sm text-zinc-400">
                  {{ totalComments }}
                  {{ totalComments === 1 ? "Comment" : "Comments" }}
                </div>
              </div>

              <div class="flex gap-3 mb-6">
                <div
                  class="w-10 h-10 rounded-full bg-zinc-700 flex-shrink-0 flex items-center justify-center"
                >
                  <span class="text-sm font-medium">
                    <template v-if="isLoggedIn">{{ userInitial }}</template>
                    <VenetianMask v-else class="h-5 w-5" />
                  </span>
                </div>
                <div class="flex-1">
                  <textarea
                    v-model="newComment"
                    rows="3"
                    placeholder="What do you think?..."
                    :disabled="isSubmittingComment"
                    class="w-full p-3 border border-zinc-700 bg-zinc-800 text-white rounded-md focus:ring-1 focus:ring-zinc-500 focus:outline-none resize-none placeholder-zinc-500"
                  ></textarea>
                  <div class="flex justify-end mt-2">
                    <button
                      @click="submitComment"
                      :disabled="isSubmittingComment || !newComment.trim()"
                      :class="[
                        isLoggedIn
                          ? 'bg-orange-500 hover:bg-orange-600 text-white'
                          : 'bg-zinc-700 hover:bg-zinc-600 text-zinc-200',
                        (isSubmittingComment || !newComment.trim()) &&
                          'opacity-70 cursor-not-allowed',
                      ]"
                      class="px-4 py-1.5 rounded-md text-sm font-medium transition-colors flex items-center gap-2"
                    >
                      <svg
                        v-if="isSubmittingComment"
                        class="animate-spin h-4 w-4"
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
                      {{ isLoggedIn ? "Comment" : "Login to comment" }}
                    </button>
                  </div>
                </div>
              </div>

              <div
                v-if="isLoadingComments && !allComments.length"
                class="flex justify-center py-8"
              >
                <div class="flex flex-col items-center">
                  <svg
                    class="animate-spin h-8 w-8 text-orange-500 mb-3"
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
                  <p class="text-zinc-400">Loading comments...</p>
                </div>
              </div>

              <div v-else-if="commentsError" class="text-center py-6">
                <p class="text-zinc-400 mb-2">{{ commentsError }}</p>
                <button
                  @click="fetchComments()"
                  class="text-orange-500 hover:text-orange-400"
                >
                  Try again
                </button>
              </div>

              <div v-else-if="allComments.length > 0" class="space-y-6">
                <div
                  v-for="comment in visibleComments"
                  :key="comment._id"
                  class="flex gap-3"
                >
                  <div
                    class="w-10 h-10 rounded-full bg-zinc-700 flex-shrink-0 flex items-center justify-center"
                  >
                    <span class="text-sm font-medium">{{
                      comment.user.charAt(0)
                    }}</span>
                  </div>
                  <div class="flex-1">
                    <div class="flex items-center gap-2">
                      <span class="font-medium">{{ comment.user }}</span>
                      <span class="text-xs text-zinc-500"
                        >• {{ comment.timeAgo }}</span
                      >
                    </div>
                    <p class="text-zinc-300 mt-1">{{ comment.text }}</p>
                  </div>
                </div>

                <div v-if="isLoadingComments" class="flex justify-center py-4">
                  <svg
                    class="animate-spin h-6 w-6 text-orange-500"
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
                </div>

                <div
                  v-if="hasMoreComments && !isLoadingComments"
                  class="flex justify-center mt-6"
                >
                  <button
                    @click="loadMoreComments"
                    class="px-5 py-2 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 rounded-md text-sm font-medium transition-all"
                  >
                    Load More Comments
                  </button>
                </div>
              </div>

              <div
                v-else
                class="py-10 flex flex-col items-center justify-center text-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-12 w-12 text-zinc-600 mb-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
                <h3 class="text-lg font-medium text-zinc-400">
                  No Comments Available
                </h3>
                <p class="text-zinc-500 text-sm mt-1">
                  Be the first to share your thoughts!
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </template>
  </div>
  <div
    v-if="error"
    class="h-full w-full flex items-center justify-center flex-col"
  >
    <ShieldAlert class="mb-3" size="50" />
    <p class="text-lg">Couldn't find product you are looking for</p>
    <p class="text-sm text-zinc-500">
      Please check the URL or try again later.
    </p>
    <NuxtLink
      to="/"
      class="mt-4 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-md"
      >Go to Homepage</NuxtLink
    >
  </div>
</template>

<script setup>
import { Triangle, VenetianMask, ShieldAlert } from "lucide-vue-next";
import { ref, computed, onMounted, watch } from "vue";
import { toast } from "vue3-toastify";

const route = useRoute();
const runtimeConfig = useRuntimeConfig();
const baseUrl = runtimeConfig.public.apiUrl;

const product = ref({});
const isLoading = ref(true);
const error = ref(null);

const isLoggedIn = ref(false);
const userInitial = ref("A");
const token = ref("");

const selectedImage = ref(null);

function openImageModal(imageUrl) {
  selectedImage.value = imageUrl;
}

const upvotes = ref(0);
const hasUpvoted = ref(false);

const toggleUpvote = async () => {
  if (!isLoggedIn.value) {
    toast.error("Please login to upvote");
    return;
  }

  try {
    hasUpvoted.value = !hasUpvoted.value;
    upvotes.value += hasUpvoted.value ? 1 : -1;

    const response = await fetch(
      `${baseUrl}/products/${product.value._id}/upvote`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.value}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to update upvote: ${response.status}`);
    }
  } catch (err) {
    hasUpvoted.value = !hasUpvoted.value;
    upvotes.value += hasUpvoted.value ? 1 : -1;
    toast.error("Failed to update upvote. Please try again.");
  }
};

const allComments = ref([]);
const isLoadingComments = ref(false);
const commentsError = ref(null);
const commentsTotal = ref(0);

const commentsLimit = 5;
const commentsOffset = ref(0);

const totalComments = computed(() => commentsTotal.value);

const visibleComments = computed(() => allComments.value);

const hasMoreComments = computed(() => {
  return allComments.value.length < commentsTotal.value;
});

async function loadMoreComments() {
  if (isLoadingComments.value) return;

  commentsOffset.value += commentsLimit;
  await fetchComments(true);
}

async function fetchComments(append = false) {
  isLoadingComments.value = true;
  commentsError.value = null;

  try {
    const params = new URLSearchParams();
    params.append("limit", commentsLimit);
    params.append("offset", commentsOffset.value);

    const response = await fetch(
      `${baseUrl}/products/${product.value._id}/comments?${params.toString()}`
    );

    if (!response.ok) {
      throw new Error(`Error fetching comments: ${response.status}`);
    }

    const data = await response.json();
    const mappedComments = data.comments.map((comment) => ({
      _id: comment._id,
      user: comment.author.name,
      author: comment.author,
      text: comment.content,
      content: comment.content,
      timeAgo: formatRelativeTime(comment.createdAt),
      createdAt: comment.createdAt,
    }));

    if (append) {
      allComments.value = [...allComments.value, ...mappedComments];
    } else {
      allComments.value = mappedComments;
    }

    commentsTotal.value = data.total;
  } catch (err) {
    console.error("Failed to fetch comments:", err);
    commentsError.value = "Failed to load comments. Please try again.";
  } finally {
    isLoadingComments.value = false;
  }
}

const newComment = ref("");
const isSubmittingComment = ref(false);

async function submitComment() {
  if (!isLoggedIn.value) {
    toast.error("Please login to comment");
    return;
  }

  if (!newComment.value.trim() || isSubmittingComment.value) return;

  try {
    isSubmittingComment.value = true;
    const response = await fetch(
      `${baseUrl}/products/${product.value._id}/comment`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.value}`,
        },
        body: JSON.stringify({
          content: newComment.value.trim(),
          authorId: localStorage.getItem("userId") || "",
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Error posting comment: ${response.status}`);
    }

    commentsOffset.value = 0;
    await fetchComments(false);

    newComment.value = "";
  } catch (err) {
    console.error("Failed to submit comment:", err);
    toast.error("Failed to submit your comment. Please try again.");
  } finally {
    isSubmittingComment.value = false;
  }
}
const fetchProduct = async () => {
  isLoading.value = true;
  error.value = null;

  try {
    const response = await fetch(`${baseUrl}/products/${route.params.slug}`, {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        response.status === 404
          ? "Product not found"
          : `Error ${response.status}: ${errorText || "Failed to load product"}`
      );
    }

    const data = await response.json();

    product.value = {
      ...data,
      categories: data.category ? [data.category] : [],
      images: data.medias || [],
    };

    upvotes.value = data.upvotes || 0;
    hasUpvoted.value = data.isUpvoted || false;

    allComments.value = [];
    commentsOffset.value = 0;
    commentsTotal.value = data.comments || 0;

    if (data._id) {
      await fetchComments();
    }
  } catch (err) {
    console.error("Error fetching product:", err);
    error.value =
      err.message || "Failed to load product details. Please try again.";
  } finally {
    isLoading.value = false;
  }
};

function formatRelativeTime(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now - date);
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
    if (diffHours === 0) {
      const diffMinutes = Math.floor(diffTime / (1000 * 60));
      return diffMinutes === 0 ? "Just now" : `${diffMinutes}m ago`;
    }
    return `${diffHours}h ago`;
  } else if (diffDays === 1) {
    return "Yesterday";
  } else if (diffDays < 7) {
    return `${diffDays}d ago`;
  } else {
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  }
}

const checkLoggedIn = () => {
  if (process.client) {
    const storedToken = localStorage.getItem("token");
    const userName = localStorage.getItem("name");

    token.value = storedToken || "";
    isLoggedIn.value = !!storedToken;
    userInitial.value = userName ? userName.charAt(0) : "A";
  }
};

watch(
  () => route.params.slug,
  (newSlug, oldSlug) => {
    if (newSlug !== oldSlug) {
      fetchProduct();
    }
  }
);

onMounted(() => {
  checkLoggedIn();
  fetchProduct();
});
</script>

<style scoped>
.animated-underline {
  position: relative;
  display: inline-block;
  cursor: pointer;
}

.animated-underline::after {
  content: "";
  position: absolute;
  width: 100%;
  transform: scaleX(0);
  height: 2px;
  bottom: -2px;
  left: 0;
  background-color: rgb(249, 115, 22); /* orange-500 */
  transform-origin: bottom right;
  transition: transform 0.3s ease-out;
}

.animated-underline:hover::after {
  transform: scaleX(1);
  transform-origin: bottom left;
}

/* Image hover effect */
.image-gallery img {
  transition: transform 0.3s ease;
}

.image-gallery img:hover {
  transform: scale(1.02);
}

/* Modal transition */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>
