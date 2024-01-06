<script setup>
	import { ElMessage } from "element-plus";
	import { onMounted, ref } from "vue";
	import { PriceSystemAPI } from "@/apis/priceSystem";
	const priceSystemlist = ref([]);
	const diaLogData = ref({
		dialogVisible: false,
		price_system_name: "",
	});
	const getPriceSystem = async () => {
		let res = await PriceSystemAPI.getAll();
        console.log(res.data.data)
		priceSystemlist.value = res.data.data;
	};
	const delHandle = async id => {
		let res = await PriceSystemAPI.delById(id);
		if (res.statusText === "OK") {
			ElMessage({
				type: "success",
				message: "删除成功",
			});
		}
		console.log(res);
		getPriceSystem();
	};
	const addHandle = () => {
		diaLogData.value.dialogVisible = true;
	};
	const confirmHandle = async () => {
		let res = await PriceSystemAPI.add({ price_system_name: diaLogData.value.price_system_name });
		console.log(res);
		if (res.statusText === "OK") {
			ElMessage({
				type: "success",
				message: "添加成功",
			});
		}
		getPriceSystem();
		cancleHandle();
	};
	const cancleHandle = () => {
		diaLogData.value.dialogVisible = false;
		diaLogData.value.price_system_name = "";
	};
	onMounted(() => {
		getPriceSystem();
	});
</script>

<template>
	<div class="price_system">
		<div class="header">
			<el-button type="primary" @click="addHandle">新增</el-button>
		</div>
		<div class="main">
			<el-table :data="priceSystemlist" border>
				<el-table-column prop="price_system_name" label="名称" width="250" />
				<el-table-column label="操作" width="150">
					<template #default="{ row }">
						<div>
							<el-button type="danger" size="small" plain @click="delHandle(row.id)"
								>删除</el-button
							>
						</div>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<el-dialog v-model="diaLogData.dialogVisible" width="30%">
			<template #default>
				<el-form :model="diaLogData" label-width="100px">
					<el-form-item label="名称">
						<el-input v-model="diaLogData.price_system_name" placeholder="输入价格体系名称" />
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
