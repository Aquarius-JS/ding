<script setup>
	import { onMounted } from "vue";
	import { ProductAPI } from "../../apis/product";
	import { useProductStore } from "@/stores/product";
	import { storeToRefs } from "pinia";
	const { productList } = storeToRefs(useProductStore());
	onMounted(async () => {
		let res = await ProductAPI.getAll();
		console.log(res);
		productList.value = res.data;
	});
</script>

<template>
	<div class="product">
		<p v-for="item in productList" :key="item">{{ item }}</p>
	</div>
</template>

<style scoped lang="scss"></style>
