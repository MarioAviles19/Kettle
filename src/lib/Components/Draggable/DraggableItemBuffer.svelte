<script lang=ts>
    import { getContext, setContext } from "svelte";
    import {scale} from "svelte/transition"
    import { key, handleKey} from ".";
    import type { Writable } from "svelte/store";
    

    
    
    const {GetDragItems, ActiveDraggedItem, DropItem} = getContext<any>(key)
    
    
    
    const items : Array<any> = GetDragItems();
    const activeItem = ActiveDraggedItem() as Writable<any>
    
    
    
    function PointerEnter(){
        if($activeItem){
            draggingOver = true;
        }
        console.log(draggingOver)
    }
    function PointerLeave(){
        draggingOver = false;
    }
    function PointerUp(){
        DropItem(items[items.length]?.id)
    }
    let draggingOver = false;
    
    
    
    </script>
    
    
    
    <div {...$$restProps}  on:pointerup={PointerUp} on:pointerenter={PointerEnter} on:pointerleave={PointerLeave} role="listitem">
        
        {#if draggingOver}
        <div class="w-full rounded-md border-accent-1 border-dotted border-4" style="height : {$activeItem?.height | 0}px">
            
        </div>
        {/if}
    </div>