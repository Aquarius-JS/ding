import { ElMessage } from "element-plus";
import * as XLSX from "xlsx";

export const download = (json_data, file_name = "数据") => {
	return new Promise((resolve, reject) => {
		const worksheet = XLSX.utils.json_to_sheet(json_data);
		const workbook = XLSX.utils.book_new();
		XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
		XLSX.writeFile(workbook, file_name + ".xlsx");
		resolve({ type: "success", message: "下载成功" });
	});
};

export const upload = files => {
			console.log(files);
	if (!files[0]) {
		ElMessage({
			type: "warning",
			message: "请选择excel",
		});
		return "";
	}
	return new Promise((resolve, reject) => {
		var fileReader = new FileReader();
		fileReader.readAsArrayBuffer(files[0]);
		fileReader.onload = function (e) {
			var data = new Uint8Array(e.target.result);
			var workbook = XLSX.read(data, { type: "array" });
			var worksheet = workbook.Sheets[workbook.SheetNames[0]];
			var jsonData = XLSX.utils.sheet_to_json(worksheet, { raw: false });
			resolve(jsonData);
		};
	});
};
