import { ref } from "vue";
import { defineStore } from "pinia";

export const useUserInfoStore = defineStore(
	"user",
	() => {
		const userInfo = ref({});
		return {
			userInfo,
		};
	},
	{
		persist: true,
	}
);
