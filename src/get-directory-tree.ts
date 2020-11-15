import { promises as fs } from "fs";
import path from "path";
import { FsEntity } from "./types";

export const getDirectoryTree = async (
    dirPath: string
): Promise<FsEntity[]> => {
    const dirContents = await fs.readdir(dirPath, { withFileTypes: true });

    let tree: FsEntity[] = [];
    for (const entity of dirContents) {
        if (entity.isDirectory()) {
            tree.push({
                type: "directory",
                name: entity.name,
                contents: await getDirectoryTree(
                    path.join(dirPath, entity.name)
                ),
            });
        } else if (entity.isFile()) {
            tree.push({ type: "file", name: entity.name });
        } else if (entity.isSymbolicLink()) {
            tree.push({ type: "symlink", name: entity.name });
        } else {
            tree.push({ type: "other", name: entity.name });
        }
    }

    // Sorted alphabetically, lower case first, directories on top
    return tree.sort((a, b) => {
        if (a.type === "directory" && b.type !== "directory") {
            return -1;
        } else if (a.type !== "directory" && b.type === "directory") {
            return 1;
        } else {
            return a.name.localeCompare(b.name, "en");
        }
    });
};
