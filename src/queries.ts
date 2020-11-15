import { useQuery } from "react-query";
import { FsEntity } from "./types";

export const useDirectoryTree = () =>
    useQuery<FsEntity[], Error>(
        "directory-tree",
        () => fetch(`/directory-tree`).then((res) => res.json()),
        {
            refetchOnWindowFocus: false,
        }
    );

export const renameFile = (
    parentDirPath: string,
    oldName: string,
    newName: string
) => {
    console.log(parentDirPath, oldName, newName);
    return fetch(
        `/file-rename` +
            `?parentDirPath=${parentDirPath}` +
            `&oldName=${oldName}` +
            `&newName=${newName}`
    );
};
