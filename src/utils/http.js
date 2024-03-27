//axios基础的封装
import axios from "axios";
import { ElMessage } from "element-plus";
import "element-plus/theme-chalk/el-message.css";
import { useUserInfoStore } from "@/stores/user";
import { storeToRefs } from "pinia";
import router from "@/router";
import { IP } from "@/config/httpConfig";
const httpInstance = axios.create({
	baseURL: `http://${IP}:8888/api`,
	timeout: 1000 * 10,
});

//拦截器配置
httpInstance.interceptors.request.use(
	config => {
		const { userInfo } = storeToRefs(useUserInfoStore());
		if (userInfo.value.token) {
			config.headers.token = userInfo.value.token;
		}
		return config;
	},
	e => Promise.reject(e)
);

httpInstance.interceptors.response.use(
	res => res.data,
	e => {
		//401
		if (e.response?.status === 401) {
			const { userInfo } = storeToRefs(useUserInfoStore());
			userInfo.value = {};
			ElMessage({
				type: "error",
				message: "登录过期,请重新登录",
			});
			router.push("/login");
		} else {
			//统一错误提示
			ElMessage({
				type: "warning",
				message: e.response.data.message,
			});
		}

		return Promise.reject(e);
	}
);

export default httpInstance;
