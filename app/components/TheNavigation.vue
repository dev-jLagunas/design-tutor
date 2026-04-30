<script setup>
const colorMode = useColorMode();
const isMenuOpen = ref(false);

const toggleColorMode = () => {
  colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
};

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};
</script>

<template>
  <nav
    class="relative z-50 w-full font-sans bg-tdt-black text-tdt-white dark:bg-tdt-off-white dark:text-tdt-black transition-colors duration-300 shadow-lg"
  >
    <div
      class="mx-auto flex h-20 items-center justify-between px-6 lg:h-20 lg:px-12 xl:justify-center xl:gap-36"
    >
      <div class="flex items-center gap-4 lg:gap-8">
        <NuxtLink to="/" class="flex items-center gap-4 group">
          <img
            :src="
              colorMode.value === 'dark'
                ? '/images/brand/tdt-logo-transparent.png'
                : '/images/brand/tdt-logo-transparent-dark.png'
            "
            alt="TDT Logo"
            class="h-12 w-auto lg:h-14 xl:h-20 transition-transform duration-500 group-hover:rotate-12"
          />
          <div class="flex flex-col">
            <span
              class="font-display text-xl font-black uppercase leading-none tracking-tighter lg:text-2xl"
            >
              The Design Tutor
            </span>
            <span
              class="mt-1 hidden text-xs font-medium tracking-[0.2em] text-tdt-white/75 dark:text-tdt-black/75 lg:block"
            >
              Visual designs analyzed and explained
            </span>
          </div>
        </NuxtLink>
      </div>

      <div class="hidden items-center gap-8 lg:flex">
        <div
          class="flex items-center border-b border-tdt-white/20 pb-1 dark:border-tdt-black/20"
        >
          <input
            type="text"
            placeholder="SEARCH INDEX..."
            class="bg-transparent text-[10px] font-bold tracking-widest outline-none dark:text-tdt-black text-tdt-white"
          />
          <Icon name="lucide:search" class="text-sm opacity-50" />
        </div>

        <div
          class="flex items-center gap-6 text-[11px] font-black uppercase tracking-widest"
        >
          <NuxtLink to="/about" class="hover:text-tdt-gold transition-colors"
            >About</NuxtLink
          >
          <NuxtLink to="/contact" class="hover:text-tdt-blue transition-colors"
            >Contact</NuxtLink
          >
        </div>

        <button
          @click="toggleColorMode"
          class="flex h-10 w-10 items-center justify-center rounded-full border hover:bg-tdt-black hover:text-tdt-white dark:hover:text-tdt-white dark:hover:bg-tdt-black transition-all duration-200 hover:cursor-pointer"
        >
          <Icon
            :name="colorMode.value === 'dark' ? 'lucide:sun' : 'lucide:moon'"
            class="text-lg"
          />
        </button>
      </div>

      <div class="flex items-center gap-2 lg:hidden">
        <button
          @click="toggleColorMode"
          class="text-xl p-2 hover:cursor-pointer hover:scale-105 transition-all duration-200"
        >
          <Icon
            :name="colorMode.value === 'dark' ? 'lucide:sun' : 'lucide:moon'"
            class=""
          />
        </button>

        <div class="menu-wrapper">
          <input type="checkbox" id="checkbox" v-model="isMenuOpen" />
          <label for="checkbox" class="toggle">
            <div class="bars" id="bar1"></div>
            <div class="bars" id="bar2"></div>
            <div class="bars" id="bar3"></div>
          </label>
        </div>
      </div>
    </div>

    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="translate-x-full"
      enter-to-class="translate-x-0"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="translate-x-0"
      leave-to-class="translate-x-full"
    >
      <div
        v-if="isMenuOpen"
        class="fixed inset-0 top-20 z-40 flex flex-col bg-tdt-off-white px-6 py-12 dark:bg-tdt-black lg:hidden"
      >
        <div class="mb-12">
          <span
            class="text-[10px] font-black uppercase tracking-widest text-tdt-red"
            >Navigation</span
          >
          <div class="mt-6 flex flex-col gap-8">
            <NuxtLink
              to="/about"
              @click="isMenuOpen = false"
              class="font-display text-5xl font-black uppercase tracking-tighter hover:text-tdt-gold"
              >About</NuxtLink
            >
            <NuxtLink
              to="/contact"
              @click="isMenuOpen = false"
              class="font-display text-5xl font-black uppercase tracking-tighter hover:text-tdt-blue"
              >Contact</NuxtLink
            >
          </div>
        </div>

        <div class="mt-auto border-t pt-8">
          <div
            class="flex items-center gap-4 border-b border-tdt-black/20 pb-4 dark:border-tdt-white/20"
          >
            <input
              type="text"
              placeholder="SEARCH INDEX..."
              class="w-full bg-transparent font-display text-2xl font-black uppercase outline-none"
            />
            <Icon name="lucide:search" class="text-2xl" />
          </div>
          <p
            class="mt-8 text-[10px] font-medium uppercase leading-relaxed tracking-widest opacity-50"
          >
            Visual designs analyzed and explained by Juan Lagunas
          </p>
        </div>
      </div>
    </Transition>
  </nav>
</template>

<style scoped>
#checkbox {
  display: none;
}

.toggle {
  position: relative;
  width: 30px;
  height: 30px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  transition-duration: 0.5s;
  margin-top: -5px;
}

.bars {
  width: 100%;
  height: 3px;
  background-color: var(--color-tdt-red);
  border-radius: 4px;
}

#bar2 {
  transition-duration: 0.8s;
}

#bar1,
#bar3 {
  width: 70%;
}

#checkbox:checked + .toggle .bars {
  position: absolute;
  transition-duration: 0.5s;
}

#checkbox:checked + .toggle #bar2 {
  transform: scaleX(0);
  transition-duration: 0.5s;
}

#checkbox:checked + .toggle #bar1 {
  width: 100%;
  transform: rotate(45deg);
  transition-duration: 0.5s;
}

#checkbox:checked + .toggle #bar3 {
  width: 100%;
  transform: rotate(-45deg);
  transition-duration: 0.5s;
}

#checkbox:checked + .toggle {
  transition-duration: 0.5s;
  transform: rotate(180deg);
}
</style>
