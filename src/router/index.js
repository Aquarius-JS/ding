import { createRouter, createWebHistory } from "vue-router";
import { storeToRefs } from "pinia";
import { useUserInfoStore } from "@/stores/user";

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/",
			component: () => import("@/views/Layout/index.vue"),
			children: [
				{
					path: "",
					redirect: "/product",
				},
				{
					path: "product",
					component: () => import("@/views/Product/index.vue"),
				},
				{
					path: "department",
					component: () => import("@/views/Department/index.vue"),
				},
				{
					path: "price_system",
					component: () => import("@/views/PriceSystem/index.vue"),
				},
				{
					path: "platform",
					component: () => import("@/views/Platform/index.vue"),
				},
				{
					path: "profit_target",
					component: () => import("@/views/ProfitTarget/index.vue"),
				},
				{
					path: "price_control",
					component: () => import("@/views/PriceControl/index.vue"),
				},
				{
					path: "logistics",
					component: () => import("@/views/Logistics/index.vue"),
				},
				{
					path: "frontlog",
					component: () => import("@/views/FrontLog/index.vue"),
				},
			],
		},
		{
			path: "/login",
			component: () => import("@/views/Login/index.vue"),
		},
	],
});
router.beforeEach((to, from) => {
	if (to.path === "/login") return true;
	const { userInfo } = storeToRefs(useUserInfoStore());
	if (!userInfo.value.token) {
		router.push("/login");
	}
	return true;
});

export default router;
