<script lang=ts>
    import { Draggable } from "./Draggable";
    import { GripHorizontal, Cross, Plus } from "lucide-svelte";
    import { tick } from "svelte";

    export let ingredients : Array<string> = [];
    export let inputValue : string = "";

    let input : HTMLInputElement;

    let inputElements : Array<HTMLTextAreaElement> = [];

    function AddIngredient(){
        
            ingredients = [...ingredients, ""]
            input?.focus();
            tick().then(()=>{
                inputElements[inputElements.length - 1].focus();
            })
            console.log("mow")
        
    }
    function HandleKeyboardInput(e : KeyboardEvent){
        if(e.key == "Enter" || e.key == "Return"){
            e.preventDefault();
            if(ingredients[ingredients.length - 1] == ""){
                return
            }
            
            AddIngredient();
        }
    }
    
    
    function RemoveIfEmpty(index : number){

   
        if(inputElements[index].value == ""){
            ingredients.splice(index, 1);
            ingredients = ingredients;
        }
    
    }
    function ResizeToFit(e : Event){

        const target = e.target as HTMLElement | null

        if(target && target.scrollHeight > 0){
            

            target.style.height = "auto"
            target.style.height = target.scrollHeight + 'px';
        }
    }

</script>

{#if ingredients?.length == 0}
<button on:click={AddIngredient} type="button" class="group min-h-[12rem] flex flex-col justify-center items-center w-full">
    <span aria-hidden="true" class="group-active:text-accent-1 group-active:bg-[#ffc277] transition-colors text-[#bbbbbb] duration-75 block m-auto bg-[#e4e4e4] rounded-full p-[.5rem] w-fit">
        <Cross size={70}/>
    </span>
    <p>Add an Item</p>
</button>
{/if}

<ul class="list-disc pl-4">
    <Draggable.Area bind:each={ingredients}>
        {#each ingredients as ingredient, i}
    
        <Draggable.Item name={ingredient}>
        
            <li class="my-1">
                <div class="flex justify-left items-center w-full gap-1">
                <textarea rows={1} class="p-1 w-full inline h-auto" on:focusout={()=>{RemoveIfEmpty(i)}} on:input={ResizeToFit} on:keydown={HandleKeyboardInput} bind:this={inputElements[i]} bind:value={ingredients[i]}/>
       
                <Draggable.Handle>
                    <div>
                        <GripHorizontal size={30}/>
                    </div>
                </Draggable.Handle>
            </div>
            </li>
        </Draggable.Item>
        {/each}

    </Draggable.Area>


</ul>
{#if ingredients.length > 0}
<div>
    <button class="block m-auto bg-accent-1 rounded-full text-white" type="button" on:click={AddIngredient}><Plus size={30}/></button>
</div>
{/if}