<script setup>
	import { ref, onMounted } from "vue";
	import LogisticsAPI from "@/apis/logistics";

	const logistics = ref([]);
	const isLoading = ref(false);
	const getAll = async () => {
		isLoading.value = true;
		let res = await LogisticsAPI.getAll();
		logistics.value = res.data;
		isLoading.value = false;
	};
	const updateHandle = async e => {
		isLoading.value = true;
		const obj = {};
		Object.entries(e.row).forEach(item => (obj[item[0]] = item[1] * 1));
		await LogisticsAPI.update({
			...obj,
			id: e.row.id,
			name: e.row.name,
			_X_ROW_KEY: undefined,
		});
		await getAll();
		ElMessage({
			type: "success",
			message: "更新成功",
		});
		isLoading.value = false;
	};
	onMounted(() => {
		getAll();
	});
</script>

<template>
	<div class="logistics">
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
				:data="logistics"
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
				<vxe-column field="basic_sorting_num" title="基础分拣数量" :edit-render="{}">
					<template #edit="{ row }">
						<vxe-input
							v-model="row.basic_sorting_num"
							type="text"
							placeholder="请输入基础分拣数量"
						></vxe-input>
					</template>
				</vxe-column>
				<vxe-column field="basic_soring_fee" title="基础分拣费用" :edit-render="{}">
					<template #edit="{ row }">
						<vxe-input
							v-model="row.basic_soring_fee"
							type="text"
							placeholder="请输入基础分拣费用"
						></vxe-input>
					</template>
				</vxe-column>
				<vxe-column field="extra_sorting_fee" title="额外分拣费用" :edit-render="{}">
					<template #edit="{ row }">
						<vxe-input
							v-model="row.extra_sorting_fee"
							type="text"
							placeholder="请输入额外分拣费用"
						></vxe-input>
					</template>
				</vxe-column>
				<vxe-column
					field="basic_packaging_materials_fee"
					title="基础包材费用"
					:edit-render="{}"
				>
					<template #edit="{ row }">
						<vxe-input
							v-model="row.basic_packaging_materials_fee"
							type="text"
							placeholder="请输入基础包材费用"
						></vxe-input>
					</template>
				</vxe-column>
				<vxe-column
					field="basic_packaging_materials_v"
					title="基础包材体积"
					:edit-render="{}"
				>
					<template #edit="{ row }">
						<vxe-input
							v-model="row.basic_packaging_materials_v"
							type="text"
							placeholder="请输入基础包材体积"
						></vxe-input>
					</template>
				</vxe-column>
				<vxe-column
					field="extra_packaging_materials_fee"
					title="额外包材费用"
					:edit-render="{}"
				>
					<template #edit="{ row }">
						<vxe-input
							v-model="row.extra_packaging_materials_fee"
							type="text"
							placeholder="请输入额外包材费用"
						></vxe-input>
					</template>
				</vxe-column>
				<vxe-column field="basic_deliver_fee" title="基础快递运费" :edit-render="{}">
					<template #edit="{ row }">
						<vxe-input
							v-model="row.basic_deliver_fee"
							type="text"
							placeholder="请输入基础快递运费"
						></vxe-input>
					</template>
				</vxe-column>
				<vxe-column field="basic_deliver_w" title="基础快递重量" :edit-render="{}">
					<template #edit="{ row }">
						<vxe-input
							v-model="row.basic_deliver_w"
							type="text"
							placeholder="请输入基础快递重量"
						></vxe-input>
					</template>
				</vxe-column>
				<vxe-column field="extra_deliver_fee" title="额外快递费用" :edit-render="{}">
					<template #edit="{ row }">
						<vxe-input
							v-model="row.extra_deliver_fee"
							type="text"
							placeholder="请输入额外快递费用"
						></vxe-input>
					</template>
				</vxe-column>
			</vxe-table>
		</div>
	</div>
</template>

<style scoped lang="scss">
	.table-container {
		height: 70vh;
		:deep(.vxe-cell) {
			font-size: 12px;
		}
	}
</style>
