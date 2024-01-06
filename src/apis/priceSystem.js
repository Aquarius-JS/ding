import request from "@/utils/http";

export const PriceSystemAPI = {
	getAll() {
		return request({
			method: "get",
			url: "/price_systemlist",
		});
	},
	delById(id) {
		return request({
			method: "POST",
			url: "/del/price_system",
			data: {
				id: id,
			},
		});
	},
	add(data) {
		return request({
			method: "POST",
			url: "/add/price_system",
			data: data,
		});
	},
};
