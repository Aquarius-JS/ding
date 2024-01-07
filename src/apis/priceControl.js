import request from "@/utils/http";
export const PriceControlAPI = {
    getByOpts(data){
        return request({
			method: "POST",
			url: "/api/price_control_standards",
            data:data
		});
    }
}