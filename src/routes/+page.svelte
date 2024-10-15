<script lang=ts>
	import AutoComplete from "$lib/Components/AutoComplete.svelte";
    import { Draggable } from "$lib/Components/Draggable";
	import IngredientsInput from "$lib/Components/IngredientsInput.svelte";
	import { MultiStep } from "$lib/Components/MultiStep";
	import ProcedureInput from "$lib/Components/ProcedureInput.svelte";
	import { Forward, Apple, CookingPot, Text, Cross } from "lucide-svelte";
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

    let currentPage : number;
    let ingredientsList : Array<string>
    
</script>


<MultiStep.Root bind:page={currentPage}>

    <nav>
        <ul class="flex items-center justify-between gap-3 m-auto max-w-[10rem] ">
            <li>
                <button type="button" class="flex flex-col items-center">
                    <Apple class="transition-all duration-300 {currentPage >= 0? "text-accent-1" : "text-[#6a6a6a66]"}"/>
                    <div class="w-[2.5rem] h-1 slider {currentPage >= 0? "filled" : ""} skew-x-[20deg]"></div>
                </button>
            </li>
            <li>
                <button type="button" class="flex flex-col items-center">
                    <CookingPot class="transition-all duration-300 {currentPage >= 1? "text-accent-1" : "text-[#6a6a6a66]"}"/>
                    <div class="w-[2.5rem] slider {currentPage >= 1? "filled" : ""} h-1 skew-x-[20deg]"></div>
                </button>
            </li>
            <li>

                <button type="button" class="flex flex-col items-center ">
                    <Text class="transition-all duration-300 {currentPage >= 2? "text-accent-1" : "text-[#6a6a6a66]"}"/>
                <div class="w-[2.5rem] slider {currentPage >= 2? "filled" : ""} h-1 skew-x-[20deg]"></div>
                    
            </li>
        </ul>
    </nav>


    <MultiStep.Page>

        <div class="composeStep p-1 min-h-[5rem]">
            
            <h3 class="text-xl font-bold">Ingredients</h3>


            <IngredientsInput bind:ingredients={ingredientsList}/>
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

<style>
    .composeStep{

    }
    .slider{
        background: linear-gradient(to left, rgba(128, 128, 128, 0.354) 50%, var(--color-accent-1) 50%) right;
        background-size: 200% 100%;
        transition: background 800ms ease;
    }
    .slider.filled{
        background-position: left;
    }
</style>