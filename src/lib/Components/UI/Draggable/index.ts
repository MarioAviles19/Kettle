import DraggableItem from "./DraggableItem.svelte";
import DraggableList from "./DraggableArea.svelte";
import DragHandle from "./DragHandle.svelte";
import RemoveItem from "./RemoveItem.svelte";

export const key = Symbol();
export const handleKey = Symbol();

export const Draggable = {
    Item : DraggableItem,
    Area : DraggableList,
    Handle : DragHandle,
    RemoveButton : RemoveItem
}