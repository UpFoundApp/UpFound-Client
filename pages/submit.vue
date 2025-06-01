<template>
  <div class="min-h-screen bg-zinc-900 text-white">
    <main class="px-4 py-6">
      <div class="max-w-screen-xl mx-auto">
        <div class="max-w-5xl mx-auto">
          <div class="text-center mb-8">
            <h1 class="text-3xl font-bold mb-2">Submit Your Product</h1>
            <p class="text-zinc-400">
              Share your amazing product with the Upfound community
            </p>
          </div>

          <form
            @submit.prevent="validateAndSubmit"
            class="bg-zinc-800 border border-zinc-700 rounded-xl p-6 md:p-8"
          >
            <h2 class="text-xl font-semibold mb-6">Product Information</h2>

            <div class="flex flex-col lg:flex-row gap-8">
              <div class="flex-1">
                <div class="mb-5">
                  <label class="block text-sm font-medium mb-1.5"
                    >Product Name <span class="text-red-500">*</span></label
                  >
                  <input
                    v-model="productForm.name"
                    type="text"
                    placeholder="Enter your product name"
                    class="w-full bg-zinc-700 border border-zinc-600 rounded-md px-3 py-2 text-white placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-orange-500"
                    :class="{ 'border-red-500': validationErrors.name }"
                    required
                  />
                  <p
                    v-if="validationErrors.name"
                    class="text-red-500 text-xs mt-1"
                  >
                    {{ validationErrors.name }}
                  </p>
                </div>

                <div class="mb-5">
                  <label class="block text-sm font-medium mb-1.5"
                    >Tagline <span class="text-red-500">*</span></label
                  >
                  <input
                    v-model="productForm.tagline"
                    type="text"
                    placeholder="Describe your product in one line"
                    class="w-full bg-zinc-700 border border-zinc-600 rounded-md px-3 py-2 text-white placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-orange-500"
                    :class="{ 'border-red-500': validationErrors.tagline }"
                    required
                  />
                  <p
                    v-if="validationErrors.tagline"
                    class="text-red-500 text-xs mt-1"
                  >
                    {{ validationErrors.tagline }}
                  </p>
                </div>

                <div class="mb-5">
                  <label class="block text-sm font-medium mb-1.5"
                    >Description <span class="text-red-500">*</span></label
                  >
                  <textarea
                    v-model="productForm.description"
                    rows="4"
                    placeholder="Tell us more about your product..."
                    class="w-full bg-zinc-700 border border-zinc-600 rounded-md px-3 py-2 text-white placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-orange-500 resize-none"
                    :class="{ 'border-red-500': validationErrors.description }"
                    required
                  ></textarea>
                  <p
                    v-if="validationErrors.description"
                    class="text-red-500 text-xs mt-1"
                  >
                    {{ validationErrors.description }}
                  </p>
                </div>

                <div class="mb-5">
                  <label class="block text-sm font-medium mb-1.5"
                    >Website URL <span class="text-red-500">*</span></label
                  >
                  <input
                    v-model="productForm.website"
                    type="url"
                    placeholder="https://yourproduct.com"
                    class="w-full bg-zinc-700 border border-zinc-600 rounded-md px-3 py-2 text-white placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-orange-500"
                    :class="{ 'border-red-500': validationErrors.website }"
                    required
                  />
                  <p
                    v-if="validationErrors.website"
                    class="text-red-500 text-xs mt-1"
                  >
                    {{ validationErrors.website }}
                  </p>
                </div>

                <div class="mb-5">
                  <label class="block text-sm font-medium mb-1.5"
                    >Category <span class="text-red-500">*</span></label
                  >
                  <select
                    v-model="productForm.category"
                    class="w-full bg-zinc-700 border border-zinc-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-orange-500 appearance-none"
                    :class="{ 'border-red-500': validationErrors.category }"
                    required
                  >
                    <option value="" disabled>Select a category</option>
                    <option
                      v-for="category in categories"
                      :key="category"
                      :value="category"
                    >
                      {{ category }}
                    </option>
                  </select>
                  <p
                    v-if="validationErrors.category"
                    class="text-red-500 text-xs mt-1"
                  >
                    {{ validationErrors.category }}
                  </p>
                </div>
              </div>

              <div class="flex-1">
                <div class="mb-6">
                  <label class="block text-sm font-medium mb-1.5"
                    >Product Logo <span class="text-red-500">*</span></label
                  >
                  <div class="relative">
                    <div v-if="logoPreview" class="mb-3 relative inline-block">
                      <img
                        :src="logoPreview"
                        alt="Product logo"
                        class="w-20 h-20 rounded-md object-cover border border-zinc-600"
                      />
                      <button
                        @click.prevent="removeLogo"
                        class="absolute -top-2 -right-2 bg-zinc-700 hover:bg-zinc-600 rounded-full p-1"
                        title="Remove logo"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-4 w-4 text-zinc-300"
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

                    <div class="flex items-center justify-center w-full">
                      <label
                        :class="[
                          'flex flex-col items-center justify-center w-full h-32 rounded-lg border-2 border-dashed transition-all cursor-pointer',
                          validationErrors.logo
                            ? 'border-red-500 bg-red-500/10'
                            : 'border-zinc-600 hover:border-orange-500 bg-zinc-700/50',
                        ]"
                      >
                        <div
                          class="flex flex-col items-center justify-center pt-5 pb-6"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-8 w-8 text-zinc-400 mb-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                            />
                          </svg>
                          <p class="text-sm text-zinc-400 text-center">
                            <span class="font-medium"
                              >Click to upload logo</span
                            >
                            or drag and drop
                          </p>
                          <p class="text-xs text-zinc-500">
                            PNG or JPG (max. 3MB)
                          </p>
                        </div>
                        <input
                          type="file"
                          accept="image/png, image/jpeg"
                          @change="handleLogoUpload"
                          class="hidden"
                        />
                      </label>
                    </div>
                    <p
                      v-if="validationErrors.logo"
                      class="text-red-500 text-xs mt-1"
                    >
                      {{ validationErrors.logo }}
                    </p>
                  </div>
                </div>

                <div class="mb-6">
                  <label class="block text-sm font-medium mb-1.5"
                    >Product Screenshots <span class="text-red-500">*</span> (up
                    to 5)</label
                  >

                  <div
                    v-if="screenshotPreviews.length > 0"
                    class="mb-3 flex flex-wrap gap-3"
                  >
                    <div
                      v-for="(preview, index) in screenshotPreviews"
                      :key="index"
                      class="relative"
                    >
                      <img
                        :src="preview"
                        alt="Product screenshot"
                        class="w-24 h-24 rounded-md object-cover border border-zinc-600"
                      />
                      <button
                        @click.prevent="removeScreenshot(index)"
                        class="absolute -top-2 -right-2 bg-zinc-700 hover:bg-zinc-600 rounded-full p-1"
                        title="Remove image"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-4 w-4 text-zinc-300"
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

                  <div class="flex items-center justify-center w-full">
                    <label
                      :class="[
                        'flex flex-col items-center justify-center w-full h-32 rounded-lg border-2 border-dashed transition-all cursor-pointer',
                        screenshotPreviews.length >= 5
                          ? 'border-zinc-700 bg-zinc-800/50 cursor-not-allowed'
                          : validationErrors.screenshots
                          ? 'border-red-500 bg-red-500/10'
                          : 'border-zinc-600 hover:border-orange-500 bg-zinc-700/50',
                      ]"
                    >
                      <div
                        class="flex flex-col items-center justify-center pt-5 pb-6"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-8 w-8 text-zinc-400 mb-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        <p class="text-sm text-zinc-400 text-center">
                          <span v-if="screenshotPreviews.length >= 5">
                            Maximum 5 images allowed
                          </span>
                          <span v-else>
                            <span class="font-medium"
                              >Click to upload screenshots</span
                            >
                            or drag and drop
                          </span>
                        </p>
                        <p
                          v-if="screenshotPreviews.length < 5"
                          class="text-xs text-zinc-500"
                        >
                          PNG or JPG (max. 5MB each) ·
                          {{ screenshotPreviews.length }}/5 uploaded
                        </p>
                      </div>
                      <input
                        type="file"
                        accept="image/png, image/jpeg"
                        @change="handleScreenshotsUpload"
                        :disabled="screenshotPreviews.length >= 5"
                        multiple
                        class="hidden"
                      />
                    </label>
                  </div>
                  <p
                    v-if="validationErrors.screenshots"
                    class="text-red-500 text-xs mt-1"
                  >
                    {{ validationErrors.screenshots }}
                  </p>
                </div>
              </div>
            </div>

            <div
              v-if="Object.keys(validationErrors).length > 0"
              class="mt-4 mb-6 p-3 bg-red-500/20 border border-red-500/30 rounded-md"
            >
              <p class="font-medium text-red-400 mb-1">
                Please fix the following issues:
              </p>
              <ul class="list-disc list-inside text-sm text-red-300">
                <li v-for="(error, key) in validationErrors" :key="key">
                  {{ error }}
                </li>
              </ul>
            </div>

            <div class="flex justify-center mt-8">
              <button
                type="submit"
                :disabled="isSubmitting"
                class="bg-orange-500 hover:bg-orange-600 text-white font-medium py-2.5 px-8 rounded-md transition w-full md:w-auto disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <svg
                  v-if="isSubmitting"
                  class="animate-spin h-5 w-5 text-white"
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
                {{ isSubmitting ? "Submitting..." : "Submit Product" }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { useRouter } from "vue-router";
import { toast } from "vue3-toastify";

const router = useRouter();
const runtimeConfig = useRuntimeConfig();
const baseUrl = runtimeConfig.public.apiUrl;

const categories = [
  "AI",
  "SaaS",
  "Devtools",
  "Design",
  "Productivity",
  "E-commerce",
];

const productForm = reactive({
  name: "",
  tagline: "",
  description: "",
  website: "",
  category: "",
});

const logoFile = ref(null);
const logoPreview = ref("");
const token = ref(null);
const isSubmitting = ref(false);
const validationErrors = reactive({});

const screenshotFiles = ref([]);
const screenshotPreviews = ref([]);

function handleLogoUpload(event) {
  const file = event.target.files[0];
  if (!file) return;

  if (file.size > 3 * 1024 * 1024) {
    toast.error("Logo file is too large. Please choose a file under 3MB.");
    return;
  }

  logoFile.value = file;
  delete validationErrors.logo;

  const reader = new FileReader();
  reader.onload = (e) => {
    logoPreview.value = e.target.result;
  };
  reader.readAsDataURL(file);
}

function removeLogo() {
  logoFile.value = null;
  logoPreview.value = "";
}

function handleScreenshotsUpload(event) {
  const newFiles = Array.from(event.target.files);
  if (!newFiles.length) return;

  const totalFiles = screenshotFiles.value.length + newFiles.length;
  if (totalFiles > 5) {
    toast.error("You can upload a maximum of 5 screenshots.");
    return;
  }

  for (const file of newFiles) {
    if (file.size > 5 * 1024 * 1024) {
      toast.error(
        "One or more files are too large. Each screenshot must be under 5MB."
      );
      return;
    }
  }

  screenshotFiles.value.push(...newFiles);

  delete validationErrors.screenshots;

  newFiles.forEach((file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      screenshotPreviews.value.push(e.target.result);
    };
    reader.readAsDataURL(file);
  });
}

function removeScreenshot(index) {
  screenshotFiles.value.splice(index, 1);
  screenshotPreviews.value.splice(index, 1);
}

function validateForm() {
  validationErrors.name = "";
  validationErrors.tagline = "";
  validationErrors.description = "";
  validationErrors.website = "";
  validationErrors.category = "";
  validationErrors.logo = "";
  validationErrors.screenshots = "";

  let isValid = true;

  if (!productForm.name.trim()) {
    validationErrors.name = "Product name is required";
    isValid = false;
  } else if (productForm.name.trim().length < 2) {
    validationErrors.name = "Product name must be at least 2 characters";
    isValid = false;
  }

  if (!productForm.tagline.trim()) {
    validationErrors.tagline = "Tagline is required";
    isValid = false;
  } else if (productForm.tagline.trim().length < 5) {
    validationErrors.tagline = "Tagline must be at least 5 characters";
    isValid = false;
  } else if (productForm.tagline.trim().length > 80) {
    validationErrors.tagline = "Tagline must be less than 80 characters";
    isValid = false;
  }

  if (!productForm.description.trim()) {
    validationErrors.description = "Description is required";
    isValid = false;
  } else if (productForm.description.trim().length < 20) {
    validationErrors.description = "Description must be at least 20 characters";
    isValid = false;
  }

  if (!productForm.website.trim()) {
    validationErrors.website = "Website URL is required";
    isValid = false;
  } else {
    try {
      new URL(productForm.website);
    } catch (e) {
      validationErrors.website =
        "Please enter a valid URL (including https://)";
      isValid = false;
    }
  }

  if (!productForm.category) {
    validationErrors.category = "Please select a category";
    isValid = false;
  }

  if (!logoFile.value) {
    validationErrors.logo = "Product logo is required";
    isValid = false;
  }

  if (screenshotFiles.value.length === 0) {
    validationErrors.screenshots =
      "At least one product screenshot is required";
    isValid = false;
  }

  for (const key in validationErrors) {
    if (!validationErrors[key]) {
      delete validationErrors[key];
    }
  }

  return isValid;
}

async function validateAndSubmit() {
  if (!validateForm()) {
    toast.error("Please fix all validation errors before submitting");
    const firstErrorKey = Object.keys(validationErrors)[0];
    const firstErrorElement = document.querySelector(
      `[class*="border-red-500"]`
    );
    if (firstErrorElement) {
      firstErrorElement.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    return;
  }

  if (!token.value) {
    toast.error("You must be logged in to submit a product");
    router.push("/login");
    return;
  }

  await submitProduct();
}

async function submitProduct() {
  isSubmitting.value = true;

  try {
    const formData = new FormData();
    formData.append("name", productForm.name);
    formData.append("tagline", productForm.tagline);
    formData.append("description", productForm.description);
    formData.append("website", productForm.website);
    formData.append("category", productForm.category);

    if (logoFile.value) {
      formData.append("logo", logoFile.value);
    }

    if (screenshotFiles.value.length) {
      screenshotFiles.value.forEach((file) => {
        formData.append("medias", file);
      });
    }

    const response = await fetch(`${baseUrl}/products`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to submit product");
    }

    const data = await response.json();

    toast.success("Product submitted successfully!");

    setTimeout(() => {
      router.push(`/product/${data._id}`);
    }, 1500);
  } catch (error) {
    console.error("Error submitting product:", error);
    toast.error(error.message || "Failed to submit product. Please try again.");
  } finally {
    isSubmitting.value = false;
  }
}

function checkAuthStatus() {
  if (process.client) {
    token.value = localStorage.getItem("token");

    if (!token.value) {
      toast.warning("You need to be logged in to submit a product", {
        autoClose: 5000,
      });
      router.push("/login");
    }
  }
}

onMounted(() => {
  checkAuthStatus();
});
</script>

<style scoped>
.custom-file-upload {
  border: 1px solid #ccc;
  display: inline-block;
  padding: 6px 12px;
  cursor: pointer;
}

@media (max-width: 1023px) {
  .flex-col.lg\:flex-row {
    gap: 2rem;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.text-red-500 {
  animation: fadeIn 0.3s ease-in-out;
}
</style>
