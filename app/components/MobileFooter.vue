<template>
  <footer
    class="fixed bottom-0 left-0 z-50 w-full bg-tdt-off-white transition-colors duration-300 dark:bg-tdt-black md:hidden"
  >
    <div class="flex items-center justify-around py-3 px-6">
      <NuxtLink
        to="/"
        class="flex flex-col items-center gap-1 transition-all duration-300 text-tdt-black/40 dark:text-tdt-white/40 [&.router-link-active]:text-tdt-red dark:[&.router-link-active]:text-tdt-gold"
      >
        <Icon name="lucide:home" class="text-xl" />
        <span class="text-[9px] font-black uppercase tracking-[0.2em]"
          >Home</span
        >
      </NuxtLink>

      <NuxtLink
        to="/about"
        class="flex flex-col items-center gap-1 transition-all duration-300 text-tdt-black/40 dark:text-tdt-white/40 [&.router-link-active]:text-tdt-red dark:[&.router-link-active]:text-tdt-gold"
      >
        <Icon name="lucide:info" class="text-xl" />
        <span class="text-[9px] font-black uppercase tracking-[0.2em]"
          >About</span
        >
      </NuxtLink>

      <NuxtLink
        to="/contact"
        class="flex flex-col items-center gap-1 transition-all duration-300 text-tdt-black/40 dark:text-tdt-white/40 [&.router-link-active]:text-tdt-red dark:[&.router-link-active]:text-tdt-gold"
      >
        <Icon name="lucide:mail" class="text-xl" />
        <span class="text-[9px] font-black uppercase tracking-[0.2em]"
          >Contact</span
        >
      </NuxtLink>
    </div>
  </footer>
</template>
