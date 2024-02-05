import { ref } from "vue";
import { defineStore } from "pinia";

export const useUserInfoStore = defineStore(
	"userInfo",
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
