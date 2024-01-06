import request from "@/utils/http";

export const DepartmentAPI = {
	getAll() {
		return request({
			method: "get",
			url: "/departments",
		});
	},
	delById(id) {
		return request({
			method: "POST",
			url: "/del/department",
			data: {
				id: id,
			},
		});
	},
	add(data) {
		return request({
			method: "POST",
			url: "/add/department",
			data: data,
		});
	},
};
