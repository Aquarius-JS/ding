<script setup>
	import { ref } from "vue";
	import { useUserInfoStore } from "@/stores/user";
	import { storeToRefs } from "pinia";
	import { UserAPI } from "@/apis/user";
	import { useRouter } from "vue-router";
	const router = useRouter();
	const { userInfo } = storeToRefs(useUserInfoStore());
	const ruleFormRef = ref();
	const ruleForm = ref({
		userName: "",
		password: "",
	});
	const rules = ref({
		userName: [{ required: true, message: "账号不能为空", trigger: "blur" }],
		password: [{ required: true, message: "密码不能为空", trigger: "blur" }],
	});
	const loginHandler = async () => {
		if (!ruleFormRef) return;
		await ruleFormRef.value.validate(async valid => {
			if (valid) {
				const res = await UserAPI.login({
					username: ruleForm.value.userName,
					password: ruleForm.value.password,
				});
				const data = res.data;
				if (data === "登录失败") {
					ElMessage({
						type: "error",
						message: "账号或密码错误",
					});
					return;
				} else {
					userInfo.value.token = data.token;
					ElMessage({
						type: "success",
						message: "登录成功",
					});
					router.push({ path: "/" });
				}
			} else return false;
		});
	};
</script>

<template>
	<div class="login">
		<el-card>
			<div class="form-container">
				<el-form
					ref="ruleFormRef"
					:model="ruleForm"
					:rules="rules"
					label-width="70px"
					class="demo-ruleForm"
					status-icon
				>
					<el-form-item label="账号" prop="userName">
						<el-input v-model="ruleForm.userName" placeholder="请输入账号" />
					</el-form-item>
					<el-form-item label="密码" prop="password">
						<el-input v-model="ruleForm.password" placeholder="请输入密码" />
					</el-form-item>
				</el-form>
				<el-button type="primary" class="login-btn" @click="loginHandler">登录</el-button>
			</div>
		</el-card>
	</div>
</template>

<style scoped lang="scss">
	.login {
		width: 100vw;
		height: 100vh;
		display: flex;
		justify-content: center;
		align-items: center;
		.form-container {
			.login-btn {
				margin: 10px 60px 0;
				width: 60%;
			}
		}
	}
	:deep(.el-input) {
		width: 200px;
	}
</style>
