import classNames from "classnames";
import React, { FC, Fragment, useState } from "react";
import { useQueryCache } from "react-query";
import { renameFile, useDirectoryTree } from "../../queries";
import { FsEntity } from "../../types";
import FileIcon from "../icons/file";
import FolderIcon from "../icons/folder";
import PencilIcon from "../icons/pencil";
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
                    siblings={contents.map((sibling) => sibling.name)}
                />
            ))}
        </div>
    );
};

interface TreeItemProps {
    fsEntity: FsEntity;
    parentDirs: string[];
    siblings: string[];
}

const TreeItem: FC<TreeItemProps> = ({ parentDirs, fsEntity, siblings }) => {
    return (
        <Fragment>
            <div className={styles.item}>
                {fsEntity.type === "directory" ? (
                    <FolderIcon className={styles.itemIcon} />
                ) : (
                    <FileIcon className={styles.itemIcon} />
                )}
                <TreeItemName
                    name={fsEntity.name}
                    parentDirs={parentDirs}
                    sinblings={siblings}
                />
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
    parentDirs: string[];
    sinblings: string[];
}

const TreeItemName: FC<TreeItemNameProps> = ({
    name,
    parentDirs,
    sinblings,
}) => {
    const queryCache = useQueryCache();

    const [rename, setRename] = useState(false);
    const [newName, setNewName] = useState(name);
    const [error, setError] = useState("");

    const onInputChange = (event: React.ChangeEvent) => {
        const inputValue = (event.target as HTMLInputElement).value;

        const count = sinblings.filter(
            (siblingName) => siblingName === inputValue
        ).length;

        if (count === 1 && inputValue !== name) {
            setNewName(inputValue);
            setError(
                `A file or folder ${newName} already exists.` +
                    ` Please chose a different name.`
            );
        } else {
            setNewName(inputValue);
            setError("");
        }
    };

    const onKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === "Escape") {
            setRename(false);
        }

        if (event.key === "Enter") {
            if (!error) {
                const path = parentDirs.join("/");
                renameFile(path, name, newName);
                setRename(false);
                queryCache.invalidateQueries("directory-tree");
            }
        }
    };

    const onblur = () => {
        if (!error) {
            const path = parentDirs.join("/");
            renameFile(path, name, newName);
            setRename(false);
            queryCache.invalidateQueries("directory-tree");
        } else {
            setRename(false);
        }
    };

    return rename ? (
        <div className={styles.itemNameEdit}>
            <input
                className={classNames(styles.itemNameInput, {
                    [styles.invalid]: error,
                })}
                value={newName}
                onChange={onInputChange}
                onKeyDown={onKeyDown}
                onBlur={onblur}
                autoFocus
            />
            {error && (
                <div className={styles.itemNameErrorMessage}>{error}</div>
            )}
        </div>
    ) : (
        <Fragment>
            <div className={styles.itemName}>{name}</div>
            <PencilIcon
                className={styles.itemNameChangeIcon}
                onClick={() => setRename(true)}
            />
        </Fragment>
    );
};
