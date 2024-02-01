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
	return new Promise((resolve, reject) => {
		try {
			const fileReader = new FileReader();
			fileReader.readAsArrayBuffer(files[0]);
			fileReader.onload = function (e) {
				const data = new Uint8Array(e.target.result);
				const workbook = XLSX.read(data, { type: "array" });
				const worksheet = workbook.Sheets[workbook.SheetNames[0]];
				const jsonData = XLSX.utils.sheet_to_json(worksheet, { raw: false });
				resolve(jsonData);
			};
		} catch (e) {
			resolve(false);
			ElMessage({
				type: "error",
				message: "请选择excel",
			});
		}
	});
};

export const downloadTemplate = async arr => {
	// 创建一个工作簿
	const workbook = XLSX.utils.book_new();

	// 创建一个工作表
	const worksheet = XLSX.utils.aoa_to_sheet([arr]);

	// 将工作表添加到工作簿
	XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

	// 将工作簿保存为Excel文件
	XLSX.writeFile(workbook, "产品基本信息(模板).xlsx");
};
