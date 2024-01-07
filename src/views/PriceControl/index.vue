<script setup>
	import { PlatformAPI } from "@/apis/platform";
	import { DepartmentAPI } from "@/apis/department";
	import { PriceSystemAPI } from "@/apis/priceSystem";
	import { ProductAPI } from "@/apis/product";
	import { PriceControlAPI } from "@/apis/priceControl";
	import { onMounted, ref, computed } from "vue";
	import { Search } from "@element-plus/icons-vue";
	const platforms = ref([]);
	const departments = ref([]);
	const priceSystems = ref([]);
	const products = ref([]);
	const priceControlList = ref([]);
	const currentPlatForm = ref();
	const currentDepartment = ref();
	const currentPriceSystem = ref();
	const currentproduct = ref();

	const getByOpts = async () => {
		let res = await PriceControlAPI.getByOpts({
			platform: currentPlatForm.value,
			department: currentDepartment.value,
			price_system_name: currentPriceSystem.value,
			product: currentproduct.value || undefined,
		});
		console.log(res.data.data);
	};
	const init = async () => {
		let res = await PlatformAPI.getAll();
		platforms.value = res.data.data;
		res = await DepartmentAPI.getAll();
		departments.value = res.data.data;
		res = await PriceSystemAPI.getAll();
		priceSystems.value = res.data.data;
		res = await ProductAPI.getAll();
		products.value = res.data.data;
	};
	onMounted(() => {
		init();
	});
</script>

<template>
	<div class="price_control">
		<div class="header">
			<el-select v-model="currentPriceSystem" placeholder="请选择价格体系">
				<el-option
					v-for="item in priceSystems"
					:key="item.id"
					:label="item.price_system_name"
					:value="item.price_system_name"
				/>
			</el-select>
			<el-select v-model="currentDepartment" placeholder="请选择部门">
				<el-option
					v-for="item in departments"
					:key="item.id"
					:label="item.department_name"
					:value="item.department_name"
				/>
			</el-select>
			<el-select v-model="currentPlatForm" placeholder="请选择平台">
				<el-option
					v-for="item in platforms"
					:key="item.id"
					:label="item.platform_name + ' ' + item.Platform_deduction_points"
					:value="item.platform_name"
				/>
			</el-select>
			<el-select v-model="currentproduct" placeholder="请选择商品">
				<el-option label="全部" value="" />
				<el-option
					v-for="item in products"
					:key="item.id"
					:label="item.name"
					:value="item.name"
				/>
			</el-select>
			<el-button type="primary" :icon="Search" @click="getByOpts" />
			<el-button type="primary">新增</el-button>
		</div>
		<div class="main"></div>
	</div>
</template>

<style scoped lang="scss"></style>
