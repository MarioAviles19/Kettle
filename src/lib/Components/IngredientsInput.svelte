<script lang=ts>
    import { Draggable } from "./Draggable";

    export let ingredients : Array<string> = [];
    export let inputValue : string = "";

    function AddIngredient(){
        if(inputValue !== ""){
            ingredients = [...ingredients, inputValue]
            inputValue = ""
        }
    }

</script>

<ul>
    <Draggable.Area bind:each={ingredients}>
        {#each ingredients as ingredient}
    
        <Draggable.Item name={ingredient}>
            <Draggable.Handle>
            <li>
                <p>{ingredient}</p>
            </li>
            </Draggable.Handle>
        </Draggable.Item>
        {/each}

    </Draggable.Area>


</ul>

<div class="flex items-center justify-start p-1 gap-2">
    <input class="outline-slate-700 outline-3 outline" bind:value={inputValue} placeholder="Ingredients..." type="text">
    <button class="rounded border-2 border-black py-1 px-2" on:click={AddIngredient} type="button">Add</button>
</div>