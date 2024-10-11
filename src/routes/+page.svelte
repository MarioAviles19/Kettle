<script lang=ts>
	import AutoComplete from "$lib/Components/AutoComplete.svelte";
    import { Draggable } from "$lib/Components/Draggable";
	import IngredientsInput from "$lib/Components/IngredientsInput.svelte";
	import ProcedureInput from "$lib/Components/ProcedureInput.svelte";

    let ingredients : Array<string> = ["1/2 cups of flour", "2 tbs of sugar"];

    let ingredientValue : string;

    function OnAddIngredient(){

        if(ingredientValue){
            ingredients = [...ingredients, ingredientValue]
            ingredientValue = "";
        }
    }
    $: ingredients;
    
</script>


<div class="composeStep">
    
    <h3>Ingredients</h3>

    <IngredientsInput/>
    

</div>

<div class="composeStep">
    <h3>Procedure</h3>

    <ProcedureInput/>

</div>

