<template>
  <div class="min-h-screen flex bg-gray-900 text-gray-100">
    <!-- Left Side -->
    <Transition name="slide-fade" appear>
      <div class="hidden md:flex md:w-1/2 bg-gradient-to-br from-purple-900 via-pink-900 to-red-900 p-12 flex-col justify-center">
        <h1 class="text-5xl font-bold mb-6">Join Us</h1>
        <p class="text-lg text-gray-300 max-w-md">
          Create your account to submit and upvote products in our community.
        </p>
      </div>
    </Transition>

    <!-- Right Side -->
    <Transition name="slide-fade-delay" appear>
      <div class="flex w-full md:w-1/2 items-center justify-center p-8">
        <form @submit.prevent="handleRegister" class="w-full max-w-md bg-gray-800 rounded-lg p-8 shadow-lg">
          <h2 class="text-3xl font-semibold mb-6 text-center">Register</h2>
          <input
            v-model="name"
            type="text"
            placeholder="Full Name"
            required
            class="w-full mb-4 px-3 py-2 rounded bg-gray-700 border border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
          <input
            v-model="email"
            type="email"
            placeholder="Email"
            required
            class="w-full mb-4 px-3 py-2 rounded bg-gray-700 border border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
          <input
            v-model="password"
            type="password"
            placeholder="Password"
            required
            class="w-full mb-6 px-3 py-2 rounded bg-gray-700 border border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
          <button
            type="submit"
            class="w-full bg-pink-600 hover:bg-pink-700 transition rounded py-2 font-semibold"
          >
            Register
          </button>
          <p class="mt-4 text-center text-gray-400">
            Already have an account?
            <NuxtLink to="/login" class="text-pink-400 hover:underline">Login</NuxtLink>
          </p>
        </form>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const name = ref('')
const email = ref('')
const password = ref('')
const router = useRouter()

async function handleRegister() {
  try {
    const res = await $fetch('/api/auth/register', {
      method: 'POST',
      body: { name: name.value, email: email.value, password: password.value },
    })
    localStorage.setItem('token', res.token)
    router.push('/')
  } catch {
    alert('Registration failed')
  }
}
</script>

<style scoped>
/* Reuse same slide-fade styles as login */
.slide-fade-enter-active {
  transition: all 0.6s ease;
}
.slide-fade-leave-active {
  transition: all 0.3s ease;
}
.slide-fade-enter-from {
  opacity: 0;
  transform: translateX(-40px);
}
.slide-fade-enter-to {
  opacity: 1;
  transform: translateX(0);
}

.slide-fade-delay-enter-active {
  transition: all 0.8s ease 0.3s;
}
.slide-fade-delay-leave-active {
  transition: all 0.3s ease;
}
.slide-fade-delay-enter-from {
  opacity: 0;
  transform: translateX(40px);
}
.slide-fade-delay-enter-to {
  opacity: 1;
  transform: translateX(0);
}
</style>
