<script setup>
	import { onMounted, ref } from "vue";
	import { useUserInfoStore } from "@/stores/user";
	import { storeToRefs } from "pinia";
	import { useRouter } from "vue-router";
	const { userInfo } = storeToRefs(useUserInfoStore());
	const router = useRouter();
	const loginOut = () => {
		localStorage.removeItem("user");
		router.push("/login");
	};
</script>

<template>
	<div class="header">
		<el-card>
			<template #default>
				<div class="container">
					<div class="left"></div>
					<div class="right">
						<el-dropdown>
							<el-avatar> {{ userInfo.name[0] || "" }} </el-avatar>
							<template #dropdown>
								<el-dropdown-menu>
									<el-dropdown-item @click="loginOut">退出登录</el-dropdown-item>
								</el-dropdown-menu>
							</template>
						</el-dropdown>
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
		:deep(.el-card) {
			border: none;
			border-radius: 0;
		}
		:deep(.el-card__body) {
			padding: 0;
			height: 61px;
		}
		.container {
			display: flex;
			justify-content: space-between;
			align-items: center;
			flex-direction: row;
			height: 100%;
			.right {
				:deep(.el-avatar) {
					width: 35px;
					height: 35px;
				}
			}
		}
	}
</style>
