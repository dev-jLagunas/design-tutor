<template>
  <div class="min-h-screen">
    <NuxtLink
      to="/#design-grid"
      class="fixed top-6 left-6 z-50 p-2 opacity-50 hover:opacity-100 transition-opacity"
    >
      <Icon name="lucide:x" class="text-2xl" />
    </NuxtLink>
    <slot />
  </div>
</template>
