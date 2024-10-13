<script lang=ts>
import { getContext, setContext } from "svelte";
import {scale} from "svelte/transition"
import { key, handleKey} from ".";
import type { Writable } from "svelte/store";

export let name : string;
export let lockDrag = false;

setContext(handleKey, {
    HandleDragEnter,
    GetParentSymbol,
    RemoveParentItem

})
let symbol = Symbol(name);

const {GetDragItems, ActiveDraggedItem, DropItem} = getContext<any>(key)



const items : Array<any> = GetDragItems();
const activeItem = ActiveDraggedItem() as Writable<any>

let height = 20;

function GetParentSymbol(){
    return symbol;
}
function RemoveParentItem(){
    let removeIndex = items.findIndex(el=>{return el.id ===symbol})
    items.splice(removeIndex, 1);
}

function HandleDragEnter(e : PointerEvent | any){
    if(!e.target || lockDrag){
        return;
    }
    activeItem.set({id: symbol, data : {}, height})
    e.target.releasePointerCapture(e.pointerId)
}

function PointerEnter(){
    if($activeItem !== symbol && $activeItem){
        draggingOver = true;
    }
    console.log(draggingOver)
}
function PointerLeave(){
    draggingOver = false;
}
function PointerUp(){
    DropItem(symbol)
}
let draggingOver = false;

items.push({id: symbol, data : {}})



</script>



<div bind:clientHeight={height} on:pointerup={PointerUp} on:pointerenter={PointerEnter} on:pointerleave={PointerLeave} role="listitem" style="{$activeItem === symbol? "opacity: 0" : ""}" class="dragItem" >
   
    {#if draggingOver}
        <div class="w-full rounded-md border-accent-1 border-dotted border-4" style="height : {$activeItem?.height | 0}px">
            
        </div>
    {/if}
    

    
        <div class={$activeItem?.id == symbol? "hidden" : ""}>
            <slot/>
        </div>
    

</div>