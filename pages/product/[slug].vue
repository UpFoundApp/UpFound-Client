<template>
  <div class="min-h-screen bg-zinc-900 text-white">
    <!-- Main content -->
    <main class="px-4 py-6">
      <div class="max-w-screen-xl mx-auto">
        <!-- Logo, title and visit website -->
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
            <span class="text-2xl font-semibold">{{ upvotes }}</span>
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

        <!-- Categories -->
        <div class="flex flex-wrap gap-2 mb-6">
          <span
            v-for="cat in product.categories"
            :key="cat"
            class="text-sm px-3 py-1 bg-zinc-800 text-zinc-300 rounded-full"
          >
            {{ cat }}
          </span>
        </div>

        <!-- Main image gallery -->
        <div class="mb-8">
          <img
            src="https://placehold.co/600x400/2a2a2a/cccccc"
            alt="Main product image"
            class="w-full h-[400px] object-cover bg-zinc-800 border border-zinc-700 rounded-md"
          />
        </div>

        <!-- Tab navigation -->
        <div class="border-b border-zinc-800 mb-8">
          <nav class="flex space-x-8">
            <button
              class="border-b-2 border-orange-500 px-1 py-4 text-sm font-medium"
            >
              Overview
            </button>
            <button
              class="text-zinc-400 hover:text-zinc-300 px-1 py-4 text-sm font-medium"
            >
              Team
            </button>
            <button
              class="text-zinc-400 hover:text-zinc-300 px-1 py-4 text-sm font-medium"
            >
              Awards
            </button>
            <button
              class="text-zinc-400 hover:text-zinc-300 px-1 py-4 text-sm font-medium"
            >
              More
            </button>
          </nav>
        </div>

        <!-- Description -->
        <div class="max-w-3xl mb-8">
          <p class="mb-4 text-zinc-300">{{ product.description }}</p>
          <p class="mb-4 text-zinc-300">
            Our AI-powered logo generator creates professional logos in seconds.
            Choose from multiple styles, customize colors, and export
            high-resolution files ready for print or digital use.
          </p>
        </div>

        <!-- Product info -->
        <div class="mb-8">
          <div class="py-4 border-t border-zinc-800">
            <span class="text-sm text-zinc-400">Free Options</span>
          </div>

          <div class="py-4 border-t border-zinc-800">
            <div class="flex items-center gap-2 text-sm text-zinc-300">
              <span class="font-medium">Launch tags:</span>
              <div class="flex flex-wrap gap-2">
                <span class="px-2 py-1 bg-zinc-800 rounded-md">AI</span>
                <span class="px-2 py-1 bg-zinc-800 rounded-md">Design</span>
                <span class="px-2 py-1 bg-zinc-800 rounded-md"
                  >Productivity</span
                >
              </div>
            </div>
          </div>

          <div class="py-4 border-t border-zinc-800">
            <div class="flex items-center gap-2">
              <span class="text-sm font-medium">Launch Team</span>
              <div class="flex -space-x-2">
                <div
                  class="w-8 h-8 rounded-full bg-zinc-700 border-2 border-zinc-900 flex items-center justify-center text-xs"
                >
                  AS
                </div>
                <div
                  class="w-8 h-8 rounded-full bg-zinc-700 border-2 border-zinc-900 flex items-center justify-center text-xs"
                >
                  JD
                </div>
              </div>
              <button class="ml-2 text-sm text-zinc-400 hover:text-white">
                Show more
              </button>
            </div>
          </div>
        </div>

        <!-- Comment section -->
        <div class="max-w-3xl mb-8">
          <div class="border-t border-zinc-800 pt-6">
            <div class="flex items-center gap-4 mb-6">
              <span class="flex items-center gap-2">
                <button
                  @click="toggleUpvote"
                  class="flex items-center gap-1.5 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-md font-medium"
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
                      d="M5 15l7-7 7 7"
                    />
                  </svg>
                  Upvote
                  <span class="font-bold">• {{ upvotes }}</span>
                </button>
              </span>
            </div>

            <!-- Comment input -->
            <div class="flex gap-3 mb-6">
              <div
                class="w-10 h-10 rounded-full bg-zinc-700 flex-shrink-0 flex items-center justify-center"
              >
                <span class="text-sm font-medium">Y</span>
              </div>
              <div class="flex-1">
                <textarea
                  v-model="newComment"
                  rows="3"
                  placeholder="What do you think?..."
                  class="w-full p-3 border border-zinc-700 bg-zinc-800 text-white rounded-md focus:ring-1 focus:ring-zinc-500 focus:outline-none resize-none placeholder-zinc-500"
                ></textarea>
                <div class="flex justify-between mt-2">
                  <button class="text-zinc-400 hover:text-zinc-300">@</button>
                  <button
                    @click="submitComment"
                    class="px-4 py-1 bg-zinc-700 hover:bg-zinc-600 rounded-md text-sm font-medium"
                  >
                    Login to comment
                  </button>
                </div>
              </div>
            </div>

            <!-- Comments list -->
            <div class="space-y-6">
              <div
                v-for="comment in comments"
                :key="comment.id"
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
                    <span class="text-xs text-zinc-500">• 2d ago</span>
                  </div>
                  <p class="text-zinc-300 mt-1">{{ comment.text }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { Heart, Star, ArrowUp } from "lucide-vue-next";
import { ref } from "vue";

const product = {
  name: "AI Logo Generator",
  tagline: "Generate stunning logos in seconds with AI",
  description:
    "Create professional logos using AI with minimal effort. Customize styles, download SVGs, and collaborate with your team.",
  website: "https://ailogo.example.com",
  logo: "/placeholder-logo.png",
  categories: ["AI", "Design", "Tool", "Branding"],
  submittedBy: "Aditya Singh",
};

const upvotes = ref(98);
const hasUpvoted = ref(false);
const toggleUpvote = () => {
  hasUpvoted.value = !hasUpvoted.value;
  upvotes.value += hasUpvoted.value ? 1 : -1;
};

const comments = ref([
  {
    id: 1,
    user: "Jane Doe",
    text: "This is amazing! I just used it to create a logo for my consulting business and the results are really professional looking.",
  },
  {
    id: 2,
    user: "John Smith",
    text: "Love the clean UI. Would be nice to have more export options like EPS or AI files for professional editing later.",
  },
  {
    id: 3,
    user: "Sarah Johnson",
    text: "How does the pricing work for commercial use? Is there a one-time payment option instead of the subscription?",
  },
]);
const newComment = ref("");
const submitComment = () => {
  if (!newComment.value.trim()) return;
  comments.value.push({
    id: Date.now(),
    user: "You",
    text: newComment.value.trim(),
  });
  newComment.value = "";
};
</script>
