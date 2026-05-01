<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  cta: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <section
    class="relative min-h-screen flex flex-col justify-center bg-white dark:bg-tdt-black px-6 py-24 md:px-12 lg:px-24 overflow-hidden"
  >
    <!-- Background Floating Image (Minimalist placement) -->
    <div
      class="absolute top-1/2 -right-20 -translate-y-1/2 w-full max-w-[50vw] aspect-[4/5] opacity-20 md:opacity-100 grayscale hover:grayscale-0 transition-all duration-700 ease-in-out"
    >
      <img
        :src="image"
        :alt="title"
        class="w-full h-full object-cover border-l border-black/5 dark:border-white/5"
      />
    </div>

    <div class="max-w-5xl relative z-10">
      <h1
        class="font-display text-[15vw] md:text-[120px] lg:text-[160px] font-black uppercase leading-[0.85] tracking-tighter text-tdt-black dark:text-tdt-white mb-10"
      >
        {{ title }}
      </h1>

      <div
        class="flex flex-col md:flex-row md:items-end justify-between gap-12"
      >
        <p
          class="font-sans text-xl md:text-2xl leading-relaxed text-tdt-black/70 dark:text-tdt-white/60 max-w-xl"
        >
          {{ text }}
        </p>

        <button
          class="group relative flex items-center gap-4 py-4 px-8 border-2 border-tdt-black dark:border-tdt-white transition-all hover:bg-tdt-black hover:text-tdt-white dark:hover:bg-tdt-white dark:hover:text-tdt-black"
        >
          <span class="text-[10px] font-black uppercase tracking-[0.3em]">
            {{ cta }}
          </span>
          <Icon
            name="lucide:arrow-right"
            class="text-xl transition-transform group-hover:translate-x-1"
          />
        </button>
      </div>
    </div>

    <div class="absolute bottom-12 right-12 hidden lg:block opacity-10">
      <div class="w-32 h-px bg-tdt-black dark:bg-tdt-white mb-2"></div>
      <p class="text-[8px] font-mono uppercase tracking-widest leading-none">
        Min-01 / Layout.System
      </p>
    </div>
  </section>
</template>
