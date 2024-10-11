<script lang=ts>
    import { Draggable } from "./Draggable";
    import {Plus} from "lucide-svelte"

    export let steps : Array<string> = [""];

    function AddStep(){
        steps = [...steps, ""]
        console.log(steps);
    }

</script>


<ul>
    <Draggable.Area bind:each={steps}>
        {#each steps as step, i}
    
        <Draggable.Item name={i.toString()} lockDrag>
            <li>
                <h4>Step {i + 1}</h4>
                <textarea class="border-2 border-black rounded" bind:value={steps[i]}></textarea>
            </li>
        </Draggable.Item>
        {/each}

    </Draggable.Area>


</ul>
<div>
    
    <button type="button" on:click={AddStep}><Plus/></button>
</div>