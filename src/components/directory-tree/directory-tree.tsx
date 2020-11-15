import React, { FC, Fragment } from "react";
import { useDirectoryTree } from "../../queries";
import { FsEntity } from "../../types";
import FileIcon from "../icons/file";
import FolderIcon from "../icons/folder";
import styles from "./directory-tree.css";

export const DirectoryTree: FC = () => {
    const { data, error } = useDirectoryTree();

    return (
        <div className={styles.root}>
            {error ? (
                `Error: ${error.message}`
            ) : data ? (
                <DirectoryContents parentDirs={[]} contents={data} />
            ) : (
                "Loading"
            )}
        </div>
    );
};

interface DirectoryContentsProps {
    contents: FsEntity[];
    parentDirs: string[];
}

const DirectoryContents: FC<DirectoryContentsProps> = ({
    parentDirs,
    contents,
}) => {
    return (
        <div className={styles.directoryContents}>
            {contents.map((fsEntity) => (
                <TreeItem
                    key={fsEntity.name}
                    parentDirs={parentDirs}
                    fsEntity={fsEntity}
                />
            ))}
        </div>
    );
};

interface TreeItemProps {
    fsEntity: FsEntity;
    parentDirs: string[];
}

const TreeItem: FC<TreeItemProps> = ({ parentDirs, fsEntity }) => {
    return (
        <Fragment>
            <div className={styles.item}>
                {fsEntity.type === "directory" ? (
                    <FolderIcon className={styles.itemIcon} />
                ) : (
                    <FileIcon className={styles.itemIcon} />
                )}
                <TreeItemName name={fsEntity.name} />
            </div>

            {fsEntity.type === "directory" && (
                <DirectoryContents
                    contents={fsEntity.contents}
                    parentDirs={parentDirs.concat(fsEntity.name)}
                />
            )}
        </Fragment>
    );
};

interface TreeItemNameProps {
    name: string;
}

const TreeItemName: FC<TreeItemNameProps> = ({ name }) => {
    return (
        <div className={styles.itemName} title={name}>
            {name}
        </div>
    );
};
