//axios基础的封装
import axios from "axios";
import { ElMessage } from "element-plus";
import "element-plus/theme-chalk/el-message.css";
import { useRouter } from "vue-router";
const router = useRouter();
const httpInstance = axios.create({
	baseURL: "http://47.108.52.110:8888/api",
	// baseURL: "http://36.110.131.59:8888//api",
	// baseURL: "/api",
	timeout: 5000,
});

// //拦截器配置
// httpInstance.interceptors.request.use(
// 	config => {
// 		const userStore = useUserStore();
// 		const token = userStore.userInfo.token;
// 		if (token) {
// 			config.headers.Authorization = `Bearer ${token}`;
// 		}
// 		return config;
// 	},
// 	e => Promise.reject(e)
// );

// httpInstance.interceptors.response.use(
// 	res => res.data,
// 	e => {
// 		//统一错误提示
// 		ElMessage({
// 			type: "warning",
// 			message: e.response.data.message,
// 		});
// 		//401token失效处理
// 		if (e.response.status === 401) {
// 			const userStore = useUserStore();
// 			userStore.clearUserInfo();
// 			router.push("/login");
// 		}
// 		return Promise.reject(e);
// 	}
// );

export default httpInstance;
