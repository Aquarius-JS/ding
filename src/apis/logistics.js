import request from "@/utils/http.js";

const LogisticsAPI = {
	getAll() {
		return request({
			method: "GET",
			url: "/physical/distribution/management",
		});
	},
	update(data) {
		return request({
			method: "POST",
			url: "/update/physical/distribution/management",
			data: data,
		});
	},
};

export default LogisticsAPI;
