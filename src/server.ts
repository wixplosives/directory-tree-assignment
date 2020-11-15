import express from "express";
import fs from "fs";
import path from "path";
import { getDirectoryTree } from "./get-directory-tree";
import { webpackMiddleware } from "./webpack";

const SERVER_PORT = 8080;
const USER_FILES_DIR = path.resolve(__dirname, "..", "user-files");

const app = express();
app.use(express.json());
app.use(webpackMiddleware);

app.get("/directory-tree", async (_req, res) => {
    res.json(await getDirectoryTree(USER_FILES_DIR));
});

app.get("/file-rename", ({ query }, res) => {
    // Rename file
    fs.renameSync(
        `${USER_FILES_DIR}/${query.parentDirPath}/${query.oldName}`,
        `${USER_FILES_DIR}/${query.parentDirPath}/${query.newName}`
    );
    res.sendStatus(200);
});

app.listen(SERVER_PORT, () => {
    console.log(`Listening on http://localhost:${SERVER_PORT}`);
});
