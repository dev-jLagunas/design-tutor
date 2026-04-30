<script setup>
import gsap from "gsap";

const tagline = ref(null);
const ctas = ref(null);

const fill1 = ref(null);
const fill2 = ref(null);
const fill3 = ref(null);

onMounted(() => {
  const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

  // Initial Reveal (Crop in from bottom) - UNTOUCHED
  gsap.set(".hero-word span", { y: "110%" });
  gsap.set([tagline.value, ctas.value], { opacity: 0 });

  gsap.set([fill1.value, fill2.value, fill3.value], {
    clipPath: "inset(100% 0% 0% 0%)",
  });

  tl.to(".hero-word span", {
    y: "0%",
    duration: 1.5,
    stagger: 0.2,
  }).to(
    [tagline.value, ctas.value],
    {
      opacity: 1,
      duration: 1,
    },
    "-=0.5",
  );

  // highlightTl - MODIFIED ONLY
  const highlightTl = gsap.timeline({ repeat: -1, delay: 2.5 });
  const fillLayers = [fill1.value, fill2.value, fill3.value];

  highlightTl
    // 1. Build up: Fill one by one, staggered, and HOLD colors
    .to(fillLayers, {
      clipPath: "inset(0% 0% 0% 0%)",
      duration: 0.8,
      ease: "power2.inOut",
      stagger: 0.8, // standard sequential fill
    })
    // 2. Unfill ALL simultaneously after a distinct pause
    .to(
      fillLayers,
      {
        clipPath: "inset(0% 0% 100% 0%)", // Empties out visually
        duration: 0.8,
        ease: "power2.inOut",
        // Simultaneous, no stagger here
      },
      "+=1.5", // hold fully filled state for 1.5s
    )
    // 3. Reset instant to initial bottom clip for loop restart
    .set(fillLayers, { clipPath: "inset(100% 0% 0% 0%)" });
});
</script>

<template>
  <section
    class="relative z-10 flex min-h-screen flex-col overflow-hidden px-6 py-12 md:px-12"
  >
    <div class="mx-auto w-full max-w-7xl">
      <div class="relative flex flex-col">
        <div class="relative self-start flex items-center gap-4 md:gap-8">
          <h1
            class="hero-word relative overflow-hidden font-display text-[18vw] font-black uppercase leading-[0.8] tracking-tighter lg:text-[180px] xl:text-[250px]"
          >
            <span class="block text-tdt-black/20 dark:text-tdt-white/10"
              >Visual</span
            >
            <span
              ref="fill1"
              class="absolute inset-0 block text-tdt-gold"
              aria-hidden="true"
              >Visual</span
            >
          </h1>
          <Icon
            name="lucide:asterisk"
            class="text-5xl md:text-6xl text-tdt-gold animate-spin-slow"
          />
          <Icon
            name="lucide:code-2"
            class="text-2xl md:text-3xl text-tdt-blue animate-spin-slow opacity-60"
          />
          <Icon
            name="lucide:palette"
            class="text-3xl md:text-4xl text-tdt-red animate-spin-slow opacity-60"
          />
        </div>

        <div class="relative self-end flex items-center gap-4 md:gap-8">
          <Icon
            name="lucide:mouse-pointer-2"
            class="text-3xl md:text-4xl text-tdt-gold animate-spin-slow opacity-60"
          />
          <Icon
            name="lucide:box"
            class="text-2xl md:text-3xl text-tdt-red animate-spin-slow opacity-60"
          />
          <Icon
            name="lucide:command"
            class="text-4xl md:text-5xl text-tdt-blue animate-spin-slow"
          />
          <h1
            class="hero-word relative overflow-hidden font-display text-[18vw] font-black uppercase leading-[0.8] tracking-tighter lg:text-[180px] xl:text-[250px]"
          >
            <span class="block text-tdt-black/20 dark:text-tdt-white/10"
              >Styles</span
            >
            <span
              ref="fill2"
              class="absolute inset-0 block text-tdt-blue"
              aria-hidden="true"
              >Styles</span
            >
          </h1>
        </div>

        <div class="relative self-start flex items-baseline">
          <h1
            class="hero-word relative overflow-hidden font-display text-[18vw] font-black uppercase leading-[0.8] tracking-tighter lg:text-[180px] xl:text-[250px]"
          >
            <span class="block text-tdt-black/20 dark:text-tdt-white/10 pr-1"
              >Explained</span
            >
            <span
              ref="fill3"
              class="absolute inset-0 block text-tdt-red"
              aria-hidden="true"
              >Explained</span
            >
          </h1>
          <span
            class="font-display text-[18vw] md:text-[100px] lg:text-[160px] -ml-2 leading-none text-tdt-gold animate-pulse"
            >.</span
          >
        </div>
      </div>

      <div
        class="mt-4 flex flex-col items-start justify-between lg:flex-row lg:items-end"
      >
        <div ref="tagline" class="relative max-w-xl">
          <p
            class="font-sans text-lg font-medium leading-relaxed tracking-wide text-tdt-black/70 dark:text-tdt-white/80 md:text-xl"
          >
            An open library of design styles, history, and fundamental rules for
            the modern designer.
          </p>
        </div>

        <div
          ref="ctas"
          class="mt-4 flex w-full flex-col gap-4 sm:ml-auto sm:w-auto sm:flex-row shrink-0"
        >
          <NuxtLink
            to="/index"
            class="group flex h-16 items-center justify-center gap-4 bg-tdt-gold px-10 text-[11px] font-black uppercase tracking-[0.2em] text-tdt-black transition-all hover:bg-tdt-black hover:text-tdt-white dark:hover:bg-tdt-white dark:hover:text-tdt-black"
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
  </section>
</template>

<style scoped>
.hero-word {
  clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);
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

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}
</style>
