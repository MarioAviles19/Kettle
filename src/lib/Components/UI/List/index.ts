import ListItem from "./ListItem.svelte"
import ListRoot from "./ListRoot.svelte"
import ListData from "./ListData.svelte"
import ListHeader from "./ListHeader.svelte"
export const key = Object()

export const List = {
    Item : ListItem,
    Root : ListRoot,
    Data : ListData,
    Header : ListHeader
}