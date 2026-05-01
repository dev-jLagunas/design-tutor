<template>
  <footer
    class="hidden bg-dot-grid w-full py-16 px-12 transition-colors duration-300 dark:bg-tdt-off-white dark:text-tdt-black md:block"
  >
    <div class="mx-auto flex max-w-screen-2xl flex-col gap-12">
      <div class="flex items-end justify-between">
        <div>
          <h2
            class="font-display text-7xl font-black uppercase tracking-tighter leading-[0.8]"
          >
            The Design<br />Tutor
          </h2>
          <p
            class="mt-6 max-w-xs text-xs font-medium leading-relaxed tracking-widest opacity-60"
          >
            Visual designs analyzed and explained by Juan Lagunas.
          </p>
        </div>

        <div
          class="flex flex-col items-end gap-2 text-[10px] font-black uppercase tracking-widest"
        >
          <span class="text-tdt-red">Index 2026</span>
          <span>Hakusan, Japan</span>
        </div>
      </div>

      <div class="flex justify-between items-center pt-12">
        <div
          class="flex gap-8 text-[11px] font-black uppercase tracking-widest"
        >
          <NuxtLink to="/about" class="hover:text-tdt-gold transition-colors"
            >About</NuxtLink
          >
          <NuxtLink to="/contact" class="hover:text-tdt-blue transition-colors"
            >Contact</NuxtLink
          >
        </div>
        <p class="text-[10px] font-medium opacity-40">
          © {{ new Date().getFullYear() }} Juan Lagunas.
        </p>
      </div>
    </div>
  </footer>
</template>
