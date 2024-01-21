import request from "@/utils/http";

export const ProfitTargetAPI = {
	getAll() {
		return request({
			method: "GET",
			url: "profit_target",
		});
	},
	add(data) {
		return request({
			method: "POST",
			url: "/add/profit_target",
			data: data,
		});
	},
	update(data) {
		return request({
			method: "POST",
			url: "/update/profit_target",
			data: data,
		});
	},
	delById(id) {
		return request({
			method: "POST",
			url: "/del/profit_target",
			data: {
				id: id,
			},
		});
	},
	batchUpdate(data) {
		return request({
			method: "POST",
			url: "/update/batch/profit_target",
			data: data,
		});
	},
};
