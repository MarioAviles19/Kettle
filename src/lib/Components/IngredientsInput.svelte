<script lang=ts>
    import { Draggable } from "./UI/Draggable";
    import { GripHorizontal, Cross, Plus } from "lucide-svelte";
    import { tick } from "svelte";

  interface Props {
    ingredients?: Array<string>;
  }

  let { ingredients = $bindable([]) }: Props = $props();
    

    let input : HTMLInputElement;

    let inputElements : Array<HTMLTextAreaElement> = $state([]);
    if(ingredients.length == 0){
        ingredients.push("");
    }
    function AddIngredient(){
        
            ingredients = [...ingredients, ""]
            input?.focus();
            tick().then(()=>{
                inputElements[inputElements.length - 1].focus();
            })
        
    }
    function HandleKeyboardInput(e : KeyboardEvent){
        if(e.key == "Enter" || e.key == "Return"){
            e.preventDefault();
            if(ingredients[ingredients.length - 1] == ""){
                return
            }
            
            AddIngredient();
        }
        ingredients = ingredients;
    }
    
    //TODO: Loop through all and remove empties instead of just when the empty one is
    //Blurred
    function RemoveIfEmpty(index : number){

        if(inputElements.length <= 1 ){
            return
        }
        if(!inputElements[index]){
            return;
        }
        if(inputElements[index].value == ""){
            ingredients.splice(index, 1);
            ingredients = ingredients;
        }
        ingredients = ingredients

    
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
<button onclick={AddIngredient} type="button" class="group min-h-[25rem] flex flex-col justify-center items-center w-full bg-[#ecececc5] rounded-xl p-9">
    <span aria-hidden="true" class="group-active:text-accent-1 group-active:bg-[#ffc277] transition-colors text-[#bbbbbb] duration-75 block m-auto bg-[#e4e4e4] rounded-full p-[.5rem] w-fit">
        <Cross size={70}/>
    </span>
    <p>Add an Item</p>
</button>

{:else}

<div class="min-h-[10rem]">
    <ul class="list-disc pl-4">
        <Draggable.Area bind:each={ingredients}>
            {#each ingredients as ingredient, i}
        
            <Draggable.Item name={ingredient}>
            
                <li class="my-1">
                    <div class="flex justify-left items-center w-full gap-1">
                    <textarea rows={1} class="resize-none p-1 overflow-hidden w-full inline h-auto" onfocusout={()=>{RemoveIfEmpty(i)}} oninput={ResizeToFit} onkeydown={HandleKeyboardInput} bind:this={inputElements[i]} bind:value={ingredients[i]}></textarea>
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
   
    <div >
        <button class="block m-auto bg-accent-1 rounded-full text-white" type="button" onclick={AddIngredient}><Plus size={30}/></button>
    </div>
  

</div>
{/if}