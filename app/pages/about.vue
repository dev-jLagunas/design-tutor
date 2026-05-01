<script setup>
import { onMounted, onBeforeUnmount, ref } from "vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (process.client) {
  gsap.registerPlugin(ScrollTrigger);
}

const mainContainer = ref(null);
const activeIndex = ref(1);

let ctx;

const steps = [
  {
    num: "1",
    label: "PHASE_01",
    category: "The Archive",
    icon: "lucide:library",
    desc: "A rigorous cataloging of design movements. We analyze the historical context and visual impact of each style, from mathematical Swiss grids to raw Brutalism.",
    colorClass: "gold-bg",
  },
  {
    num: "2",
    label: "PHASE_02",
    category: "The Anatomy",
    icon: "lucide:fingerprint",
    desc: "We strip away the aesthetic to find the logic. This phase involves breaking down font-families, grid-lane ratios, and specific CSS variable hierarchies.",
    colorClass: "red-bg",
  },
  {
    num: "3",
    label: "PHASE_03",
    category: "The Pedagogy",
    icon: "lucide:book-open-check",
    desc: "Instruction through execution. The interface is the textbook, and every hover state is a potential lesson.",
    colorClass: "blue-bg",
  },
  {
    num: "4",
    label: "PHASE_04",
    category: "The Source",
    icon: "lucide:terminal",
    desc: "Every component is accessible. We provide production-ready source code and GSAP timelines for your projects.",
    colorClass: "gold-bg",
  },
  {
    num: "5",
    label: "PHASE_05",
    category: "The Logic",
    icon: "lucide:binary",
    desc: "Translating visual rhythm into functional code. We explore the bridge between abstract design theory and scalable frontend architecture.",
    colorClass: "blue-bg",
  },
  {
    num: "6",
    label: "PHASE_06",
    category: "The Motion",
    icon: "lucide:move",
    desc: "Adding temporal depth to static layouts. Understanding how easing functions and GSAP timelines guide user attention and narrative flow.",
    colorClass: "red-bg",
  },
  {
    num: "7",
    label: "PHASE_07",
    category: "The System",
    icon: "lucide:layout-template",
    desc: "Modular design for high-performance teams. Building component libraries that scale across diverse professional digital ecosystems.",
    colorClass: "blue-bg",
  },
  {
    num: "8",
    label: "PHASE_08",
    category: "The Context",
    icon: "lucide:layers",
    desc: "Analyzing spatial relationships within the browser. Mastering the balance between white space, density, and information hierarchy.",
    colorClass: "gold-bg",
  },
  {
    num: "9",
    label: "PHASE_09",
    category: "The Standard",
    icon: "lucide:shield-check",
    desc: "Defining modern excellence. Establishing rigorous accessibility and performance benchmarks for avant-garde visual systems.",
    colorClass: "red-bg",
  },
  {
    num: "10",
    label: "PHASE_10",
    category: "The Future",
    icon: "lucide:orbit",
    desc: "Beyond the current canvas. Iterating on emerging technologies to redefine the boundaries of interactive digital experiences.",
    colorClass: "blue-bg",
  },
];

const scrollNext = () => {
  window.scrollBy({
    top: window.innerHeight,
    behavior: "smooth",
  });
};

onMounted(() => {
  ctx = gsap.context(() => {
    // Hero entrance is now handled internally by ReusableDisplayHero

    const items = gsap.utils.toArray(".item");
    const totalItems = items.length;

    gsap.set(items.slice(1), { yPercent: 100 });

    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: mainContainer.value,
        pin: true,
        start: "top top",
        end: () => `+=${totalItems * 100}%`,
        scrub: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const index = Math.floor(self.progress * totalItems);
          activeIndex.value = Math.min(index + 1, totalItems);
        },
      },
    });

    items.forEach((item, index) => {
      if (index < totalItems - 1) {
        scrollTl
          .to(item, {
            scale: 0.85,
            opacity: 0.2,
            borderRadius: "40px",
            ease: "none",
          })
          .to(
            items[index + 1],
            {
              yPercent: 0,
              ease: "none",
            },
            "<",
          );
      }
    });
  }, mainContainer.value);
});

onBeforeUnmount(() => {
  if (ctx) {
    ctx.revert();
  }
  ScrollTrigger.getAll().forEach((t) => t.kill());
  ScrollTrigger.refresh();
});
</script>

<template>
  <div ref="mainContainer" class="deck-container">
    <div class="card-indicator">
      <span class="index-current">0{{ activeIndex }}</span>
      <span class="index-dot">.</span>
      <span class="index-total">{{
        activeIndex === 10 ? "10" : "0" + (steps.length + 1)
      }}</span>
    </div>

    <div class="wrapper">
      <!-- ITEM 0: HERO (Z-INDEX 1) -->
      <div class="item hero-item" style="z-index: 1">
        <ReusableDisplayHero
          word1="What"
          word2="IsThis"
          word3="Project?"
          tagline="Deconstructing the architectural logic, motion standards, and design systems of our scalable visual ecosystem."
          class="w-full h-full"
        >
          <template #actions>
            <NuxtLink
              to="/"
              class="group flex h-16 items-center shadow-lg justify-center gap-4 bg-tdt-gold px-10 text-[11px] font-black uppercase tracking-[0.2em] text-tdt-black transition-all hover:bg-tdt-black hover:text-tdt-white dark:hover:bg-tdt-white dark:hover:text-tdt-black"
            >
              Home
            </NuxtLink>
            <NuxtLink
              to="/contact"
              class="flex h-16 items-center justify-center px-10 text-[11px] font-black uppercase tracking-[0.2em] transition-colors hover:text-tdt-blue"
            >
              Contact
            </NuxtLink>
          </template>
        </ReusableDisplayHero>

        <button
          @click="scrollNext"
          class="scroll-hint animate-bounce"
          aria-label="Scroll to next section"
        >
          <span class="hint-text">EXPLORE</span>
          <div class="hint-line"></div>
        </button>
      </div>

      <!-- ITEMS 1-10: SYLLABUS -->
      <div
        v-for="(step, index) in steps"
        :key="step.num"
        class="item syllabus-item bg-dot-grid"
        :style="{ zIndex: index + 2 }"
      >
        <div class="item_media" :class="step.colorClass">
          <h2 class="big-number">{{ step.num }}</h2>
        </div>

        <div class="item_content">
          <div class="meta">
            <Icon :name="step.icon" class="step-icon" />
            <span class="phase-label">{{ step.label }}</span>
            <span class="category-tag">{{ step.category }}</span>
          </div>
          <h2 class="description-text">{{ step.desc }}</h2>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Core Container */
.deck-container {
  width: 100%;
  height: 100vh;
  position: relative;
  overflow: hidden;
  background: var(--color-tdt-off-white);
}
.dark .deck-container {
  background: var(--color-tdt-black);
}

.wrapper {
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 1;
}

/* Progressive Tracker */
.card-indicator {
  position: absolute;
  top: 25%;
  right: 3rem;
  transform: translateY(-50%);
  z-index: 999;
  display: flex;
  align-items: baseline;
  gap: 0.25rem;
  font-family: var(--font-display);
  font-weight: 900;
  pointer-events: none;
  mix-blend-mode: difference;
}
.index-current,
.index-dot {
  font-size: 2rem;
  color: #fff;
}
.index-total {
  font-size: 1.5rem;
  color: #fff;
  opacity: 0.5;
}

/* Item Base */
.item {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  overflow: hidden;
  background: var(--color-tdt-off-white);
  transform-origin: center center;
}
.dark .item {
  background: var(--color-tdt-black);
}

.syllabus-item {
  flex-direction: row;
}

.syllabus-item:nth-child(even) {
  flex-direction: row-reverse;
}

.item_media {
  flex: 0 0 25%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.item_content {
  flex: 0 0 75%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 10%;
}

.description-text {
  font-size: clamp(1.5rem, 3.5vw, 4rem);
  line-height: 0.9;
  font-weight: 200;
  font-family: var(--font-sans);
  text-transform: uppercase;
}
.dark .description-text {
  color: #f2f2f2;
}

.hero-item {
  position: relative;
  display: block; /* Changed to allow DisplayHero to fill normally */
}

/* Big Number Typography */
.big-number {
  font-family: var(--font-display);
  font-size: clamp(10rem, 35vw, 450px);
  line-height: 1;
  font-weight: 900;
  letter-spacing: -0.05em;
}

.meta {
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
}
.step-icon {
  font-size: 3.5rem;
  color: var(--color-tdt-blue);
  margin-bottom: 0.5rem;
}
.phase-label {
  font-size: 11px;
  font-weight: 900;
  color: var(--color-tdt-gold);
  letter-spacing: 0.3em;
}
.category-tag {
  font-family: sans-serif;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.5em;
  color: var(--color-tdt-blue);
  font-size: 12px;
}

/* Background Helpers */
.gold-bg {
  background: var(--color-tdt-gold);
  color: #222222;
}
.red-bg {
  background: var(--color-tdt-red);
  color: #fff;
}
.blue-bg {
  background: var(--color-tdt-blue);
  color: #fff;
}

.scroll-hint {
  position: absolute;
  bottom: 4rem;
  left: 50vw;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  background: transparent;
  border: none;
  cursor: pointer;
  z-index: 100;
}
.hint-text {
  font-size: 12px;
  font-weight: 900;
  letter-spacing: 0.6em;
  color: #facc15;
}
.hint-line {
  width: 2px;
  height: 80px;
  background: #facc15;
}

@keyframes bounce {
  0%,
  100% {
    transform: scaleY(1);
  }
  50% {
    transform: scaleY(1.4);
  }
}

/* Responsive */
@media (max-width: 1024px) {
  .syllabus-item {
    flex-direction: column-reverse;
  }
  .syllabus-item:nth-child(even) {
    flex-direction: column-reverse;
  }
  .item_media,
  .item_content {
    flex: 0 0 50%;
    width: 100%;
  }
  .card-indicator {
    right: 1.5rem;
    top: 0.5rem;
    transform: none;
  }
}
</style>
