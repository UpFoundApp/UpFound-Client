<script setup>
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
import { ref } from "vue";
import { toast } from "vue3-toastify";
import { useRouter } from "vue-router";

const runtimeConfig = useRuntimeConfig();
const baseUrl = runtimeConfig.public.apiUrl;
// Form data
const email = ref("");
const password = ref("");
const showPassword = ref(false);
const isLoading = ref(false);

async function handleLogin() {
  if (!email.value || !password.value) {
    toast.error("Please enter both email and password");
    return;
  }

  isLoading.value = true;

  try {
    const response = await fetch(`${baseUrl}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email.value,
        password: password.value,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      toast.error(data.error || "Login failed");
      throw new Error(data.error || "Login failed");
    }

    // Store auth data
    localStorage.setItem("token", data.token);
    localStorage.setItem("name", data.user.name);
    localStorage.setItem("userId", data.user.userId);

    toast.success("Login successful!");
    window.location.href = "/";
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
      <CardTitle class="text-2xl text-white">Welcome back</CardTitle>
      <CardDescription class="text-zinc-400">
        Enter your credentials to sign in to Upfound
      </CardDescription>
    </CardHeader>
    <CardContent>
      <form @submit.prevent="handleLogin" class="grid gap-4">
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
            class="bg-zinc-700 border-zinc-600 text-white placeholder:text-zinc-400 focus-visible:ring-orange-500"
          />
        </div>

        <!-- Password field -->
        <div class="grid gap-2">
          <div class="flex items-center">
            <Label for="password" class="text-zinc-300">Password</Label>
          </div>
          <div class="relative">
            <Input
              id="password"
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              required
              :disabled="isLoading"
              class="bg-zinc-700 border-zinc-600 text-white placeholder:text-zinc-400 focus-visible:ring-orange-500 pr-10"
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
            Signing in...
          </div>
          <span v-else>Sign in</span>
        </Button>

        <!-- Divider -->
        <div class="relative my-4">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-zinc-600"></div>
          </div>
        </div>
      </form>

      <!-- Register link -->
      <div class="mt-6 text-center text-sm text-zinc-400">
        Don't have an account?
        <NuxtLink
          to="/register"
          class="text-orange-400 hover:text-orange-300 hover:underline"
        >
          Register
        </NuxtLink>
      </div>
    </CardContent>
  </Card>
</template>
