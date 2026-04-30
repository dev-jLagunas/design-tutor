import { defineStore } from "pinia";
import designsData from "~/data/designs.json";

export const useDesignStore = defineStore("designStore", () => {
  // State
  const allDesigns = ref(designsData);
  const searchQuery = ref("");
  const activeCategory = ref("All");

  // Logic: Double-pass filtering
  const filteredDesigns = computed(() => {
    return allDesigns.value.filter((design) => {
      // Pass 1: Category Filter
      const matchesCategory =
        activeCategory.value === "All" ||
        design.category === activeCategory.value;

      // Pass 2: Search Filter (Title, Tags, or Description)
      const query = searchQuery.value.toLowerCase();
      const matchesSearch =
        design.title.toLowerCase().includes(query) ||
        design.description.toLowerCase().includes(query) ||
        design.tags.some((tag) => tag.toLowerCase().includes(query));

      return matchesCategory && matchesSearch;
    });
  });

  // Derive unique categories for the navigation
  const categories = computed(() => {
    return ["All", ...new Set(designsData.map((d) => d.category))];
  });

  return {
    searchQuery,
    activeCategory,
    filteredDesigns,
    categories,
    allDesigns,
  };
});
