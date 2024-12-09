<script lang=ts>
import { getContext, onMount, setContext, type Snippet } from "svelte";
import {scale} from "svelte/transition"
import { key, handleKey} from ".";
import type { Writable } from "svelte/store";


  interface Props {
    name: string;
    lockDrag?: boolean;
    children?: import('svelte').Snippet;
  }

  let { name, lockDrag = false, children }: Props = $props();

setContext(handleKey, {
    HandleDragEnter,
    GetParentSymbol,
    RemoveParentItem

})
let symbol = Symbol(name);
const {GetDragItems, ActiveDraggedItem, DropItem, RemoveItem} = getContext<any>(key)



const items : Array<any> = GetDragItems();
const activeItem = ActiveDraggedItem() as Writable<any>
let itemArea : HTMLDivElement | undefined = $state()

let height = $state(20);

function GetParentSymbol(){
    return symbol;
}
function RemoveParentItem(){
    
    let removeIndex = items.findIndex(el=>{return el.id === symbol})
    RemoveItem(removeIndex)
  
}

function HandleDragEnter(e : PointerEvent | any){
    if(!e.target || !itemArea){
        return;
    }
    const rect = itemArea.getClientRects()
    let x, y;

    // Check if it's a touch event (touches[0] for the first touch)
    if (e.touches) {
    x = e.touches[0].clientX - rect[0].left;
    y = e.touches[0].clientY - rect[0].top;
    } else {
    // It's a mouse event
    x = e.clientX - rect[0].left;
    y = e.clientY - rect[0].top;
    }



    activeItem.set({id: symbol, data : {}, height, contents : children, offset : {x, y}})
    e.target.releasePointerCapture(e.pointerId)
}

function PointerEnter(){
    if($activeItem !== symbol && $activeItem){
        draggingOver = true;
    }
}
function PointerLeave(){
    draggingOver = false;
}
function PointerUp(){
    DropItem(symbol)
}
let draggingOver = $state(false);

items.push({id: symbol, data : {}})




</script>

{#snippet item()}
<div class="{$activeItem?.id == symbol? "hidden" : ""}" style={$activeItem? "user-select: none" : ""}>
    {@render children?.()}
</div>
{/snippet}

<div bind:clientHeight={height} bind:this={itemArea} onpointerup={PointerUp} onpointerenter={PointerEnter} onpointerleave={PointerLeave} role="listitem" style="{$activeItem === symbol? "opacity: 0" : ""};" class="dragItem"  >
   
    {#if draggingOver && $activeItem}
        <div class="w-full rounded-md border-accent-1 border-dotted border-4" style="height : {$activeItem?.height | 0}px">
            <div class="hidden pointer-events-none">{@render item()}</div>
        </div>
    {/if}
    



        {@render item()}
    

</div>