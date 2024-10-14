<script lang=ts>
	import AutoComplete from "$lib/Components/AutoComplete.svelte";
    import { Draggable } from "$lib/Components/Draggable";
	import IngredientsInput from "$lib/Components/IngredientsInput.svelte";
	import { MultiStep } from "$lib/Components/MultiStep";
	import ProcedureInput from "$lib/Components/ProcedureInput.svelte";
	import { Forward } from "lucide-svelte";
	import Page from "./Recipe/+page.svelte";

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


<MultiStep.Root>

    <MultiStep.Page>

        <div class="composeStep p-1">
            
            <h3 class="text-xl font-bold">Ingredients</h3>

            <IngredientsInput/>
            

        </div>
        <MultiStep.Forward>Next</MultiStep.Forward>

    </MultiStep.Page>

    <MultiStep.Page>
        <div class="composeStep">
            <h3>Procedure</h3>

            <ProcedureInput/>

        </div>
        <MultiStep.Forward>Next</MultiStep.Forward>

    </MultiStep.Page>

    <MultiStep.Page>
        <div class="composeStep p-1">
            <h3 class="font-bold text-xl">Notes</h3>

            <textarea  placeholder="Enter note..." class="border-2 border-black rounded w-full min-h-[7rem]"></textarea>


        </div>


        <button class="bg-accent-1 text-white rounded-md m-auto p-1 block">Submit</button>
    </MultiStep.Page>
</MultiStep.Root>
