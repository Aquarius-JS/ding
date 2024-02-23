import request from "@/utils/http";

export const FrontLogAPI = {
	getAll(data) {
		return request({
			method: "POST",
			url: "/log",
			data: data,
		});
	},
};
