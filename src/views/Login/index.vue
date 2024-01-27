<script setup>
	import { onMounted, ref } from "vue";
	import { useUserInfoStore } from "@/stores/user";
	import { storeToRefs } from "pinia";
	import { UserAPI } from "@/apis/user";
	import { useRouter } from "vue-router";
	const router = useRouter();
	const { userInfo } = storeToRefs(useUserInfoStore());
	onMounted(async () => {
		const res = await UserAPI.login({ username: "a", password: "123" });
		const data = res.data;
		if (data === "登录失败") {
			ElMessage({
				type: "warning",
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
	});
</script>

<template>
	<div class="login"></div>
</template>

<style scoped lang="scss"></style>
