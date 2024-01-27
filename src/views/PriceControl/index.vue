<script setup>
	import { PlatformAPI } from "@/apis/platform";
	import { DepartmentAPI } from "@/apis/department";
	import { PriceSystemAPI } from "@/apis/priceSystem";
	import { ProductAPI } from "@/apis/product";
	import { PriceControlAPI } from "@/apis/priceControl";
	import { onMounted, ref } from "vue";
	import { Upload, Download, Search } from "@element-plus/icons-vue";
	import { upload, download } from "@/utils/xlsx/index";
	const platforms = ref([]);
	const departments = ref([]);
	const priceSystems = ref([]);
	const products = ref([]);
	const priceControlList = ref([]);
	const currentPlatForm = ref("");
	const currentDepartment = ref("");
	const currentPriceSystem = ref("");
	const currentproduct = ref("");
	const page = ref(10);
	const pageNum = ref(1);
	const count = ref();
	const isLoading = ref(false);
	const fileInputRef = ref();

	const getByOpts = async () => {
		isLoading.value = true;
		let res = await PriceControlAPI.getByOpts({
			platform: currentPlatForm.value || undefined,
			department: currentDepartment.value || undefined,
			price_system_name: currentPriceSystem.value || undefined,
			product: currentproduct.value || undefined,
			page: page.value,
			pageNum: pageNum.value,
		});
		priceControlList.value = res.data;
		if (pageNum.value === 1) {
			count.value = res.count;
		}
		isLoading.value = false;
	};
	const init = async () => {
		let res = await PlatformAPI.getAll();
		platforms.value = res.data;
		res = await DepartmentAPI.getAll();
		departments.value = res.data;
		res = await PriceSystemAPI.getAll();
		priceSystems.value = res.data;
		res = await ProductAPI.getAll();
		products.value = res.data;
	};
	const updateHandle = async e => {
		PriceControlAPI.update({
			...e.row,
			control_price: e.row.control_price * 1,
			_X_ROW_KEY: undefined,
		});
	};
	const delHandle = async id => {
		await PriceControlAPI.delById(id);
		await getByOpts();
		ElMessage({
			type: "success",
			message: "删除成功",
		});
	};
	const downLoadExcel = async () => {
		const data = priceControlList.value.map(item => ({
			价格体系: item.price_system_name,
			部门: item.department,
			平台: item.platform,
			产品: item.product,
			"控价(元)": item.control_price * 1,
		}));
		download(data, "控价标准");
	};
	const uploadExcel = async () => {
		isLoading.value = true;
		const res = await upload(fileInputRef.value.files);
		const data = res.map(item => ({
			price_system_name: item["价格体系"],
			department: item["部门"],
			platform: item["平台"],
			product: item["产品"],
			control_price: item["控价(元)"] * 1,
		}));
		await PriceControlAPI.delAll();
		await PriceControlAPI.batchAdd(data);
		await getByOpts();
		isLoading.value = false;
		fileInputRef.value = null;
	};
	const currentChangeHandler = _pageNum => {
		pageNum.value = _pageNum;
		getByOpts();
	};
	const sizeChangeHandler = _page => {
		page.value = _page;
		getByOpts();
	};
	onMounted(async () => {
		await init();
		await getByOpts();
	});
</script>

<template>
	<div class="price_control">
		<div class="header">
			<el-select v-model="currentPriceSystem" placeholder="请选择价格体系" @change="getByOpts">
				<el-option label="全部" value="" />
				<el-option
					v-for="item in priceSystems"
					:key="item.id"
					:label="item.price_system_name"
					:value="item.price_system_name"
				/>
			</el-select>
			<el-select v-model="currentDepartment" placeholder="请选择部门" @change="getByOpts">
				<el-option label="全部" value="" />
				<el-option
					v-for="item in departments"
					:key="item.id"
					:label="item.department_name"
					:value="item.department_name"
				/>
			</el-select>
			<el-select v-model="currentPlatForm" placeholder="请选择平台" @change="getByOpts">
				<el-option label="全部" value="" />
				<el-option
					v-for="item in platforms"
					:key="item.id"
					:label="item.platform_name + ' ' + item.Platform_deduction_points"
					:value="item.platform_name"
				/>
			</el-select>
			<el-select v-model="currentproduct" filterable placeholder="请选择商品" @change="getByOpts">
				<el-option label="全部" value="" />
				<el-option
					v-for="item in products"
					:key="item.id"
					:label="item.name"
					:value="item.name"
				/>
			</el-select>
			<el-button type="primary" @click="">新增</el-button>
			<input type="file" ref="fileInputRef" />
			<el-button type="primary" plain @click="uploadExcel">
				<el-icon><Upload /></el-icon>
			</el-button>
			<el-button type="primary" plain @click="downLoadExcel">
				<el-icon><Download /></el-icon>
			</el-button>
		</div>
		<div class="main">
			<div class="table-container">
				<vxe-table
					auto-resize
					stripe
					border
					round
					resizable
					show-overflow
					:loading="isLoading"
					height="auto"
					:data="priceControlList"
					:edit-config="{ trigger: 'dblclick', mode: 'row' }"
					@edit-closed="updateHandle"
				>
					<vxe-column field="price_system_name" title="价格体系" :edit-render="{}">
						<template #edit="{ row }">
							<vxe-input
								v-model="row.price_system_name"
								type="text"
								placeholder="请输入价格体系"
							></vxe-input>
						</template>
					</vxe-column>
					<vxe-column field="department" title="部门" :edit-render="{}">
						<template #edit="{ row }">
							<vxe-input
								v-model="row.department"
								type="text"
								placeholder="请输入部门"
							></vxe-input>
						</template>
					</vxe-column>
					<vxe-column field="platform" title="平台" :edit-render="{}">
						<template #edit="{ row }">
							<vxe-input
								v-model="row.platform"
								type="text"
								placeholder="请输入平台"
							></vxe-input>
						</template>
					</vxe-column>
					<vxe-column field="product" title="产品" :edit-render="{}">
						<template #edit="{ row }">
							<vxe-input
								v-model="row.product"
								type="text"
								placeholder="请输入财务利润目标"
							></vxe-input>
						</template>
					</vxe-column>
					<vxe-column field="control_price" title="控价(元)" :edit-render="{}">
						<template #edit="{ row }">
							<vxe-input
								v-model="row.control_price"
								type="text"
								placeholder="请输入业务利润目标"
							></vxe-input>
						</template>
					</vxe-column>
					<vxe-column title="操作">
						<template #default="{ row }">
							<div>
								<el-button
									type="danger"
									size="small"
									plain
									@click="delHandle(row.id)"
									>删除</el-button
								>
							</div>
						</template>
					</vxe-column>
				</vxe-table>
			</div>
			<div class="pagination_container">
				<el-pagination
					v-model:current-page="pageNum"
					v-model:page-size="page"
					layout="prev, pager, next, sizes, total"
					:page-sizes="[10, 20, 50, 100]"
					:total="count"
					@size-change="sizeChangeHandler"
					@current-change="currentChangeHandler"
				/>
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
	.price_control {
		.header {
			margin-bottom: 10px;
			display: flex;
			justify-content: flex-start;
			gap: 5px;
			:deep(.el-input__wrapper) {
				width: 150px;
			}
		}
		.main {
			.table-container {
				height: 70vh;
			}
			.pagination_container{
				padding-top: 10px;
			}
		}
	}
</style>
