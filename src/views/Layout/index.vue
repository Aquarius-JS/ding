<script setup>
	import { onMounted, ref } from "vue";
	import { useRouter, useRoute } from "vue-router";
	const router = useRouter();
	const route = useRoute();
	const path = ref("");
	onMounted(() => {
		path.value = route.path;
	});
</script>

<template>
	<div class="layout">
		<el-container>
			<el-header>
				<div class="header"></div>
			</el-header>
			<el-container>
				<el-aside width="200px">
					<div class="aside">
						<el-card>
							<el-menu :default-active="path" class="el-menu-vertical-demo" router>
								<el-menu-item index="/product">
									<span>产品基本信息管理</span>
								</el-menu-item>
								<el-menu-item index="/product1">
									<span>产品基本信息管理</span>
								</el-menu-item>
								<el-menu-item index="/product2">
									<span>产品基本信息管理</span>
								</el-menu-item>
							</el-menu>
						</el-card>
					</div>
				</el-aside>
				<el-main>
					<div class="main">
						<el-card class="box-card">
							<div class="test"></div>
							<router-view></router-view>
						</el-card>
					</div>
				</el-main>
			</el-container>
		</el-container>
	</div>
</template>

<style scoped lang="scss">
	.layout {
		:deep(.el-main) {
			padding: 0px 3px;
		}
		.aside {
			padding: 0;
			:deep(.el-card__body) {
				padding: 0;
			}
			:deep(.el-menu-item) {
				justify-content: space-around;
			}
		}
		.main {
			padding: 0;
			min-height: 85vh;
			:deep(.el-card__body) {
				// padding: 0;
				min-height: 80vh;
			}
		}
	}
</style>
