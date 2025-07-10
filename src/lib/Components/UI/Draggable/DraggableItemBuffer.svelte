<script lang=ts>
    import { getContext, setContext } from "svelte";
    import {scale} from "svelte/transition"
    import { key, handleKey} from ".";
    import type { Writable } from "svelte/store";
    interface Props {
        [key: string]: any
    }

    let { ...rest }: Props = $props();
    

    
    
    const {GetDragItems, ActiveDraggedItem, AddItemToEnd} = getContext<any>(key)
    
    
    
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
        AddItemToEnd()
    }
    let draggingOver = $state(false);
    
    
    
    </script>
    
    
    
    <div {...rest}  onpointerup={PointerUp} onpointerenter={PointerEnter} onpointerleave={PointerLeave} role="listitem">
        
        {#if draggingOver}
        <div class="w-full rounded-md border-accent-1 border-dotted border-4 min-h-4" style="height : {$activeItem?.height | 0}px">
            
        </div>
        {/if}
    </div>