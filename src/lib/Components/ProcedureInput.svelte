<script lang=ts>
    import { run } from 'svelte/legacy';

    import { Draggable } from "./UI/Draggable";
    import {Plus, X} from "lucide-svelte"

    interface Props {
        steps?: Array<string>;
    }

    let { steps = $bindable([""]) }: Props = $props();
    let focusedIndex = $state(-1);
    
    let stepInputElements : Array<HTMLTextAreaElement> = $state([]);
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

    run(() => {
        FocusLastElement(stepInputElements);
    });

</script>


<ul class="m-auto w-full max-w-200">
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
                <textarea rows="4" oninput={ResizeToFit} onfocusin={()=>{SetFocusState(i)}} onfocusout={()=>{}} bind:this={stepInputElements[i]} placeholder="Enter info..." class="resize-none border-2 p-1 border-black rounded-sm w-full" bind:value={steps[i]}></textarea>
            </li>
        </Draggable.Item>
        {/each}

    </Draggable.Area>


</ul>
<div>
    <button class="block m-auto bg-accent-1 rounded-full text-white" type="button" onclick={AddStep}><Plus size={30}/></button>
</div>