<script setup></script>

<template>
  <ReusableDisplayHero
    word1="Learn"
    word2="Visual"
    word3="Design"
    tagline="An open library of design styles, history, and fundamental rules for the modern designer."
  >
    <template #actions>
      <NuxtLink
        to="/#design-grid"
        class="group flex h-16 items-center shadow-lg justify-center gap-4 bg-tdt-gold px-10 text-[11px] font-black uppercase tracking-[0.2em] text-tdt-black transition-all hover:bg-tdt-black hover:text-tdt-white dark:hover:bg-tdt-white dark:hover:text-tdt-black"
      >
        See Designs
        <Icon
          name="lucide:arrow-right"
          class="text-lg transition-transform group-hover:translate-x-1"
        />
      </NuxtLink>

      <NuxtLink
        to="/contact"
        class="flex h-16 items-center justify-center px-10 text-[11px] font-black uppercase tracking-[0.2em] transition-colors hover:text-tdt-blue"
      >
        Contact Me
      </NuxtLink>
    </template>
  </ReusableDisplayHero>
</template>

<style scoped></style>
