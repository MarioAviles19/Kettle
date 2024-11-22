<script lang=ts>
	import type { Draggable } from "$lib/types";

    import { onDestroy, setContext } from "svelte";
    import { key } from ".";
    import { writable } from "svelte/store";
	import DraggableItemBuffer from "./DraggableItemBuffer.svelte";

    //TODO: allow use of component outside of each loop

    interface Props {
        each: Array<any>;
        children?: import('svelte').Snippet;
    }

    let { each = $bindable(), children }: Props = $props();

    let dragItems : Array<{id: Symbol, data : any}> = [];

    let activeItem = writable<{id: Symbol, data : any, height : number} | null>(null);

    let mouseY = $state(0);
    let mouseX = $state(0);

    const GetCurrentDraggedItem = () => activeItem;

    const DropItem = (target : symbol)=>{
        console.log({dragItems, each})
        const activeIndex = dragItems.findIndex(el=>{return el.id === $activeItem?.id})
        const targetIndex = dragItems.findIndex((el)=>{return el.id === target}) as number
        if(activeIndex !== -1 && targetIndex !== -1){
        //swap values

        const item = each[activeIndex];
        //Get rid of item being moved
        each.splice(activeIndex, 1);
        //Place it at the target index
        each.splice(targetIndex, 0, item)
        each = each;
        
        console.log({each, targetIndex, activeIndex});
        }
        activeItem.set(null)
    }
    function AddItemToEnd(){

        const activeIndex = dragItems.findIndex(el=>{return el.id === $activeItem?.id})
        if(activeIndex !== -1){


        const item = each[activeIndex];
        //Get rid of item being moved
        each.splice(activeIndex, 1);
        //Place it at the end
        each.push(item)
        each = each;
        
        }
        activeItem.set(null)
    }


    setContext(key, {
        GetDragItems : ()=> dragItems,
        ActiveDraggedItem : GetCurrentDraggedItem,
        DropItem,
        RemoveItem,
        AddItemToEnd

    })


    function RemoveItem(index : number){
        each.splice(index, 1);
        each = each;

        dragItems.splice(index,1);
        dragItems = dragItems;
        console.log(index);
        console.log(each);
    }
 
    onDestroy(()=>{
        dragItems = [];
    })
    function CaptureMouseMovement(e : Event | any){
        mouseX = e.pageX;
        mouseY = e.pageY;
        
    }
    function CancelDrag(e: Event){
        console.log("cancel")
        console.log(e.target)
        activeItem.set(null);
    }
    function DragEnd(e : Event){
        console.log($activeItem)
        activeItem.set(null);
    }


</script>




<div role="list" onpointermove={CaptureMouseMovement} onpointerdown={CaptureMouseMovement} onpointerup={DragEnd}  class="p-1 touch-none" >

    {@render children?.()}

    <DraggableItemBuffer class="min-h-[1.25rem]" />

    {#if $activeItem}
    <div class="{$activeItem? "block" : "hidden"} bg-white fixed pointer-events-none border-2 border-black rounded-md font-bold px-2" style="top:{mouseY}px; left:{mouseX}px">
        {$activeItem?.id?.description}
    </div>
    {/if}
</div>


<style>

</style>