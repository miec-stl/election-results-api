import express from "express";
import data from "../data/2018-nov-06-ward.json";
import { getFilenames } from "./utils";

const app = express();

app.set("port", 3000);

// Returns the IDs of all of the elections that have data associated with them right now.
app.get("/elections", async (_, res) => {
	// We're storing the data in JSON files in a dir on the server. Get the filenames, and return those.
	try {
		const fileNames = await getFilenames();
		return res.send(fileNames);
	} catch (e) {
		res.status(500);
		console.error(e);
		return res.send("Something went wrong when trying to get available elections. Please contact us for help.");
	}
});

app.get("/elections/:id", async (req, res) => {
	// TypeScript can't grab types for the request parameters, so let's define them here.
	// TODO: Type check this, since it's coming from the user.
	const id: string = req.params.id;
	try {
		const fileNames = await getFilenames();
		if (fileNames.includes(id)) {
			// Include the data from the file, somehow, and return that.
			return res.send(data);
		} else {
			res.status(400);
			return res.send("No election with that ID");
		}
	} catch (e) {
		res.status(500);
		console.error(e);
		return res.send("Something went wrong when trying to get available elections. Please contact us for help.");
	}
});

const server = app.listen(app.get("port"), () => {
	console.log(`The server is now running on ${app.get("port")}`);
	console.log("Press CTRL-C to stop\n");
});

export default server;
