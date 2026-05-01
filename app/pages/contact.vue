<script setup></script>

<template>
  <ReusableDisplayHero
    word1="Contact"
    word2="Coming"
    word3="Soon"
    tagline="The contact portal is currently under construction. Please check back later or reach out via the index."
    class=""
  >
    <template #actions>
      <NuxtLink
        to="/"
        class="group flex h-16 items-center shadow-lg justify-center gap-4 bg-tdt-gold px-10 text-[11px] font-black uppercase tracking-[0.2em] text-tdt-black transition-all hover:bg-tdt-black hover:text-tdt-white dark:hover:bg-tdt-white dark:hover:text-tdt-black"
      >
        Go Home
        <Icon name="lucide:home" class="text-lg" />
      </NuxtLink>
    </template>
  </ReusableDisplayHero>
</template>

<style scoped></style>
