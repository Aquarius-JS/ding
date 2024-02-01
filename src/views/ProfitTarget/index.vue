<script setup>
	import { Upload, Download } from "@element-plus/icons-vue";
	import { ProfitTargetAPI } from "@/apis/profitTarget";
	import { PriceSystemAPI } from "@/apis/priceSystem";
	import { DepartmentAPI } from "@/apis/department";
	import { PlatformAPI } from "@/apis/platform";
	import { onMounted, ref } from "vue";
	import { download, downloadTemplate, upload } from "@/utils/xlsx";

	const isLoading = ref(false);
	const fileInputRef = ref();
	const profitTargetList = ref([]);
	const priceSystemList = ref([]);
	const departmentList = ref([]);
	const platformList = ref([]);
	const init = async () => {
		let priceRes = await PriceSystemAPI.getAll();
		priceSystemList.value = priceRes.data.data;
		let deparRes = await DepartmentAPI.getAll();
		departmentList.value = deparRes.data.data;
		let platRes = await PlatformAPI.getAll();
		platformList.value = platRes.data.data;
	};
	const getAll = async () => {
		isLoading.value = true;
		const res = await ProfitTargetAPI.getAll();
		profitTargetList.value = res.data.map(item => ({
			...item,
			financial_profit_target: item.financial_profit_target * 100,
			profit_target: item.profit_target * 100,
		}));
		isLoading.value = false;
	};
	const addHandle = async () => {
		isLoading.value = true;
		await ProfitTargetAPI.add({
			price_system: "",
			department: "",
			platform: "",
			category: "",
			financial_profit_target: 0,
			profit_target: 0,
		});
		await getAll();
	};
	const updateHandle = async e => {
		const data = {
			...e.row,
			_X_ROW_KEY: undefined,
			financial_profit_target: e.row.financial_profit_target * 0.01,
			profit_target: e.row.profit_target * 0.01,
		};
		ProfitTargetAPI.update(data);
	};
	const delHandle = async id => {
		await ProfitTargetAPI.delById(id);
		await getAll();
		ElMessage({
			type: "success",
			message: "删除成功",
		});
	};
	const uploadExcel = async () => {
		profitTargetList.value = [];
		isLoading.value = true;
		const res = await upload(fileInputRef.value.files);
		const data = res.map(item => ({
			price_system: item["价格体系"],
			department: item["部门"],
			platform: item["平台"],
			category: item["类别"],
			financial_profit_target: item["财务利润目标(%)"] * 0.01,
			profit_target: item["业务利润目标(%)"] * 0.01,
		}));
		await ProfitTargetAPI.batchUpdate(data);
		await getAll();
	};
	const downLoadExcel = async () => {
		const data = profitTargetList.value.map(item => ({
			价格体系: item.price_system,
			部门: item.department,
			平台: item.platform,
			类别: item.category,
			"财务利润目标(%)": item.financial_profit_target,
			"业务利润目标(%)": item.profit_target,
		}));
		download(data, "利润目标信息");
	};
	onMounted(async () => {
		init();
		getAll();
	});
</script>

<template>
	<div class="profit_target">
		<div class="header">
			<el-button type="primary" @click="addHandle">新增</el-button>
			<div>
				<input type="file" ref="fileInputRef" />
				<el-button type="primary" plain @click="uploadExcel">
					<el-icon><Upload /></el-icon>
				</el-button>
				<el-button type="primary" plain @click="downLoadExcel">
					<el-icon><Download /></el-icon>
					下载数据
				</el-button>
				<el-button
					type="primary"
					@click="
						downloadTemplate([
							'价格体系',
							'部门',
							'平台',
							'类别',
							'财务利润目标(%)',
							'业务利润目标(%)',
						],'利润目标信息(模板)')
					"
					>下载模板</el-button
				>
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
					:data="profitTargetList"
					:edit-config="{ trigger: 'dblclick', mode: 'row' }"
					@edit-closed="updateHandle"
				>
					<vxe-column field="price_system" title="价格体系" :edit-render="{}">
						<template #edit="{ row }">
							<vxe-input
								v-model="row.price_system"
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
					<vxe-column field="category" title="类别" :edit-render="{}">
						<template #edit="{ row }">
							<vxe-input
								v-model="row.category"
								type="text"
								placeholder="请输入类别"
							></vxe-input>
						</template>
					</vxe-column>
					<vxe-column
						field="financial_profit_target"
						title="财务利润目标(%)"
						:edit-render="{}"
					>
						<template #edit="{ row }">
							<vxe-input
								v-model="row.financial_profit_target"
								type="text"
								placeholder="请输入财务利润目标"
							></vxe-input>
						</template>
					</vxe-column>
					<vxe-column field="profit_target" title="业务利润目标(%)" :edit-render="{}">
						<template #edit="{ row }">
							<vxe-input
								v-model="row.profit_target"
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
		</div>
	</div>
</template>

<style scoped lang="scss">
	.header {
		margin-bottom: 10px;
		display: flex;
		justify-content: space-between;
	}
	.main {
		.table-container {
			height: 70vh;
		}
	}
</style>
