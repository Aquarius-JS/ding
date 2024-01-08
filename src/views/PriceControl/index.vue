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
	const diaLogData = ref({
		dialogVisible: false,
		isAdd: false,
		id: "",
		platform: "",
		department: "",
		product: "",
		price_system_name: "",
		control_price: "",
	});

	const getByOpts = async () => {
		let res = await PriceControlAPI.getByOpts({
			platform: currentPlatForm.value + "",
			department: currentDepartment.value,
			price_system_name: currentPriceSystem.value,
			product: currentproduct.value || undefined,
		});
		console.log(res.data.data);
		priceControlList.value = res.data.data;
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
	const addHandle = () => {
		diaLogData.value = {
			dialogVisible: true,
			isAdd: true,
			platform: "",
			department: "",
			product: "",
			price_system_name: "",
			control_price: 0,
		};
	};
	const updateHandle = data => {
		diaLogData.value = {
			...data,
			dialogVisible: true,
			isAdd: false,
		};
	};
	const confirmHandle = async () => {
		if (diaLogData.value.isAdd) {
			let res = await PriceControlAPI.add({
				platform: diaLogData.value.platform + "",
				department: diaLogData.value.department + "",
				product: diaLogData.value.product + "",
				price_system_name: diaLogData.value.price_system_name + "",
				control_price: diaLogData.value.control_price * 1,
			});
			if (res.statusText === "OK") {
				ElMessage({
					type: "success",
					message: "添加成功",
				});
				getByOpts();
			}
			diaLogData.value.dialogVisible = false;
		} else {
			let res = await PriceControlAPI.update({
				id: diaLogData.id,
				platform: diaLogData.value.platform,
				department: diaLogData.value.department,
				product: diaLogData.value.product,
				price_system_name: diaLogData.value.price_system_name,
				control_price: diaLogData.value.control_price * 1,
			});
			if (res.statusText === "OK") {
				ElMessage({
					type: "success",
					message: "更新成功",
				});
				getByOpts();
			}
			diaLogData.value.dialogVisible = false;
		}
	};
	const delHandle = async id => {
		let res = await PriceControlAPI.delById(id);
		if (res.statusText === "OK") {
			ElMessage({
				type: "success",
				message: "删除成功",
			});
			getByOpts();
		}
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
			<el-select v-model="currentproduct" filterable placeholder="请选择商品">
				<el-option label="全部" value="" />
				<el-option
					v-for="item in products"
					:key="item.id"
					:label="item.name"
					:value="item.name"
				/>
			</el-select>
			<el-button type="primary" :icon="Search" @click="getByOpts" />
			<el-button type="primary" @click="addHandle">新增</el-button>
		</div>
		<div class="main">
			<el-table :data="priceControlList" height="250" style="width: 100%" border>
				<el-table-column prop="price_system_name" label="价格体系" width="180" />
				<el-table-column prop="department" label="部门" width="180" />
				<el-table-column prop="platform" label="平台" />
				<el-table-column prop="product" label="产品" />
				<el-table-column prop="control_price" label="控价(元)" />
				<el-table-column label="操作" #default="{ row }">
					<div>
						<el-button type="danger" size="small" plain @click="delHandle(row.id)"
							>删除</el-button
						>
						<el-button type="success" size="small" plain @click="updateHandle(row)"
							>修改</el-button
						>
					</div>
				</el-table-column>
			</el-table>
		</div>
		<el-dialog
			v-model="diaLogData.dialogVisible"
			title="Tips"
			width="30%"
			:before-close="handleClose"
		>
			<template #header>
				<span>{{ diaLogData.isAdd ? "新增" : "修改" }}</span>
			</template>
			<template #default>
				<div>
					<el-form :model="diaLogData" label-width="100px">
						<el-form-item label="价格体系">
							<el-select
								v-model="diaLogData.price_system_name"
								placeholder="请选择价格体系"
							>
								<el-option
									v-for="item in priceSystems"
									:key="item.id"
									:label="item.price_system_name"
									:value="item.price_system_name"
								/>
							</el-select>
						</el-form-item>
						<el-form-item label="部门">
							<el-select v-model="diaLogData.department" placeholder="请选择部门">
								<el-option
									v-for="item in departments"
									:key="item.id"
									:label="item.department_name"
									:value="item.department_name"
								/>
							</el-select>
						</el-form-item>
						<el-form-item label="平台">
							<el-select v-model="diaLogData.platform" placeholder="请选择平台">
								<el-option
									v-for="item in platforms"
									:key="item.id"
									:label="
										item.platform_name + ' ' + item.Platform_deduction_points
									"
									:value="item.platform_name"
								/>
							</el-select>
						</el-form-item>
						<el-form-item label="商品">
							<el-select
								v-model="diaLogData.product"
								filterable
								placeholder="请选择商品"
							>
								<el-option
									v-for="item in products"
									:key="item.id"
									:label="item.name"
									:value="item.name"
								/>
							</el-select>
						</el-form-item>
						<el-form-item label="控价">
							<el-input
								v-model="diaLogData.control_price"
								placeholder="请输入控价"
								style="width: 220px"
							>
								<template #suffix>
									<div>￥</div>
								</template>
							</el-input>
						</el-form-item>
					</el-form>
				</div>
			</template>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="diaLogData.dialogVisible = false">Cancel</el-button>
					<el-button type="primary" @click="confirmHandle"> Confirm </el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<style scoped lang="scss">
.price_control{
	.header{
		margin-bottom: 10px;
		display: flex;
		justify-content: flex-start;
		gap: 5px;
		:deep(.el-input__wrapper){
			width: 150px;
		}
	}
}
</style>
