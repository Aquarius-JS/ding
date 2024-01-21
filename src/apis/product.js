import request from "@/utils/http";

export const ProductAPI = {
	getAll() {
		return request({
			method: "GET",
			url: "/products",
		});
	},
	delById(id) {
		return request({
			method: "POST",
			url: "/del/product",
			data: {
				id: id,
			},
		});
	},
	addProduct(obj) {
		return request({
			method: "POST",
			url: "/add/product",
			data: obj,
		});
	},
	updateProduct(obj) {
		return request({
			method: "POST",
			url: "/update/product",
			data: obj,
		});
	},
	batchProduct(list) {
		return request({
			method: "POST",
			url: "/update/batch/product",
			data: list,
		});
	},
};
