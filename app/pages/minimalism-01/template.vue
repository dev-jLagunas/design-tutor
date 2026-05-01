<script setup>
definePageMeta({ layout: "blank" });
import content from "~/data/minimalism-01/template.json";
import designs from "~/data/designs.json";
const design = designs.find((d) => d.id === "minimal-01");
</script>

<template>
  <main>
    <StylesMinimalism01MinNav
      :brand-name="content.nav.brandName"
      :tagline="content.nav.tagline"
      :links="content.nav.links"
      :toggle-route="design.learnRoute"
    />
    <StylesMinimalism01MinHero
      :title="content.heroTitle"
      :text="content.heroText"
      :cta="content.heroCta"
      :image="content.heroImage"
    />
    <StylesMinimalism01MinHistory :items="content.history" />
  </main>
</template>
