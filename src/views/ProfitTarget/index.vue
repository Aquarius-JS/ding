<script setup>
	import { ProfitTargetAPI } from "@/apis/profitTarget";
	import { PriceSystemAPI } from "@/apis/priceSystem";
	import { DepartmentAPI } from "@/apis/department";
	import { PlatformAPI } from "@/apis/platform";
	import { onMounted, ref } from "vue";

	const profitTargetList = ref([]);
	const priceSystemList = ref([]);
	const departmentList = ref([]);
	const platformList = ref([]);
	const diaLogDate = ref({
		dialogVisible: false,
		isAdd: true,
		id: "",
		price_system: "",
		department: "",
		platform: "",
		profit_target: 0,
	});
	const init = async () => {
		let priceRes = await PriceSystemAPI.getAll();
		priceSystemList.value = priceRes.data.data;
		let deparRes = await DepartmentAPI.getAll();
		departmentList.value = deparRes.data.data;
		let platRes = await PlatformAPI.getAll();
		platformList.value = platRes.data.data;
	};
	const getAll = async () => {
		let res = await ProfitTargetAPI.getAll();
		profitTargetList.value = res.data.data;
	};
	const addHandle = () => {
		diaLogDate.value = {
			dialogVisible: true,
			isAdd: true,
			price_system: "",
			department: "",
			platform: "",
			profit_target: 0,
		};
	};
	const confirmHandle = async () => {
		if (diaLogDate.value.isAdd) {
			let res = await ProfitTargetAPI.add({
				price_system: diaLogDate.value.price_system,
				department: diaLogDate.value.department,
				platform: diaLogDate.value.platform,
				profit_target: diaLogDate.value.profit_target * 0.01,
			});
			console.log(res)
			if (res.statusText === "OK") {
				ElMessage({
					type: "success",
					message: "添加成功",
				});
				getAll();
			}
		} else {
			let res = await ProfitTargetAPI.update({
				id: diaLogDate.value.id,
				price_system: diaLogDate.value.price_system,
				department: diaLogDate.value.department,
				platform: diaLogDate.value.platform,
				profit_target: diaLogDate.value.profit_target * 0.01,
			});
			if (res.statusText === "OK") {
				ElMessage({
					type: "success",
					message: "更新成功",
				});
				getAll();
			}
		}
	};
	const cancleHandle = () => {
		diaLogDate.value = {
			dialogVisible: false,
			isAdd: true,
			price_system: "",
			department: "",
			platform: "",
			profit_target: 0,
		};
	};
	const updateHandle = async data => {
		diaLogDate.value = {
			...data,
			isAdd: false,
			dialogVisible: true,
		};
	};
	const delHandle = async id => {
		let res = await ProfitTargetAPI.delById(id);
		if (res.statusText === "OK") {
			ElMessage({
				type: "success",
				message: "删除成功",
			});
			getAll();
		}
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
		</div>
		<div class="main">
			<el-table :data="profitTargetList" border style="width: 100%">
				<el-table-column prop="price_system" label="价格体系" width="250" />
				<el-table-column prop="department" label="部门" width="120" />
				<el-table-column prop="platform" label="平台" width="120" />
				<el-table-column prop="profit_target" label="利润目标" width="140" sortable />
				<el-table-column label="操作" width="150">
					<template #default="{ row }">
						<div>
							<el-button type="danger" size="small" plain @click="delHandle(row.id)"
								>删除</el-button
							>
							<el-button type="success" size="small" plain @click="updateHandle(row)"
								>修改</el-button
							>
						</div>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<el-dialog
			v-model="diaLogDate.dialogVisible"
			:title="diaLogDate.isAdd === true ? '新增' : '修改'"
			width="30%"
			:before-close="handleClose"
		>
			<template #default>
				<el-form :model="diaLogDate" label-width="100px">
					<el-form-item label="价格体系">
						<el-select
							v-model="diaLogDate.price_system"
							class="m-2"
							placeholder="请选择价格体系"
							size="large"
						>
							<el-option
								v-for="item in priceSystemList"
								:key="item.price_system_name"
								:label="item.price_system_name"
								:value="item.price_system_name"
							/>
						</el-select>
					</el-form-item>
					<el-form-item label="部门">
						<el-select
							v-model="diaLogDate.department"
							class="m-2"
							placeholder="请选择部门"
							size="large"
						>
							<el-option
								v-for="item in departmentList"
								:key="item.department_name"
								:label="item.department_name"
								:value="item.department_name"
							/>
						</el-select>
					</el-form-item>
					<el-form-item label="平台">
						<el-select
							v-model="diaLogDate.platform"
							class="m-2"
							placeholder="请选择价格体系"
							size="large"
						>
							<el-option
								v-for="item in platformList"
								:key="item.platform_name"
								:label="item.Platform_deduction_points + '  ' + item.platform_name"
								:value="item.platform_name"
							/>
						</el-select>
					</el-form-item>
					<el-form-item label="利润目标(%)">
						<el-input v-model="diaLogDate.profit_target">
							<template #suffix>
								<span>%</span>
							</template>
						</el-input>
					</el-form-item>
				</el-form>
			</template>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="cancleHandle" size="small">取消</el-button>
					<el-button type="primary" @click="confirmHandle" size="small"> 确定 </el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<style scoped lang="scss"></style>
