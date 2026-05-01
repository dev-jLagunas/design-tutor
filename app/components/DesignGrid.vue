<script setup>
import { useDesignStore } from "~/stores/useDesignStore";
import gsap from "gsap";

const store = useDesignStore();

const designIcons = [
  "lucide:swatch-book",
  "lucide:pencil-ruler",
  "lucide:component",
  "lucide:layout-template",
  "lucide:shapes",
  "lucide:frame",
];

// Typewriter Logic
const fullPlaceholder = "START TYPING...";
const currentPlaceholder = ref("");
let charIndex = 0;

const typeWriter = () => {
  if (charIndex < fullPlaceholder.length) {
    currentPlaceholder.value += fullPlaceholder.charAt(charIndex);
    charIndex++;
    setTimeout(typeWriter, 150);
  } else {
    setTimeout(() => {
      currentPlaceholder.value = "";
      charIndex = 0;
      typeWriter();
    }, 2000);
  }
};

onMounted(() => {
  typeWriter();
});

// Pure aesthetic interaction
const onMouseEnter = (el) => {
  gsap.to(el.querySelector(".card-title"), {
    x: 12,
    duration: 0.4,
    ease: "power2.out",
  });
};

const onMouseLeave = (el) => {
  gsap.to(el.querySelector(".card-title"), {
    x: 0,
    duration: 0.4,
    ease: "power2.inOut",
  });
};
</script>

<template>
  <section
    id="design-grid"
    class="bg-dot-grid pb-24 px-6 md:px-12 bg-tdt-off-white dark:bg-tdt-black transition-colors duration-500"
  >
    <!-- Search Logic -->
    <div
      class="mb-8 border-b border-tdt-black/10 dark:border-tdt-white/10 pb-12"
    >
      <div class="flex flex-col gap-6">
        <span
          class="text-[11px] font-black uppercase tracking-[0.5em] text-tdt-gold"
          >Search Designs</span
        >
        <input
          v-model="store.searchQuery"
          type="text"
          :placeholder="currentPlaceholder"
          class="w-full bg-transparent text-[10vw] lg:text-[140px] font-display uppercase outline-none placeholder:text-tdt-black/25 dark:placeholder:text-tdt-white/25 leading-none tracking-tighter focus:text-tdt-gold transition-colors"
        />

        <nav class="flex flex-wrap gap-x-8 gap-y-4 justify-start">
          <button
            v-for="cat in store.categories"
            :key="cat"
            @click="store.activeCategory = cat"
            :class="[
              'text-[12px] font-black uppercase tracking-widest transition-all duration-300 hover:cursor-pointer',
              store.activeCategory === cat
                ? 'text-tdt-red'
                : 'opacity-30 hover:opacity-100 hover:text-tdt-blue',
            ]"
          >
            {{ cat }}
          </button>
        </nav>
      </div>
    </div>

    <!-- The Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-12">
      <div
        v-for="(design, index) in store.filteredDesigns"
        :key="design.id"
        @mouseenter="onMouseEnter($event.currentTarget)"
        @mouseleave="onMouseLeave($event.currentTarget)"
        class="group relative flex flex-col border border-tdt-black/10 dark:border-tdt-white/10 p-4 transition-all duration-300 hover:scale-95 hover:border-2 hover:border-tdt-gold hover:shadow-xl rounded-none"
      >
        <div class="flex justify-between items-start mb-4">
          <div class="flex flex-col">
            <span class="text-[10px] font-black text-tdt-gold"
              >VOL_0{{ index + 1 }}</span
            >
            <span
              class="text-[9px] opacity-40 uppercase font-mono tracking-tighter"
              >Edition.2026</span
            >
          </div>
          <Icon
            :name="designIcons[index % designIcons.length]"
            class="text-2xl text-tdt-blue opacity-40"
          />
        </div>

        <!-- REFACTORED TITLE BLOCK WITH IMAGE -->
        <div class="">
          <span
            class="text-[10px] font-black uppercase text-tdt-blue mb-4 block tracking-tight"
            >{{ design.category }}</span
          >
          <div class="flex items-start gap-4">
            <h2
              class="card-title font-display text-6xl lg:text-7xl uppercase leading-[0.8] tracking-tighter transition-colors group-hover:text-tdt-gold max-w-[3ch] break-all inline-block shrink-0"
              v-html="design.title"
            ></h2>

            <!-- Design Preview Image -->
            <div
              v-if="design.image"
              class="w-full h-64 overflow-hidden shadow-lg border border-tdt-black/5 dark:border-tdt-white/5 grayscale group-hover:grayscale-0 transition-all duration-500"
            >
              <img
                :src="design.image"
                :alt="design.title"
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>
          </div>
        </div>

        <p
          class="font-sans text-sm leading-relaxed text-tdt-black/60 dark:text-tdt-white/60 mb-12 italic border-l-2 border-tdt-black/5 pl-4"
        >
          {{ design.description }}
        </p>

        <div class="mt-auto flex flex-col gap-2 relative z-10">
          <NuxtLink
            :to="`/designs/${design.slug}`"
            class="h-14 flex items-center justify-center rounded-none bg-tdt-black text-[10px] font-black uppercase tracking-[0.2em] text-tdt-white transition-colors duration-300 hover:bg-tdt-gold hover:text-tdt-black dark:bg-tdt-white dark:text-tdt-black dark:hover:bg-tdt-gold dark:hover:text-tdt-black"
          >
            Learn Design
          </NuxtLink>

          <NuxtLink
            :to="design.marketUrl"
            target="_blank"
            class="h-12 flex items-center justify-center rounded-none border-2 border-tdt-black/10 text-[9px] font-black uppercase tracking-[0.3em] transition-all duration-300 hover:border-tdt-blue hover:cursor-pointer hover:text-tdt-blue hover:bg-tdt-blue/5 dark:border-tdt-white/10 dark:hover:border-tdt-blue dark:hover:text-tdt-blue"
          >
            Buy Assets — ${{ design.price }}
          </NuxtLink>
        </div>
      </div>

      <!-- Inverted "Stay Tuned" Card -->
      <div
        class="group flex flex-col p-8 border border-tdt-black/10 dark:border-tdt-white/10 rounded-none bg-tdt-black text-tdt-white dark:bg-tdt-off-white dark:text-tdt-black"
      >
        <div class="flex justify-between items-start mb-12">
          <div class="flex flex-col">
            <span class="text-[10px] font-black text-tdt-gold">VOL_NEXT</span>
            <span
              class="text-[9px] opacity-40 uppercase font-mono tracking-tighter"
              >Rolling Updates</span
            >
          </div>
          <Icon
            name="lucide:refresh-cw"
            class="text-2xl text-tdt-gold opacity-100 animate-spin-slow"
          />
        </div>

        <div class="mb-8">
          <span
            class="text-[10px] font-black uppercase text-tdt-blue mb-4 block tracking-tight"
            >Always Building</span
          >
          <div class="flex items-start gap-4">
            <h2
              class="font-display text-6xl lg:text-7xl uppercase leading-[0.8] tracking-tighter max-w-[3ch] break-all shrink-0"
            >
              Still Building
            </h2>

            <!-- Visual Placeholder for Upcoming Content -->
            <div
              class="w-full h-48 lg:h-64 overflow-hidden border border-white/10 dark:border-black/10 grayscale group-hover:grayscale-0 transition-all duration-500"
            >
              <img
                src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=800"
                alt="Future Designs"
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>
          </div>
        </div>

        <p
          class="font-sans text-sm leading-relaxed opacity-70 mb-12 italic border-l-2 border-tdt-gold/50 pl-4"
        >
          I am constantly releasing new design systems and experiments. Make
          sure to stop by every 2 weeks for fresh drops.
        </p>

        <div class="mt-auto flex flex-col gap-2 relative z-10">
          <NuxtLink
            to="https://gumroad.com"
            target="_blank"
            class="h-14 flex items-center justify-center rounded-none bg-tdt-gold text-[10px] font-black uppercase tracking-[0.2em] text-tdt-black hover:bg-tdt-white hover:text-tdt-black transition-colors duration-300"
          >
            Buy Code
          </NuxtLink>

          <NuxtLink
            to="#"
            class="h-12 flex items-center justify-center rounded-none border-2 border-tdt-white/20 dark:border-tdt-black/20 text-[9px] font-black uppercase tracking-[0.3em] hover:bg-tdt-red hover:border-tdt-red hover:text-white transition-all duration-300"
          >
            Buy Me Coffee
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.font-display {
  font-family: "Marvin Visions Variable", sans-serif;
}

.animate-spin-slow {
  animation: spin 8s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
