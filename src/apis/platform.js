import request from "@/utils/http";

export const PlatformAPI = {
	getAll() {
		return request({
			method: "GET",
			url: "/platformlist",
		});
	},
	add(data) {
		return request({
			method: "POST",
			url: "/add/platform",
			data: data,
		});
	},
	delById(id) {
		return request({
			method: "POST",
			url: "/del/platform",
			data: {
				id: id,
			},
		});
	},
	update(data) {
		return request({
			method: "POST",
			url: "/update/platform",
			data: data,
		});
	},
};
