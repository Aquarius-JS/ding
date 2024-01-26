import request from "@/utils/http";

export const UserAPI = {
	login(data) {
		return request({
			method: "POST",
            url:"/login",
			data: data,
		});
	},
};
