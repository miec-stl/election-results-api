import path from "path";
import fs from "fs";

export const getFilenames = () => {
	return new Promise<Array<string>> ((resolve, reject) => {
		const directoryPath = path.join(__dirname, "..", "data");
		fs.readdir(directoryPath, (err, files) => {
			const returnData: string[] = [];
			if (err) {
				return reject(`Couldn't read directory -  ${err}`);
			}
			files.forEach((file) => (file.includes(".json") ? returnData.push(file.split(".json")[0]) : null));
			return resolve(returnData);
		});
	})
};
