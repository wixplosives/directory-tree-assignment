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
