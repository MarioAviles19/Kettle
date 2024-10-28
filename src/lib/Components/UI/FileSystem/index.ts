import FileSystemRoot from "./FileSystemRoot.svelte";
import FileSystemBreadcrumb from "./FileSystemBreadcrumb.svelte";
import FileSystemDisplayMode from "./FileSystemDisplayMode.svelte";
import FileSystemEntry from "./FileSystemEntry.svelte";
import FileSystemList from "./FileSystemList.svelte";

export const key = Symbol();


export const FileSystem = {
    Root : FileSystemRoot,
    Breadcrumb : FileSystemBreadcrumb,
    DisplayMode : FileSystemDisplayMode,
    Entry : FileSystemEntry,
    List : FileSystemList
}