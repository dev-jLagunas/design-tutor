<script setup>
import gsap from "gsap";

const word1 = ref(null);
const word2 = ref(null);
const word3 = ref(null);
const tagline = ref(null);
const ctas = ref(null);

onMounted(() => {
  const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

  // 1. Initial Reveal Logic (Existing)
  gsap.set(".hero-word span", { y: "110%" });
  gsap.set([".hero-icon", tagline.value, ctas.value], { opacity: 0 });

  tl.to(".hero-word span", {
    y: "0%",
    duration: 1.5,
    stagger: 0.2,
  })
    .to(
      ".hero-icon",
      {
        opacity: (index, target) => target.dataset.opacity || 0.4, // respect data-opacity
        scale: 1,
        duration: 1,
        stagger: {
          each: 0.05,
          from: "random",
        },
      },
      "-=1",
    )
    .to(
      [tagline.value, ctas.value],
      {
        opacity: 1,
        duration: 1,
      },
      "-=0.5",
    );

  // 2. Multi-Color Highlight Loop (UPDATED)
  const highlightTl = gsap.timeline({ repeat: -1, delay: 2.5 });

  // Define targets and colors mapping
  const highlights = [
    { el: word1.value, color: "var(--color-tdt-gold)" }, // Visual -> Gold
    { el: word2.value, color: "var(--color-tdt-blue)" }, // Design -> Blue
    { el: word3.value, color: "var(--color-tdt-red)" }, // Analyzed -> Pink/Red
  ];

  highlights.forEach((item) => {
    highlightTl
      .to(item.el, {
        color: item.color,
        duration: 0.8,
        ease: "power2.inOut",
      })
      .to(
        item.el,
        {
          color: "inherit",
          duration: 0.8,
          ease: "power2.inOut",
        },
        "+=0.6",
      ); // hold color slightly longer
  });
});
</script>

<template>
  <section
    class="relative z-10 flex min-h-screen flex-col overflow-hidden px-6 py-8 md:px-12"
  >
    <div class="mx-auto w-full max-w-screen-2xl">
      <div class="relative flex flex-col gap-4 md:gap-0">
        <div class="relative flex items-center gap-8 self-start">
          <h1
            class="hero-word overflow-hidden font-display text-[18vw] font-black uppercase leading-[0.8] tracking-tighter lg:text-[180px]"
          >
            <span ref="word1" class="block transition-colors duration-300"
              >Visual</span
            >
          </h1>
          <Icon
            name="lucide:layout-template"
            class="hero-icon text-5xl text-tdt-gold md:block"
          />

          <Icon
            name="lucide:asterisk"
            class="hero-icon animate-spin-slow absolute -top-8 left-10 text-xs opacity-25"
            data-opacity="0.1"
          />
          <Icon
            name="lucide:pipette"
            class="hero-icon absolute -right-6 top-0 text-sm opacity-5 text-tdt-blue"
            data-opacity="0.15"
          />
        </div>

        <div
          class="relative flex items-center justify-end gap-12 self-end md:-mt-12"
        >
          <Icon
            name="lucide:focus"
            class="hero-icon animate-pulse-slow text-tdt-red opacity-10"
            data-opacity="0.2"
          />
          <Icon
            name="lucide:command"
            class="hero-icon text-tdt-black/20 dark:text-tdt-white/20"
            data-opacity="0.2"
          />

          <h1
            class="hero-word overflow-hidden font-display text-[18vw] font-black uppercase leading-[0.8] tracking-tighter lg:text-[180px]"
          >
            <span ref="word2" class="block transition-colors duration-300"
              >Design</span
            >
          </h1>

          <Icon
            name="lucide:fingerprint"
            class="hero-icon hidden h-16 w-16 opacity-10 md:block"
            data-opacity="0.2"
          />
        </div>

        <div
          class="relative flex items-center gap-8 self-start md:ml-24 md:-mt-8"
        >
          <Icon
            name="lucide:ruler"
            class="hero-icon absolute -top-10 left-1/2 -rotate-45 text-tdt-black/10 dark:text-tdt-white/10"
            data-opacity="0.1"
          />

          <h1
            class="hero-word overflow-hidden font-display text-[18vw] font-black uppercase leading-[0.8] tracking-tighter lg:text-[180px]"
          >
            <span ref="word3" class="block transition-colors duration-300"
              >Analyzed</span
            >
          </h1>

          <Icon
            name="lucide:scan-eye"
            class="hero-icon text-6xl text-tdt-blue opacity-30"
            data-opacity="0.4"
          />

          <Icon
            name="lucide:pentagon"
            class="hero-icon animate-spin-slow text-xs text-tdt-gold opacity-5"
            data-opacity="0.1"
          />
        </div>
      </div>

      <div
        class="mt-20 flex flex-col items-start justify-between gap-12 lg:mt-32 lg:flex-row lg:items-end"
      >
        <div ref="tagline" class="relative max-w-xl">
          <Icon
            name="lucide:circle-dot"
            class="hero-icon absolute -left-12 top-0 text-tdt-blue opacity-5"
            data-opacity="0.1"
          />

          <p
            class="font-sans text-lg font-medium leading-relaxed tracking-wide text-tdt-black/70 dark:text-tdt-white/80 md:text-xl"
          >
            A deep-dive into the mechanics of aesthetics. Standardizing visual
            analysis through scalable UX systems and research.
          </p>
          <div
            class="mt-6 flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-tdt-gold"
          >
            <span class="h-[4px] w-8 bg-tdt-gold"></span>
            <span>Juan Lagunas — 2026 Index</span>
          </div>
        </div>

        <div
          ref="ctas"
          class="flex w-full flex-col gap-4 sm:flex-row sm:w-auto shrink-0"
        >
          <NuxtLink
            to="/index"
            class="group flex h-16 items-center justify-center gap-4 bg-tdt-red px-10 text-[11px] font-black uppercase tracking-[0.2em] text-white transition-all hover:bg-tdt-black dark:hover:bg-tdt-white dark:hover:text-tdt-black"
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
        </div>
      </div>
    </div>

    <Icon
      name="lucide:shapes"
      class="hero-icon animate-spin-super-slow absolute top-20 left-1/4 text-sm text-tdt-red opacity-5"
      data-opacity="0.07"
    />
    <Icon
      name="lucide:move-diagonal"
      class="hero-icon absolute top-1/2 right-10 text-xs opacity-5"
      data-opacity="0.1"
    />
    <Icon
      name="lucide:pencil-ruler"
      class="hero-icon absolute bottom-1/4 left-10 text-xs opacity-5"
      data-opacity="0.1"
    />
    <Icon
      name="lucide:triangle"
      class="hero-icon animate-spin-slow absolute bottom-10 right-1/4 text-tdt-gold opacity-5"
      data-opacity="0.07"
    />
  </section>
</template>

<style scoped>
.hero-word {
  clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);
}

/* Custom, slow animations so they aren't distracting */
.animate-spin-slow {
  animation: spin 6s linear infinite;
}

.animate-spin-super-slow {
  animation: spin 12s linear infinite;
}

.animate-pulse-slow {
  animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes pulse {
  0%,
  100% {
    opacity: var(--opacity, 0.1);
  }
  50% {
    opacity: calc(var(--opacity, 0.1) * 2);
  }
}
</style>
