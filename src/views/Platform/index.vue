<script setup>
	import { ElMessage } from "element-plus";
	import { onMounted, ref } from "vue";
	import { PlatformAPI } from "@/apis/platform";
	const platformlist = ref([]);
	const diaLogData = ref({
		dialogVisible: false,
		id: "",
		platform_name: "",
		Platform_deduction_points: 0,
	});
	const getPlatformList = async () => {
		let res = await PlatformAPI.getAll();
		console.log(res.data.data);
		platformlist.value = res.data.data;
	};
	const delHandle = async id => {
		let res = await PlatformAPI.delById(id);
		if (res.statusText === "OK") {
			ElMessage({
				type: "success",
				message: "删除成功",
			});
		}
		console.log(res);
		getPlatformList();
	};
	const addHandle = () => {
		diaLogData.value.dialogVisible = true;
		diaLogData.value.isAdd = true;
	};
	const updateHandle = data => {
		diaLogData.value = {
			...data,
			Platform_deduction_points: (data.Platform_deduction_points * 100).toFixed(2),
			dialogVisible: true,
			isAdd: false,
		};
	};
	const confirmHandle = async () => {
		if (diaLogData.value.isAdd) {
			let res = await PlatformAPI.add({
				platform_name: diaLogData.value.platform_name,
				Platform_deduction_points: diaLogData.value.Platform_deduction_points * 0.01,
			});
			console.log(res);
			if (res.statusText === "OK") {
				ElMessage({
					type: "success",
					message: "添加成功",
				});
			}
			getPlatformList();
			cancleHandle();
		} else {
			let res = await PlatformAPI.update({
				id: diaLogData.value.id,
				Platform_deduction_points: diaLogData.value.Platform_deduction_points * 0.01,
			});
			console.log(res);
			if (res.statusText === "OK") {
				ElMessage({
					type: "success",
					message: "修改成功",
				});
			}
			getPlatformList();
			cancleHandle();
		}
	};
	const cancleHandle = () => {
		diaLogData.value.dialogVisible = false;
		diaLogData.value.platform = "";
		diaLogData.value.Platform_deduction_points = 0;
	};
	onMounted(() => {
		getPlatformList();
	});
</script>

<template>
	<div class="price_system">
		<div class="header">
			<el-button type="primary" @click="addHandle">新增</el-button>
		</div>
		<div class="main">
			<el-table :data="platformlist" border>
				<el-table-column prop="platform_name" label="平台" width="250" />
				<el-table-column label="平台扣点(%)" width="250">
					<template #default="{ row }">
						<div>
							{{ (row.Platform_deduction_points * 100).toFixed(2) }}
						</div>
					</template>
				</el-table-column>
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
		<el-dialog v-model="diaLogData.dialogVisible" width="30%">
			<template #default>
				<el-form :model="diaLogData" label-width="100px">
					<el-form-item label="平台名称">
						<el-input
							:disabled="!diaLogData.isAdd"
							v-model="diaLogData.platform_name"
							placeholder="输入平台名称"
						/>
					</el-form-item>
					<el-form-item label="平台扣点">
						<el-input
							v-model="diaLogData.Platform_deduction_points"
							placeholder="输入平台扣点"
						>
                        <template #suffix>
                            <span style="font-weight:600;color:black">%</span>
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

<style scoped lang="scss">
	.price_system {
		.header {
			margin-bottom: 5px;
		}
	}
</style>
