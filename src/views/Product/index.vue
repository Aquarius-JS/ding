<script setup>
	import { onMounted, ref, computed } from "vue";
	import { ElMessage } from "element-plus";
	import { ProductAPI } from "../../apis/product";
	import { useProductStore } from "@/stores/product";
	import { Upload, Download } from "@element-plus/icons-vue";
	import { upload, download } from "@/utils/xlsx/index";
	import { storeToRefs } from "pinia";
	const { productList } = storeToRefs(useProductStore());
	const name = ref("");
	const fileInputRef = ref();
	const diaLogDate = ref({
		dialogVisible: false,
		isAdd: true,
		id: "111",
		name: "11",
		cost: 10,
		weight: 0,
		v: 0,
	});
	const computedProList = computed(
		() => {
			if (name.value === "") return productList.value.data;
			return productList.value.data.filter(item => {
				return item.name.includes(name.value);
			});
		},
		{
			deep: true,
		}
	);
	const getAll = async () => {
		let res = await ProductAPI.getAll();
		productList.value = res.data;
	};
	const delHandle = async id => {
		let res = await ProductAPI.delById(id);
		ElMessage({
			type: "success",
			message: "删除成功",
		});
		getAll();
	};
	const addHandle = () => {
		diaLogDate.value.dialogVisible = true;
		diaLogDate.value.isAdd = true;
	};
	const updateHandle = data => {
		diaLogDate.value = { ...data, dialogVisible: true, isAdd: false };
		console.log(diaLogDate.value);
	};
	const confirmHandle = async () => {
		console.log(diaLogDate.value.isAdd);
		if (diaLogDate.value.isAdd) {
			await ProductAPI.addProduct({
				name: diaLogDate.value.name,
				cost: diaLogDate.value.cost * 1,
				weight: diaLogDate.value.weight * 1,
				v: diaLogDate.value.v * 1,
			});
			getAll();
			ElMessage({
				type: "success",
				message: "添加成功",
			});
		} else {
			await ProductAPI.updateProduct({
				id: diaLogDate.value.id,
				name: diaLogDate.value.name,
				cost: diaLogDate.value.cost * 1,
				weight: diaLogDate.value.weight * 1,
				v: diaLogDate.value.v * 1,
			});
			getAll();
			ElMessage({
				type: "success",
				message: "修改成功",
			});
		}

		cancleHandle();
	};
	const cancleHandle = () => {
		diaLogDate.value = {
			dialogVisible: false,
			isAdd: true,
			id: "",
			name: "",
			cost: 0,
			weight: 0,
			v: 0,
		};
	};
	const uploadExcel = async () => {
		let res = await upload(fileInputRef.value.files);
		console.log(res);
	};
	onMounted(async () => {
		getAll();
	});
</script>

<template>
	<div class="product">
		<div class="header">
			<el-input
				v-model="name"
				placeholder="名称模糊查询"
				clearable
				style="width: 200px; margin: 0 10px"
			/>
			<el-button type="primary" @click="addHandle">新增</el-button>
			<input type="file" ref="fileInputRef" />
			<el-button type="primary" plain @click="uploadExcel">
				<el-icon><Upload /></el-icon>
			</el-button>
			<el-button type="primary" plain>
				<el-icon><Download /></el-icon>
			</el-button>
		</div>
		<div class="main">
			<el-table :data="computedProList" border style="width: 100%">
				<el-table-column prop="name" label="名称" width="250" />
				<el-table-column prop="cost" label="成本(元)" width="120" sortable />
				<el-table-column prop="weight" label="重量(kg)" width="120" sortable />
				<el-table-column prop="v" label="体积(cm^3)" width="140" sortable />
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
					<el-form-item label="名称">
						<el-input v-model="diaLogDate.name" placeholder="输入商品信息" />
					</el-form-item>
					<el-form-item label="成本(元)">
						<el-input v-model="diaLogDate.cost" />
					</el-form-item>
					<el-form-item label="重量(kg)">
						<el-input v-model="diaLogDate.weight" />
					</el-form-item>
					<el-form-item label="体积(cm^3)">
						<el-input v-model="diaLogDate.v" />
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
	.product {
		.header {
			margin-bottom: 10px;
		}
	}
</style>
