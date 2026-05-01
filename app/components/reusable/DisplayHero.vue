<script setup>
import gsap from "gsap";

const props = defineProps({
  word1: { type: String, required: true },
  word2: { type: String, required: true },
  word3: { type: String, required: true },
  tagline: { type: String, default: "" },
});

const taglineRef = ref(null);
const fill1 = ref(null);
const fill2 = ref(null);
const fill3 = ref(null);

onMounted(() => {
  const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

  gsap.set(".hero-word-wrapper span", { y: "110%" });
  gsap.set(taglineRef.value, { opacity: 0 });
  gsap.set([fill1.value, fill2.value, fill3.value], {
    clipPath: "inset(100% 0% 0% 0%)",
  });

  tl.to(".hero-word-wrapper span", {
    y: "0%",
    duration: 0.5,
    stagger: 0.2,
  }).to(taglineRef.value, { opacity: 1, duration: 1 }, "-=0.5");

  const highlightTl = gsap.timeline({ repeat: -1, delay: 1.1 });
  const fillLayers = [fill1.value, fill2.value, fill3.value];

  highlightTl
    .to(fillLayers, {
      clipPath: "inset(0% 0% 0% 0%)",
      duration: 0.8,
      ease: "power2.inOut",
      stagger: 0.8,
    })
    .to(
      fillLayers,
      {
        clipPath: "inset(0% 0% 100% 0%)",
        duration: 0.8,
        ease: "power2.inOut",
      },
      "+=1.5",
    )
    .set(fillLayers, { clipPath: "inset(100% 0% 0% 0%)" });
});
</script>

<template>
  <section
    class="bg-dot-grid relative z-10 flex flex-col overflow-hidden px-6 py-12 md:px-12"
  >
    <div class="mx-auto w-full">
      <div class="relative flex flex-col">
        <!-- Line 1 (5 Icons) -->
        <div class="relative self-start flex items-center gap-4 md:gap-8">
          <h1
            class="hero-word-wrapper relative overflow-hidden font-display text-[18vw] font-black uppercase leading-[0.8] tracking-tighter lg:text-[180px] xl:text-[250px]"
          >
            <span class="block text-tdt-black/20 dark:text-tdt-white/10">{{
              word1
            }}</span>
            <span ref="fill1" class="absolute inset-0 block text-tdt-gold">{{
              word1
            }}</span>
          </h1>
          <Icon
            name="lucide:asterisk"
            class="animate-spin-slow text-5xl md:text-6xl text-tdt-gold"
          />
          <Icon
            name="lucide:code-2"
            class="animate-spin-slow text-2xl md:text-3xl text-tdt-blue opacity-60"
          />
          <Icon
            name="lucide:palette"
            class="animate-spin-slow text-3xl md:text-4xl text-tdt-red opacity-60"
          />
          <Icon
            name="lucide:layout-panel-left"
            class="animate-spin-slow hidden lg:block text-2xl text-tdt-gold opacity-40"
          />
          <Icon
            name="lucide:framer"
            class="animate-spin-slow hidden lg:block text-3xl text-tdt-blue opacity-40"
          />
        </div>

        <!-- Line 2 (5 Icons) -->
        <div class="relative self-end flex items-center gap-4 md:gap-8">
          <Icon
            name="lucide:git-branch"
            class="animate-spin-slow hidden lg:block text-2xl text-tdt-red opacity-40"
          />
          <Icon
            name="lucide:pencil-ruler"
            class="animate-spin-slow hidden lg:block text-3xl text-tdt-blue opacity-40"
          />
          <Icon
            name="lucide:mouse-pointer-2"
            class="animate-spin-slow text-3xl hidden md:block md:text-4xl text-tdt-gold opacity-60"
          />
          <Icon
            name="lucide:box"
            class="animate-spin-slow text-2xl md:text-3xl text-tdt-red opacity-60"
          />
          <Icon
            name="lucide:command"
            class="animate-spin-slow text-4xl md:text-5xl text-tdt-blue"
          />
          <h1
            class="hero-word-wrapper relative overflow-hidden font-display text-[18vw] font-black uppercase leading-[0.8] tracking-tighter lg:text-[180px] xl:text-[250px]"
          >
            <span class="block text-tdt-black/20 dark:text-tdt-white/10">{{
              word2
            }}</span>
            <span ref="fill2" class="absolute inset-0 block text-tdt-blue">{{
              word2
            }}</span>
          </h1>
        </div>

        <!-- Line 3 (8 Icons to hit 18 total) -->
        <div class="relative self-start flex items-center gap-4 md:gap-8">
          <h1
            class="hero-word-wrapper relative overflow-hidden font-display text-[18vw] font-black uppercase leading-[0.8] tracking-tighter lg:text-[180px] xl:text-[250px]"
          >
            <span class="block text-tdt-black/20 dark:text-tdt-white/10 pr-1">{{
              word3
            }}</span>
            <span ref="fill3" class="absolute inset-0 block text-tdt-red">{{
              word3
            }}</span>
          </h1>

          <Icon
            name="lucide:component"
            class="animate-spin-slow text-5xl md:text-6xl text-tdt-gold"
          />
          <Icon
            name="lucide:terminal"
            class="animate-spin-slow text-2xl md:text-3xl text-tdt-blue opacity-60"
          />
          <Icon
            name="lucide:layers"
            class="animate-spin-slow text-3xl md:text-4xl text-tdt-red opacity-60"
          />
          <Icon
            name="lucide:wand-2"
            class="animate-spin-slow hidden lg:block text-2xl text-tdt-gold opacity-40"
          />
          <Icon
            name="lucide:cpu"
            class="animate-spin-slow hidden lg:block text-3xl text-tdt-blue opacity-40"
          />
          <Icon
            name="lucide:mouse-pointer-click"
            class="animate-spin-slow text-4xl text-tdt-red"
          />
          <Icon
            name="lucide:sparkles"
            class="animate-spin-slow text-2xl text-tdt-gold opacity-60"
          />
          <Icon
            name="lucide:layout-template"
            class="animate-spin-slow text-3xl text-tdt-blue opacity-40"
          />
        </div>
      </div>

      <div
        class="mt-4 flex flex-col items-start justify-between lg:flex-row lg:items-end"
      >
        <div v-if="tagline" ref="taglineRef" class="relative max-w-2xl">
          <p
            class="font-sans text-lg font-medium leading-relaxed tracking-wide text-tdt-black/70 dark:text-tdt-white/80 md:text-xl xl:text-2xl lg:pr-12"
          >
            {{ tagline }}
          </p>
        </div>
        <div
          class="mt-4 flex w-full flex-col gap-4 sm:ml-auto sm:w-auto sm:flex-row shrink-0"
        >
          <slot name="actions" />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero-word-wrapper {
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
