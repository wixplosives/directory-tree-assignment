export interface FsEntityDir {
    type: "directory";
    name: string;
    contents: FsEntity[];
}

export interface FsEntityFile {
    type: "file" | "symlink" | "other";
    name: string;
}

export type FsEntity = FsEntityDir | FsEntityFile;
