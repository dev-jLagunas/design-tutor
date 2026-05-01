<script setup>
import { ref } from "vue";

const props = defineProps({
  brandName: String,
  tagline: String,
  links: Array,
  toggleRoute: String,
});

const isMenuOpen = ref(false);
</script>

<template>
  <nav
    class="min-nav w-full bg-white text-black border-b border-black/5 px-6 py-4 md:px-12 flex items-center justify-between relative z-[100]"
  >
    <!-- Brand Block -->
    <div class="flex items-center gap-4">
      <div class="w-8 h-8 text-black">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
        >
          <path
            d="M12 2L15 8M12 2L9 8M12 2V22M12 12L19 7M12 15L5 10"
            stroke-linecap="round"
          />
        </svg>
      </div>
      <div>
        <h2 class="text-xs font-black uppercase tracking-[0.2em] leading-none">
          {{ brandName }}
        </h2>
        <p class="text-[8px] uppercase tracking-widest opacity-50 mt-1">
          {{ tagline }}
        </p>
      </div>
    </div>

    <!-- Desktop Links -->
    <div class="hidden md:flex items-center gap-8">
      <ul class="flex gap-6">
        <li v-for="link in links" :key="link.label">
          <NuxtLink
            :to="link.to"
            class="text-[10px] font-bold uppercase tracking-widest hover:opacity-50 transition-opacity"
          >
            {{ link.label }}
          </NuxtLink>
        </li>
      </ul>
      <NuxtLink
        :to="toggleRoute"
        class="bg-black text-white text-[9px] font-black uppercase tracking-[0.2em] px-6 py-3 hover:bg-neutral-800 transition-colors"
      >
        Toggle Version
      </NuxtLink>
    </div>

    <!-- Mobile Toggle -->
    <button @click="isMenuOpen = !isMenuOpen" class="md:hidden p-2">
      <div
        class="w-6 h-px bg-black mb-1.5 transition-transform"
        :class="{ 'rotate-45 translate-y-2': isMenuOpen }"
      ></div>
      <div
        class="w-6 h-px bg-black transition-opacity"
        :class="{ 'opacity-0': isMenuOpen }"
      ></div>
      <div
        class="w-6 h-px bg-black mt-1.5 transition-transform"
        :class="{ '-rotate-45 -translate-y-2': isMenuOpen }"
      ></div>
    </button>

    <!-- Mobile Menu Overlay -->
    <div
      v-if="isMenuOpen"
      class="absolute top-full left-0 w-full bg-white border-b border-black p-8 flex flex-col gap-8 md:hidden shadow-2xl"
    >
      <ul class="flex flex-col gap-6">
        <li v-for="link in links" :key="link.label">
          <NuxtLink
            :to="link.to"
            class="text-lg font-black uppercase tracking-tighter"
            @click="isMenuOpen = false"
          >
            {{ link.label }}
          </NuxtLink>
        </li>
      </ul>
      <NuxtLink
        :to="toggleRoute"
        class="w-full bg-black text-white text-center py-4 text-[10px] font-black uppercase tracking-widest"
      >
        Toggle Version
      </NuxtLink>
    </div>
  </nav>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;900&display=swap");

.min-nav {
  font-family: "Inter", sans-serif;
}
</style>
