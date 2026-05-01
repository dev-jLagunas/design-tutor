<script setup>
defineProps({
  items: {
    type: Array,
    required: true,
  },
});
</script>

<template>
  <section class="bg-white dark:bg-tdt-black px-6 py-24 md:px-12 lg:px-24">
    <div class="max-w-7xl mx-auto">
      <div
        v-for="(item, index) in items"
        :key="item.id"
        class="group flex flex-col md:flex-row gap-12 py-16 border-t border-black/10 dark:border-white/10 last:border-b"
      >
        <!-- Index/Label Column -->
        <div class="w-full md:w-1/4">
          <span
            class="text-[10px] font-black uppercase tracking-[0.4em] opacity-40"
          >
            {{ item.label }}
          </span>
        </div>

        <!-- Content Column -->
        <div class="w-full md:w-2/4">
          <h3
            class="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none mb-6"
          >
            {{ item.title }}
          </h3>
          <p
            class="text-lg md:text-xl text-black/60 dark:text-white/50 leading-relaxed max-w-md"
          >
            {{ item.description }}
          </p>
        </div>

        <!-- Image Column -->
        <div
          class="w-full md:w-1/4 overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700 aspect-[4/5] bg-neutral-100"
        >
          <img
            :src="item.image"
            :alt="item.title"
            class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        </div>
      </div>
    </div>
  </section>
</template>
