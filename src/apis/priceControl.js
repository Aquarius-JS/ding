import request from "@/utils/http";
export const PriceControlAPI = {
	getByOpts(data) {
		return request({
			method: "POST",
			url: "/price_control_standards/paging",
			data: data,
		});
	},
	add(data) {
		return request({
			method: "POST",
			url: "/add/price_control_standards",
			data: data,
		});
	},
	delById(id) {
		return request({
			method: "POST",
			url: "/del/price_control_standards",
			data: {
				id: id,
			},
		});
	},
	update(data) {
		return request({
			method: "POST",
			url: "/update/price_control_standards",
			data: data,
		});
	},
	delAll(){
		return request({
			method: "POST",
			url: "/del/all/price_control_standards",
		});
	},
	batchAdd(data){
		return request({
			method:"POST",
			url:"/update/batch/price_control_standards",
			data: data
		})
	}
};
