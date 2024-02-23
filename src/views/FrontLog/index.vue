<script setup>
	import { ref, onMounted } from "vue";
	import { FrontLogAPI } from "@/apis/frontLog";
	const page = ref(10);
	const pageNum = ref(1);
	const logList = ref();
	const getLogList = async () => {
		const res = await FrontLogAPI.getAll({ page: page.value, pageNum: pageNum.value });
        console.log(res)
	};
	onMounted(() => {
        getLogList()
    });
</script>

<template>
	<div class="front-log">
		<el-table :data="logList" style="width: 100%">
			<el-table-column prop="prop" label="label" width="width"> </el-table-column>
		</el-table>
	</div>
</template>

<style scoped lang="scss"></style>
