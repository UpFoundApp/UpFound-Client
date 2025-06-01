<template>
  <div
    class="dark flex min-h-full flex-col items-center justify-center bg-[#131313] p-6 md:p-10"
  >
    <div class="w-full max-w-sm md:max-w-3xl">
      <RegisterForm />
    </div>
  </div>
</template>

<script setup>
import RegisterForm from "~/components/RegisterForm.vue";
import { ref } from "vue";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const router = useRouter();

async function handleRegister() {
  try {
    const res = await $fetch("/api/auth/register", {
      method: "POST",
      body: { email: email.value, password: password.value },
    });
    localStorage.setItem("token", res.token);
    router.push("/");
  } catch {
    alert("Login failed");
  }
}
</script>