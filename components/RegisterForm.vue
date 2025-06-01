<script setup lang="ts">
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ref, computed } from "vue";
import { toast } from "vue3-toastify";
import { useRouter } from "vue-router";

// Get API base URL from runtime config
const runtimeConfig = useRuntimeConfig();
const baseUrl = runtimeConfig.public.apiUrl;
const router = useRouter();
const isLoading = ref(false);

// Form data
const name = ref("");
const email = ref("");
const password = ref("");
const showPassword = ref(false);

// Password strength calculation
const passwordStrength = computed(() => {
  const pwd = password.value;
  if (!pwd) return 0;

  let score = 0;

  // Length check
  if (pwd.length >= 8) score += 1;
  if (pwd.length >= 12) score += 1;

  // Complexity checks
  if (/[A-Z]/.test(pwd)) score += 1; // Has uppercase
  if (/[a-z]/.test(pwd)) score += 1; // Has lowercase
  if (/[0-9]/.test(pwd)) score += 1; // Has number
  if (/[^A-Za-z0-9]/.test(pwd)) score += 1; // Has special char

  return Math.min(score, 5); // Max score of 5
});

const strengthText = computed(() => {
  const score = passwordStrength.value;
  if (score === 0) return "Enter a password";
  if (score === 1) return "Very weak";
  if (score === 2) return "Weak";
  if (score === 3) return "Medium";
  if (score === 4) return "Strong";
  return "Very strong";
});

const strengthColor = computed(() => {
  const score = passwordStrength.value;
  if (score === 0) return "bg-zinc-600";
  if (score === 1) return "bg-red-500";
  if (score === 2) return "bg-orange-500";
  if (score === 3) return "bg-yellow-500";
  if (score === 4) return "bg-green-400";
  return "bg-green-500";
});

// Form validation
const isValidEmail = computed(() => {
  if (!email.value) return true; // Don't show error for empty field
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.value);
});

const isValidPassword = computed(() => {
  return !password.value || passwordStrength.value >= 3;
});

// Form submission
async function handleSubmit() {
  // Validate form
  if (!name.value || !email.value || !password.value) {
    toast.error("Please fill in all required fields");
    return;
  }

  if (!isValidEmail.value) {
    toast.error("Please enter a valid email address");
    return;
  }

  if (!isValidPassword.value) {
    toast.error("Please create a stronger password");
    return;
  }

  isLoading.value = true;

  try {
    // Make API request to register user
    const response = await fetch(`${baseUrl}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name.value,
        email: email.value,
        password: password.value,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Registration failed");
    }

    toast.success("Registration successful!");

    if (data.token) {
      localStorage.setItem("name", data.user.name);
      localStorage.setItem("userId", data.user.userId);
      localStorage.setItem("token", data.token);
      window.location.href = "/";
    } else {
      router.push("/login");
    }
  } catch (error) {
    if (error instanceof Error) {
      toast.error(error.message);
    } else {
      toast.error("An unexpected error occurred");
    }
  } finally {
    isLoading.value = false;
  }
}
</script>

<template>
  <Card class="mx-auto max-w-sm bg-zinc-800 border-zinc-700 text-zinc-200">
    <CardHeader>
      <CardTitle class="text-2xl text-white"> Create an account </CardTitle>
      <CardDescription class="text-zinc-400">
        Enter your information to create your account
      </CardDescription>
    </CardHeader>
    <CardContent>
      <form @submit.prevent="handleSubmit" class="grid gap-4">
        <!-- Name field -->
        <div class="grid gap-2">
          <Label for="name" class="text-zinc-300">Full Name</Label>
          <Input
            id="name"
            v-model="name"
            type="text"
            placeholder="John Doe"
            required
            :disabled="isLoading"
            class="bg-zinc-700 border-zinc-600 text-white placeholder:text-zinc-400 focus-visible:ring-orange-500"
          />
        </div>

        <!-- Email field -->
        <div class="grid gap-2">
          <Label for="email" class="text-zinc-300">Email</Label>
          <Input
            id="email"
            v-model="email"
            type="email"
            placeholder="m@example.com"
            required
            :disabled="isLoading"
            :class="{
              'bg-zinc-700 border-zinc-600 text-white placeholder:text-zinc-400 focus-visible:ring-orange-500': true,
              'border-red-500': email && !isValidEmail,
            }"
          />
          <p
            v-if="email && !isValidEmail"
            class="text-xs text-red-500 mt-1"
          >
            Please enter a valid email address
          </p>
        </div>

        <!-- Password field -->
        <div class="grid gap-2">
          <Label for="password" class="text-zinc-300">Password</Label>
          <div class="relative">
            <Input
              id="password"
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              required
              :disabled="isLoading"
              :class="{
                'bg-zinc-700 border-zinc-600 text-white placeholder:text-zinc-400 focus-visible:ring-orange-500 pr-10': true,
                'border-red-500': password && !isValidPassword,
              }"
            />
            <button
              type="button"
              @click="showPassword = !showPassword"
              class="absolute right-3 top-1/2 transform -translate-y-1/2 text-zinc-400 hover:text-zinc-300 focus:outline-none"
            >
              <svg
                v-if="showPassword"
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z"
                  clip-rule="evenodd"
                />
                <path
                  d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z"
                />
              </svg>
              <svg
                v-else
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path
                  fill-rule="evenodd"
                  d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
          </div>

          <!-- Password strength indicator -->
          <div class="mt-2 space-y-2" v-if="password">
            <div class="flex justify-between items-center">
              <div class="text-xs text-zinc-400">
                Password strength: {{ strengthText }}
              </div>
              <div
                class="text-xs"
                :class="
                  passwordStrength >= 3 ? 'text-green-400' : 'text-orange-400'
                "
              >
                {{ passwordStrength >= 3 ? "Acceptable" : "Too weak" }}
              </div>
            </div>
            <div class="h-1.5 w-full bg-zinc-700 rounded-full overflow-hidden">
              <div
                class="h-full transition-all duration-300"
                :class="strengthColor"
                :style="`width: ${(passwordStrength / 5) * 100}%`"
              ></div>
            </div>
            <ul class="text-xs text-zinc-400 space-y-1 mt-2">
              <li class="flex items-center gap-1.5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-3.5 w-3.5"
                  :class="
                    password.length >= 8 ? 'text-green-400' : 'text-zinc-500'
                  "
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                At least 8 characters
              </li>
              <li class="flex items-center gap-1.5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-3.5 w-3.5"
                  :class="
                    /[A-Z]/.test(password) ? 'text-green-400' : 'text-zinc-500'
                  "
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Contains uppercase letter
              </li>
              <li class="flex items-center gap-1.5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-3.5 w-3.5"
                  :class="
                    /[0-9]/.test(password) ? 'text-green-400' : 'text-zinc-500'
                  "
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Contains number
              </li>
              <li class="flex items-center gap-1.5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-3.5 w-3.5"
                  :class="
                    /[^A-Za-z0-9]/.test(password)
                      ? 'text-green-400'
                      : 'text-zinc-500'
                  "
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Contains special character
              </li>
            </ul>
          </div>
        </div>

        <!-- Submit button -->
        <Button
          type="submit"
          :disabled="isLoading"
          class="w-full mt-2 bg-orange-500 hover:bg-orange-600 text-white disabled:opacity-50"
        >
          <div v-if="isLoading" class="flex items-center justify-center gap-2">
            <svg
              class="animate-spin h-5 w-5"
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
            Registering...
          </div>
          <span v-else>Register</span>
        </Button>
      </form>

      <!-- Login link -->
      <div class="mt-4 text-center text-sm text-zinc-400">
        Already have an account?
        <NuxtLink to="/login" class="text-orange-400 hover:underline">
          Login
        </NuxtLink>
      </div>
    </CardContent>
  </Card>
</template>
