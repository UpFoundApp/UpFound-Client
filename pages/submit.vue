<template>
  <div class="min-h-screen bg-zinc-900 text-white">
    <!-- Main content -->
    <main class="px-4 py-6">
      <div class="max-w-screen-xl mx-auto">
        <div class="max-w-2xl mx-auto">
          <!-- Page title -->
          <div class="text-center mb-8">
            <h1 class="text-3xl font-bold mb-2">Submit Your Product</h1>
            <p class="text-zinc-400">
              Share your amazing product with the Upfound community
            </p>
          </div>

          <!-- Form -->
          <form
            @submit.prevent="submitProduct"
            class="bg-zinc-800 border border-zinc-700 rounded-xl p-6 md:p-8"
          >
            <h2 class="text-xl font-semibold mb-6">Product Information</h2>

            <!-- Product Name -->
            <div class="mb-5">
              <label class="block text-sm font-medium mb-1.5"
                >Product Name <span class="text-red-500">*</span></label
              >
              <input
                v-model="productForm.name"
                type="text"
                placeholder="Enter your product name"
                class="w-full bg-zinc-700 border border-zinc-600 rounded-md px-3 py-2 text-white placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-orange-500"
                required
              />
            </div>

            <!-- Tagline -->
            <div class="mb-5">
              <label class="block text-sm font-medium mb-1.5"
                >Tagline <span class="text-red-500">*</span></label
              >
              <input
                v-model="productForm.tagline"
                type="text"
                placeholder="Describe your product in one line"
                class="w-full bg-zinc-700 border border-zinc-600 rounded-md px-3 py-2 text-white placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-orange-500"
                required
              />
            </div>

            <!-- Description -->
            <div class="mb-5">
              <label class="block text-sm font-medium mb-1.5"
                >Description <span class="text-red-500">*</span></label
              >
              <textarea
                v-model="productForm.description"
                rows="4"
                placeholder="Tell us more about your product..."
                class="w-full bg-zinc-700 border border-zinc-600 rounded-md px-3 py-2 text-white placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-orange-500 resize-none"
                required
              ></textarea>
            </div>

            <!-- Website URL -->
            <div class="mb-5">
              <label class="block text-sm font-medium mb-1.5"
                >Website URL <span class="text-red-500">*</span></label
              >
              <input
                v-model="productForm.website"
                type="url"
                placeholder="https://yourproduct.com"
                class="w-full bg-zinc-700 border border-zinc-600 rounded-md px-3 py-2 text-white placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-orange-500"
                required
              />
            </div>

            <!-- Category -->
            <div class="mb-6">
              <label class="block text-sm font-medium mb-1.5"
                >Category <span class="text-red-500">*</span></label
              >
              <select
                v-model="productForm.category"
                class="w-full bg-zinc-700 border border-zinc-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-orange-500 appearance-none"
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
            </div>

            <!-- Product Logo Upload -->
            <div class="mb-6">
              <label class="block text-sm font-medium mb-1.5"
                >Product Logo</label
              >
              <div class="relative">
                <!-- Logo preview if uploaded -->
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

                <!-- Upload input -->
                <div class="flex items-center justify-center w-full">
                  <label
                    class="flex flex-col items-center justify-center w-full h-32 rounded-lg border-2 border-dashed border-zinc-600 hover:border-orange-500 cursor-pointer bg-zinc-700/50 transition-all"
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
                        <span class="font-medium">Click to upload logo</span> or
                        drag and drop
                      </p>
                      <p class="text-xs text-zinc-500">PNG or JPG (max. 3MB)</p>
                    </div>
                    <input
                      type="file"
                      accept="image/png, image/jpeg"
                      @change="handleLogoUpload"
                      class="hidden"
                    />
                  </label>
                </div>
              </div>
            </div>

            <!-- Product Screenshots (Multiple) -->
            <div class="mb-8">
              <label class="block text-sm font-medium mb-1.5"
                >Product Screenshots (up to 5)</label
              >

              <!-- Images previews if uploaded -->
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

              <!-- Upload button (disabled when max images reached) -->
              <div class="flex items-center justify-center w-full">
                <label
                  :class="[
                    'flex flex-col items-center justify-center w-full h-32 rounded-lg border-2 border-dashed transition-all cursor-pointer',
                    screenshotPreviews.length >= 5
                      ? 'border-zinc-700 bg-zinc-800/50 cursor-not-allowed'
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
            </div>

            <!-- Submit Button -->
            <div class="flex justify-center">
              <button
                @click="showToast"
                type="submit"
                class="bg-orange-500 hover:bg-orange-600 text-white font-medium py-2.5 px-8 rounded-md transition w-full md:w-auto"
              >
                Submit Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";

// Categories list
const categories = [
  "AI",
  "SaaS",
  "Devtools",
  "Design",
  "Productivity",
  "E-commerce",
  "Marketing",
  "Analytics",
  "Finance",
  "Developer Tools",
];

// Form data
const productForm = reactive({
  name: "",
  tagline: "",
  description: "",
  website: "",
  category: "",
});

// File handling for logo
const logoFile = ref(null);
const logoPreview = ref("");

function handleLogoUpload(event) {
  const file = event.target.files[0];
  if (!file) return;

  // Check file size (max 3MB)
  if (file.size > 3 * 1024 * 1024) {
    alert("Logo file is too large. Please choose a file under 3MB.");
    return;
  }

  logoFile.value = file;

  // Create preview
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

// File handling for screenshots (multiple)
const screenshotFiles = ref([]);
const screenshotPreviews = ref([]);

function handleScreenshotsUpload(event) {
  const newFiles = Array.from(event.target.files);
  if (!newFiles.length) return;

  // Check number of files
  const totalFiles = screenshotFiles.value.length + newFiles.length;
  if (totalFiles > 5) {
    alert("You can upload a maximum of 5 screenshots.");
    return;
  }

  // Check each file size
  for (const file of newFiles) {
    if (file.size > 5 * 1024 * 1024) {
      alert(
        "One or more files are too large. Each screenshot must be under 5MB."
      );
      return;
    }
  }

  // Add files to our array
  screenshotFiles.value.push(...newFiles);

  // Generate previews
  newFiles.forEach((file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      screenshotPreviews.value.push(e.target.result);
    };
    reader.readAsDataURL(file);
  });
}

function removeScreenshot(index) {
  // Remove both the file and preview
  screenshotFiles.value.splice(index, 1);
  screenshotPreviews.value.splice(index, 1);
}

// Form submission
async function submitProduct() {
  console.log("Product form data:", productForm);
  console.log("Logo file:", logoFile.value);
  console.log("Screenshot files:", screenshotFiles.value);

  // Here you would typically create a FormData object and submit to your API
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
    screenshotFiles.value.forEach((file, index) => {
      formData.append("screenshots", file);
    });
  }

  try {
    // Mock API call - replace with actual implementation
    // const response = await fetch('/api/products', {
    //   method: 'POST',
    //   body: formData
    // });

    // if (response.ok) {
    //   alert('Product submitted successfully!');
    // } else {
    //   throw new Error('Failed to submit product');
    // }

    alert("Product submitted successfully! (Demo mode)");
  } catch (error) {
    console.error("Error submitting product:", error);
    alert("Failed to submit product. Please try again.");
  }
}
</script>
