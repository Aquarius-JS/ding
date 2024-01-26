import { createRouter, createWebHistory } from "vue-router";
import Product from "@/views/Product/index.vue";
import Layout from "@/views/Layout/index.vue";
import Department from "@/views/Department/index.vue";
import PriceSystem from "@/views/PriceSystem/index.vue";
import Platform from "@/views/Platform/index.vue";
import ProfitTarget from "@/views/ProfitTarget/index.vue";
import PriceControl from "@/views/PriceControl/index.vue";
import Login from "@/views/Login/index.vue";
import { storeToRefs } from "pinia";
import { useUserInfoStore } from "@/stores/user";

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/",
			component: Layout,
			children: [
				{
					path: "",
					redirect: "/product",
				},
				{
					path: "product",
					component: Product,
				},
				{
					path: "/department",
					component: Department,
				},
				{
					path: "/price_system",
					component: PriceSystem,
				},
				{
					path: "/platform",
					component: Platform,
				},
				{
					path: "/profit_target",
					component: ProfitTarget,
				},
				{
					path: "/price_control",
					component: PriceControl,
				},
			],
		},
		{
			path: "/login",
			component: Login,
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
