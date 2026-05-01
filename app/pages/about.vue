<script setup>
import { onMounted, onBeforeUnmount, ref } from "vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (process.client) {
  gsap.registerPlugin(ScrollTrigger);
}

const mainContainer = ref(null);
const activeIndex = ref(1);
const fill1 = ref(null);
const fill2 = ref(null);
const fill3 = ref(null);

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
    const heroTl = gsap.timeline({ defaults: { ease: "power4.out" } });
    gsap.set(".hero-word span", { y: "110%" });
    gsap.set([fill1.value, fill2.value, fill3.value], {
      clipPath: "inset(100% 0% 0% 0%)",
    });

    heroTl.to(".hero-word span", { y: "0%", duration: 0.6, stagger: 0.15 });

    const highlightTl = gsap.timeline({ repeat: -1, delay: 1 });
    highlightTl
      .to([fill1.value, fill2.value, fill3.value], {
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 0.8,
        stagger: 0.8,
      })
      .to(
        [fill1.value, fill2.value, fill3.value],
        { clipPath: "inset(0% 0% 100% 0%)", duration: 0.8 },
        "+=1.5",
      )
      .set([fill1.value, fill2.value, fill3.value], {
        clipPath: "inset(100% 0% 0% 0%)",
      });

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
    ctx.revert(); // Reverts the DOM to its pre-GSAP state
  }

  // The Nuclear Option: Kill every active ScrollTrigger globally
  ScrollTrigger.getAll().forEach((t) => t.kill());

  // Reset the global refresh state so Index.vue starts fresh
  ScrollTrigger.refresh();
});
</script>

<template>
  <div ref="mainContainer" class="deck-container">
    <!-- Progressive Tracker remains on top -->
    <div class="card-indicator">
      <span class="index-current">0{{ activeIndex }}</span>
      <span class="index-dot">.</span>
      <span class="index-total">{{
        activeIndex === 10 ? "10" : "0" + (steps.length + 1)
      }}</span>
    </div>

    <div class="wrapper">
      <!-- ITEM 0: HERO (Z-INDEX 1) -->
      <div class="item hero-item bg-dot-grid" style="z-index: 1">
        <div class="hero-decor-layer">
          <Icon name="lucide:layers-3" class="hero-icon blue-icon pos-b" />
          <Icon name="lucide:component" class="hero-icon red-icon pos-c" />
          <Icon
            name="lucide:binary"
            class="hero-icon gold-icon pos-d opacity-20"
          />
        </div>

        <div class="hero-content">
          <div class="hero-line right">
            <h1 class="hero-word">
              <span class="base-text">What</span>
              <span ref="fill1" class="fill-text gold">What</span>
            </h1>
          </div>

          <div class="hero-line left">
            <h1 class="hero-word">
              <span class="base-text">Actually</span>
              <span ref="fill2" class="fill-text blue">Actually</span>
            </h1>
          </div>

          <div class="hero-line right">
            <h1 class="hero-word relative">
              <span class="base-text">is this</span>
              <span ref="fill3" class="fill-text red">is this</span>
              <span class="period absolute right-0">?</span>
            </h1>
          </div>

          <div class="hero-intro-text text-2xl mt-16 max-w-4xl">
            <p>
              Deconstructing the architectural logic, motion standards, and
              design systems of our scalable visual ecosystem.
            </p>
          </div>
        </div>

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
        <!-- The Number Block -->
        <div class="item_media" :class="step.colorClass">
          <h2 class="big-number">{{ step.num }}</h2>
        </div>

        <!-- The Content Block -->
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
.index-current {
  font-size: 2rem;
  color: #fff;
}
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

/* Syllabus Alternation Logic */
.syllabus-item {
  flex-direction: row;
}

/* Desktop: Flip every second syllabus item (Child 3, 5, 7...) */
/* Since Child 1 is Hero, the syllabus items are Child 2, 3, 4, etc. */
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

/* Typography preservation */
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

/* Hero Specifics (preserved) */
.hero-item {
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 5rem 5% 0;
  position: relative;
}
.hero-content {
  width: 100%;
  max-width: 1600px;
  display: flex;
  flex-direction: column;
  z-index: 2;
}

.hero-intro-text {
  line-height: 0.9;
  font-weight: 200;
  font-family: var(--font-sans);
  text-transform: uppercase;
}
.hero-line {
  display: flex;
  align-items: center;
  gap: 1rem;
}
.hero-line.left {
  align-self: flex-start;
}
.hero-line.right {
  align-self: flex-end;
  align-items: baseline;
}
.hero-word {
  position: relative;
  font-family: var(--font-display);
  font-size: clamp(3rem, 15vw, 250px);
  font-weight: 900;
  text-transform: uppercase;
  line-height: 0.8;
  letter-spacing: -0.05em;
}
.base-text {
  display: block;
  color: rgba(0, 0, 0, 0.1);
}
.dark .base-text {
  color: rgba(255, 255, 255, 0.05);
}
.fill-text {
  position: absolute;
  inset: 0;
  display: block;
}
.hero-decor-layer {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 1;
}
.hero-icon {
  position: absolute;
  font-size: clamp(4rem, 8vw, 10rem);
  animation: spin 25s linear infinite;
}
.pos-a {
  top: 15%;
  right: 10%;
  color: var(--color-tdt-gold);
}
.pos-b {
  top: 55%;
  left: 5%;
  animation-direction: reverse;
  font-size: 6rem;
  opacity: 0.2;
  color: var(--color-tdt-blue);
}
.pos-c {
  bottom: 40%;
  right: 15%;
  font-size: 5rem;
  opacity: 0.2;
  color: var(--color-tdt-gold);
}
.pos-d {
  top: 10%;
  left: 20%;
  font-size: 4rem;
  color: var(--color-tdt-red);
}
.gold {
  color: #facc15;
}
.blue {
  color: #3b82f6;
}
.red {
  color: #ef4444;
}
.period {
  font-family: var(--font-display);
  font-size: clamp(4rem, 10vw, 10rem);
  color: #facc15;
}

/* Remaining Styles (preserved) */
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
.black-bg {
  background: var(--color-tdt-black);
  color: #fff;
}
.scroll-hint {
  position: absolute;
  bottom: 4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  background: transparent;
  border: none;
  cursor: pointer;
  z-index: 100;
  transition: transform 0.3s ease;
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
  animation: bounce 2s infinite ease-in-out;
  transform-origin: top;
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
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* Responsive Overrides */
@media (max-width: 1024px) {
  .syllabus-item {
    flex-direction: column-reverse;
  }
  /* Mobile Alternation: Flip every second syllabus item (Children 3, 5, 7...) */
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
