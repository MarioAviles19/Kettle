<script lang=ts>
	import type { Draggable } from "$lib/types";

    import { onDestroy, setContext } from "svelte";
    import { key } from ".";
    import { writable } from "svelte/store";
	import DraggableItemBuffer from "./DraggableItemBuffer.svelte";

    //TODO: allow use of component outside of each loop

    export let each : Array<any>;

    let dragItems : Array<{id: Symbol, data : any}> = [];

    let activeItem = writable<{id: Symbol, data : any, height : number} | null>(null);

    let mouseY = 0;
    let mouseX = 0;

    const GetCurrentDraggedItem = () => activeItem;

    const DropItem = (target : symbol)=>{

        const activeIndex = dragItems.findIndex(el=>{return el.id === $activeItem?.id})
        const targetIndex = dragItems.findIndex((el)=>{return el.id === target}) as number
        if(activeIndex !== -1 && targetIndex !== -1){
        //swap values
        [each[activeIndex], each[targetIndex]] = [each[targetIndex], each[activeIndex]]
        each = each;
        console.log(each);
        }
        activeItem.set(null)
    }


    setContext(key, {
        GetDragItems : ()=> dragItems,
        ActiveDraggedItem : GetCurrentDraggedItem,
        DropItem

    })



 
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




<div role="list" on:pointermove={CaptureMouseMovement} on:pointerdown={CaptureMouseMovement} on:pointerup={DragEnd}  class="p-1 touch-none" >

    <slot/>

    <DraggableItemBuffer class="min-h-[1.25rem]" />

    {#if $activeItem}
    <div class="{$activeItem? "block" : "hidden"} bg-white fixed pointer-events-none border-2 border-black rounded-md font-bold px-2" style="top:{mouseY}px; left:{mouseX}px">
        {$activeItem?.id?.description}
    </div>
    {/if}
</div>


<style>

</style>