<script setup>
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
];

onMounted(() => {
  const ctx = gsap.context(() => {
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
  });
});
</script>

<template>
  <div ref="mainContainer" class="deck-container">
    <div class="grid-overlay"></div>

    <div class="wrapper">
      <!-- ITEM 0: HERO -->
      <div class="item hero-item" style="z-index: 1">
        <div class="hero-content">
          <div class="hero-line left">
            <h1 class="hero-word">
              <span class="base-text">What</span>
              <span ref="fill1" class="fill-text gold">What</span>
            </h1>
            <Icon name="lucide:help-circle" class="hero-icon gold-icon" />
          </div>

          <div class="hero-line center">
            <h1 class="hero-word">
              <span class="base-text">Actually</span>
              <span ref="fill2" class="fill-text blue">Actually</span>
            </h1>
          </div>

          <div class="hero-line right">
            <h1 class="hero-word">
              <span class="base-text">is this</span>
              <span ref="fill3" class="fill-text red">is this</span>
            </h1>
            <span class="period">.</span>
          </div>
        </div>

        <div class="scroll-hint">
          <span class="hint-text">Scroll Down</span>
          <div class="hint-line"></div>
        </div>
      </div>

      <!-- ITEMS 1-4: SYLLABUS -->
      <div
        v-for="(step, index) in steps"
        :key="step.num"
        class="item syllabus-item"
        :style="{ zIndex: index + 2 }"
      >
        <!-- 25% Color Block -->
        <div class="item_media" :class="step.colorClass">
          <h2 class="big-number">{{ step.num }}</h2>
        </div>

        <!-- 75% Content -->
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

    <!-- Progress Tracker (Placed last for highest stack) -->
    <div class="card-indicator">
      <span class="index-current">0{{ activeIndex }}</span>
      <span class="index-dot">.</span>
      <span class="index-total">0{{ steps.length + 1 }}</span>
    </div>
  </div>
</template>

<style scoped>
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

.grid-overlay {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  opacity: 0.3;
  background-size: 40px 40px;
  background-image:
    linear-gradient(to right, rgba(0, 0, 0, 0.05) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(0, 0, 0, 0.05) 1px, transparent 1px);
}

.dark .grid-overlay {
  opacity: 0.1;
  background-image:
    linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px);
}

.card-indicator {
  position: absolute;
  top: 3rem;
  right: 3rem;
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
  font-size: 3rem;
  color: #fff;
}
.index-dot {
  font-size: 1.5rem;
  color: #fff;
}
.index-total {
  font-size: 1.2rem;
  color: #fff;
  opacity: 0.5;
}

.wrapper {
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 1;
}

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

/* Hero */
.hero-item {
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 10rem 5% 0;
}

.hero-content {
  width: 100%;
  display: flex;
  flex-direction: column;
}
.hero-line {
  display: flex;
  align-items: center;
  gap: 2rem;
}
.hero-line.left {
  align-self: flex-start;
}
.hero-line.center {
  align-self: center;
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
.gold {
  color: #facc15;
}
.blue {
  color: #3b82f6;
}
.red {
  color: #ef4444;
}

.hero-icon {
  font-size: clamp(4rem, 10vw, 8rem);
  color: #facc15;
  animation: spin 20s linear infinite;
}
.period {
  font-family: var(--font-display);
  font-size: clamp(4rem, 10vw, 10rem);
  color: #facc15;
}

/* Syllabus */
.syllabus-item {
  flex-direction: row;
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

.meta {
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
}
.step-icon {
  font-size: 3rem;
  color: var(--color-tdt-blue);
  margin-bottom: 1.5rem;
}
.phase-label {
  font-size: 11px;
  font-weight: 900;
  color: var(--color-tdt-gold);
  letter-spacing: 0.3em;
  margin-bottom: 0.5rem;
}
.category-tag {
  font-family: sans-serif;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.5em;
  color: var(--color-tdt-blue);
  font-size: 12px;
}

.description-text {
  font-family: var(--font-sans);
  font-size: clamp(1.5rem, 4vw, 4rem);
  line-height: 0.9;
  font-weight: 200;
}

.dark .description-text {
  color: #f2f2f2;
}

.big-number {
  font-family: var(--font-display);
  font-size: clamp(8rem, 25vw, 500px);
  line-height: 1;
  font-weight: 900;
  letter-spacing: -0.05em;
}

/* Colors */
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

/* Utils */
.scroll-hint {
  position: absolute;
  bottom: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}
.hint-text {
  font-size: 10px;
  font-weight: 900;
  letter-spacing: 0.5em;
  color: #facc15;
}
.hint-line {
  width: 1px;
  height: 50px;
  background: rgba(250, 204, 21, 0.3);
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@media (max-width: 1024px) {
  .syllabus-item {
    flex-direction: column-reverse;
  }
  .item_media,
  .item_content {
    flex: 0 0 50%;
    width: 100%;
  }
}
</style>
