<script lang=ts>
    import { Draggable } from "./Draggable";

    export let ingredients : Array<string> = [];
    export let inputValue : string = "";

    let input : HTMLInputElement;

    function AddIngredient(){
        if(inputValue !== ""){
            ingredients = [...ingredients, inputValue]
            inputValue = ""
            input?.focus();
        }
    }

</script>

<ul class="list-disc pl-4">
    <Draggable.Area bind:each={ingredients}>
        {#each ingredients as ingredient}
    
        <Draggable.Item name={ingredient}>
            <Draggable.Handle>
            <li class="">
                <p>{ingredient}</p>
            </li>
            </Draggable.Handle>
        </Draggable.Item>
        {/each}

    </Draggable.Area>


</ul>

<form on:submit|preventDefault class="flex items-center justify-start p-1 gap-2">
    <input class="border-2 border-black rounded px-1" bind:this={input} bind:value={inputValue} placeholder="Ingredients..." type="text">
    <button class="rounded-md border-2 text-white bg-accent-1 px-2" on:click={AddIngredient} type="submit">Add</button>
</form>