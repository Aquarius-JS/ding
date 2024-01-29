<script setup>
	import { onMounted, ref, computed } from "vue";
	import { ElMessage } from "element-plus";
	import { ProductAPI } from "../../apis/product";
	import { useProductStore } from "@/stores/product";
	import { Upload, Download } from "@element-plus/icons-vue";
	import { upload, download } from "@/utils/xlsx/index";
	import { storeToRefs } from "pinia";
	const { productList } = storeToRefs(useProductStore());
	// 过滤条件name
	const name = ref("");
	const isLoading = ref(false);
	const fileInputRef = ref();
	const computedProList = computed(
		() => {
			if (name.value === "") return productList.value;
			return productList.value.filter(item => {
				return item.name.includes(name.value);
			});
		},
		{
			deep: true,
		}
	);
	const getAll = async () => {
		isLoading.value = true;
		const res = await ProductAPI.getAll();
		productList.value = res.data;
		isLoading.value = false;
	};
	const delHandle = async id => {
		await ProductAPI.delById(id);
		await getAll();
		ElMessage({
			type: "success",
			message: "删除成功",
		});
	};
	const addHandle = async () => {
		await ProductAPI.addProduct({
			name: "(产品名称)",
			financial_costs: 0,
			cost: 0,
			weight: 0,
			v: 0,
		});
		await getAll();
	};
	const updateHandle = async e => {
		const data = e.row;
		isLoading.value = true;
		await ProductAPI.updateProduct({
			id: data.id,
			name: data.name,
			financial_costs: data.financial_costs * 1,
			cost: data.cost * 1,
			weight: data.weight * 1,
			v: data.v * 1,
		});
		isLoading.value = false;
	};
	const uploadExcel = async () => {
		const res = await upload(fileInputRef.value.files);
		const data = res.map(item => ({
			name: item["名称"],
			financial_costs: item["财务成本(元)"] * 1,
			cost: item["业务成本(元)"] * 1,
			weight: item["重量(g)"] * 1,
			v: item["体积(cm³)"] * 1,
		}));
		isLoading.value = true;
		await ProductAPI.batchProduct(data);
		await getAll();
	};
	const downLoadExcel = async () => {
		const data = productList.value.map(item => ({
			名称: item.name,
			"财务成本(元)": item.financial_costs * 1,
			"业务成本(元)": item.cost * 1,
			"重量(g)": item.weight * 1,
			"体积(cm³)": item.v * 1,
		}));
		download(data, "产品基本信息");
	};
	onMounted(async () => {
		getAll();
	});
</script>

<template>
	<div class="product">
		<div class="header">
			<div class="handle">
				<el-input
					v-model="name"
					placeholder="名称模糊查询"
					clearable
					style="width: 200px; margin: 0 10px"
				/>
				<el-button type="primary" @click="addHandle">新增</el-button>
			</div>
			<div>
				<input type="file" ref="fileInputRef" />
				<el-button type="primary" plain @click="uploadExcel">
					<el-icon><Upload /></el-icon>
				</el-button>
				<el-button type="primary" plain @click="downLoadExcel">
					<el-icon><Download /></el-icon>
				</el-button>
			</div>
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
					:data="computedProList"
					:edit-config="{ trigger: 'dblclick', mode: 'row' }"
					@edit-closed="updateHandle"
				>
					<vxe-column field="name" title="名称" :edit-render="{}">
						<template #edit="{ row }">
							<vxe-input
								v-model="row.name"
								type="text"
								placeholder="请输入名称"
							></vxe-input>
						</template>
					</vxe-column>
					<vxe-column field="cost" title="财务成本(元)" :edit-render="{}">
						<template #edit="{ row }">
							<vxe-input
								v-model="row.cost"
								type="text"
								placeholder="请输入成本"
							></vxe-input>
						</template>
					</vxe-column>
					<vxe-column field="financial_costs" title="业务成本(元)" :edit-render="{}">
						<template #edit="{ row }">
							<vxe-input
								v-model="row.financial_costs"
								type="text"
								placeholder="请输入成本"
							></vxe-input>
						</template>
					</vxe-column>
					<vxe-column field="weight" title="重量(g)" :edit-render="{}">
						<template #edit="{ row }">
							<vxe-input
								v-model="row.weight"
								type="text"
								placeholder="请输入重量"
							></vxe-input>
						</template>
					</vxe-column>
					<vxe-column field="v" title="体积( cm³ )" :edit-render="{}">
						<template #edit="{ row }">
							<vxe-input
								v-model="row.v"
								type="text"
								placeholder="请输入重量"
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
		</div>
	</div>
</template>

<style scoped lang="scss">
	.product {
		.header {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 10px;
			.handle{
				display: flex;
				align-items: center;
				gap: 5px;
			}
		}
		.main {
			.table-container {
				height: 70vh;
			}
		}
	}
</style>
