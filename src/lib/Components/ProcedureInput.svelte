<script lang=ts>
    import { Draggable } from "./UI/Draggable";
    import {Plus, X} from "lucide-svelte"

    export let steps : Array<string> = [""];
    let focusedIndex = -1;
    
    let stepInputElements : Array<HTMLTextAreaElement> = [];
    let focusFlag = false;

    function AddStep(){
        steps = [...steps, ""]
        focusFlag = true;

    }
    function FocusLastElement(arr : Array<HTMLTextAreaElement>){
        if(arr.length > 0 && focusFlag){
            arr[arr.length - 1]?.focus()
            focusFlag = false;
        }
    }
    function SetFocusState(index : number){
        focusedIndex = index
        
    }
    function ResizeToFit(e : Event){

        const target = e.target as HTMLElement | null

        if(target && target.scrollHeight > 0){
            

            target.style.height = "auto"
            target.style.height = target.scrollHeight + 'px';
        }
    }

    $: FocusLastElement(stepInputElements);

</script>


<ul class="m-auto w-full max-w-[50rem]">
    <Draggable.Area bind:each={steps}>
        {#each steps as step, i}
    
        <Draggable.Item name={i.toString()} lockDrag>
            <li>
                <div class="flex justify-between">
                    <h4 class="font-bold text-lg ">Step {i + 1}</h4>
                   
                        <Draggable.RemoveButton class={focusedIndex !== i || i === 0? "hidden" : ""}>
                            <X/>
                        </Draggable.RemoveButton>
              
                </div>
                <textarea rows="4" on:input={ResizeToFit} on:focusin={()=>{SetFocusState(i)}} on:focusout={()=>{}} bind:this={stepInputElements[i]} placeholder="Enter info..." class="resize-none border-2 p-1 border-black rounded w-full" bind:value={steps[i]}></textarea>
            </li>
        </Draggable.Item>
        {/each}

    </Draggable.Area>


</ul>
<div>
    <button class="block m-auto bg-accent-1 rounded-full text-white" type="button" on:click={AddStep}><Plus size={30}/></button>
</div>