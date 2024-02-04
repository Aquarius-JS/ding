<script setup>
	import { onMounted, ref } from "vue";
	import { useUserInfoStore } from "@/stores/user";
	import { storeToRefs } from "pinia";
	const { userInfo } = storeToRefs(useUserInfoStore());
	onMounted(() => {
		console.log(userInfo);
	});
</script>

<template>
	<div class="header">
		<el-card>
			<template #default>
				<div class="container">
					<div class="left"></div>
					<div class="right">
                        right
                    </div>
				</div>
			</template>
		</el-card>
	</div>
</template>

<style scoped lang="scss">
	.header {
		:deep(.el-header) {
			padding: 3px 0;
		}
        :deep(.el-card){
            border: none;
            border-radius: 0;
        }
		.container {
			display: flex;
			justify-content: space-between;
			align-items: center;
			flex-direction: row;
			height: 100%;
		}
	}
</style>
