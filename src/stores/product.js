import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useProductStore = defineStore("product", () => {
	const productList = ref("");
	return {
		productList,
	};
});
