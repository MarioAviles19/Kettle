<script lang=ts>
    import { Draggable } from "./Draggable";
    import {Plus} from "lucide-svelte"

    export let steps : Array<string> = [""];

    function AddStep(){
        steps = [...steps, ""]
        console.log(steps);
    }
    

</script>


<ul class="m-auto w-full max-w-[50rem]">
    <Draggable.Area bind:each={steps}>
        {#each steps as step, i}
    
        <Draggable.Item name={i.toString()} lockDrag>
            <li>
                <h4 class="font-bold text-lg">Step {i + 1}</h4>
                <textarea placeholder="Enter info..." class="border-2 border-black rounded w-full min-h-[7rem]" bind:value={steps[i]}></textarea>
            </li>
        </Draggable.Item>
        {/each}

    </Draggable.Area>


</ul>
<div>
    <button class="block m-auto bg-accent-1 rounded-full text-white" type="button" on:click={AddStep}><Plus size={30}/></button>
</div>