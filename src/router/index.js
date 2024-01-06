import { createRouter, createWebHistory } from "vue-router";
import Product from "@/views/Product/index.vue";
import Layout from "@/views/Layout/index.vue";
import Department from "@/views/Department/index.vue";
import PriceSystem from "@/views/PriceSystem/index.vue";
import Platform from "@/views/Platform/index.vue"
import Login from "@/views/Login/index.vue";

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
					component: Platform
				},
			],
		},
		{
			path: "/login",
			component: Login,
		},
	],
});

export default router;
