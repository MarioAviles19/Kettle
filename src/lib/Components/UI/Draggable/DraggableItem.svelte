<script lang=ts>
import { getContext, setContext } from "svelte";
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

let height = $state(20);

function GetParentSymbol(){
    return symbol;
}
function RemoveParentItem(){
    
    let removeIndex = items.findIndex(el=>{return el.id ===symbol})
    console.log(removeIndex)
    RemoveItem(removeIndex)
  
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
let draggingOver = $state(false);

items.push({id: symbol, data : {}})



</script>



<div bind:clientHeight={height} onpointerup={PointerUp} onpointerenter={PointerEnter} onpointerleave={PointerLeave} role="listitem" style="{$activeItem === symbol? "opacity: 0" : ""}" class="dragItem" >
   
    {#if draggingOver}
        <div class="w-full rounded-md border-accent-1 border-dotted border-4" style="height : {$activeItem?.height | 0}px">
            
        </div>
    {/if}
    

    
        <div class={$activeItem?.id == symbol? "hidden" : ""}>
            {@render children?.()}
        </div>
    

</div>