<script lang=ts>

    import { RecipeCache } from "$lib/stores";
    import IngredientDisplay from "$lib/Components/IngredientsParser/IngredientDisplay.svelte";
    import { page } from "$app/stores";
	import { onMount } from "svelte";
    import {ChevronLeft, EllipsisVertical, Share2, SquareX, User} from "lucide-svelte"
    import { Modal } from "$lib/Components/UI/Modal";
    import ManageAccess from "$lib/Components/ManageAccess.svelte";
	import { PopOver } from "$lib/Components/UI/PopOver";
	import Open from "$lib/Components/UI/PopOver/Open.svelte";
	import Content from "$lib/Components/UI/PopOver/Content.svelte";

    let recipeID = $page.url.searchParams.get("r");





    onMount(()=>{
        if(!recipeID){
            return;
        }
        


    })

    async function GetRecipe(id : string){
        const recipeFromCache = $RecipeCache[id];
        //If the recipe is in the cache, load that instead
        console.log(recipeFromCache)
        return recipeFromCache;
        

    }

    const mockRecipe = {
        name: "Apple Crisp",
            bites : [{
                name : "Spiced Apples",
                ingredients : [
                    "Six golen delicious apples",
                    "2 Tbsp granulated sugar",
                    "1 1/2 tsp lemon juice",
                ],
                steps : [
                    
                ]
            },
            {
                name : "Crisp Topping",
                ingredients : [
                    "1 cup light brown sugar",
                    "3/4 cup old fashioned oats",
                    "3/4 cup all-purpose flour",
                    "1 sp ground cinnamon",
                    "pinch of kosher salt",
                    "1/2 cup cold unsalted butter"
                ],
                steps : [

                ]
            }
        ],
        steps : [
            "Preheat oven to 350 F degrees. Butter an 8x8 baking dish, or spray with non-stick cooking spray. Set Aside.",
            "In a separate mixing bowl, add topping ingredients (brown sugar, oats, flour, 1 tsp cinnamon, salt, and diced cold butter).",
            "Use pastry cutter to cut the butter into the oat mixture, using a slight downward twisting motion, until mixture resembles pea-sized crumbs. Alternatively, you can use forks or even your hands to cut butter into the mixture.",
            "Spread topping over apples in baking dish, and gently pat to even it out. Bake 40-50 minutes, until golden brown and bubbly"
        ],
        notes : "I hope you enjoy!"
    }

    let conversion = $state(1);
    let shareMenuOpen = $state(false);

    function OpenShareMenu(){
        shareMenuOpen = true;
    }

</script>

<a href="/Dashboard" class="max-w-[50rem] m-auto my-2 font-bold flex justify-start items-center"><ChevronLeft size={30}/>Dashboard</a>
{#await GetRecipe(recipeID || "")}
    loading...
{:then recipe} 
<div class="max-w-[50rem] m-auto bg-white rounded-lg p-4 shadow-md">
    
    <div class="mb-4">
        <div class="flex justify-between">
            <h2 class="text-2xl font-bold">{recipe.name}</h2>
            <PopOver.Root>
                <PopOver.Open><EllipsisVertical/></PopOver.Open>
                <PopOver.Content>
                    <button onclick={OpenShareMenu} class="flex justify-start items-center gap-4 px-3 my-2 hover:bg-light-emphasis font-bold"><Share2 size={20}/> <span>Share</span></button>
                    <button class="flex justify-start items-center gap-4 px-3 hover:bg-light-emphasis font-bold text-red-900"><SquareX size={20}/> <span>Delete</span></button>
                </PopOver.Content>
            </PopOver.Root>

        </div>
        <p class="font-semibold">{recipe.description}</p>
    </div>
    <div class="flex gap-2">
        <button class="border-2 border-accent-1 text-accent-1 font-bold rounded-md px-2 transition-all {conversion === .25? "activeConversion" : ""}" onclick={()=>{conversion = .25}}>.25x</button>
        <button class="border-2 border-accent-1 text-accent-1 font-bold rounded-md px-2 transition-all {conversion === .5? "activeConversion" : ""}" onclick={()=>{conversion = .5}}>.5x</button>
        <button class="border-2 border-accent-1 text-accent-1 font-bold rounded-md px-2 transition-all {conversion === 1? "activeConversion" : ""}" onclick={()=>{conversion = 1}}>1x</button>
        <button class="border-2 border-accent-1 text-accent-1 font-bold rounded-md px-2 transition-all {conversion === 2? "activeConversion" : ""}" onclick={()=>{conversion = 2}}>2x</button>
        <button class="border-2 border-accent-1 text-accent-1 font-bold rounded-md px-2 transition-all {conversion === 3? "activeConversion" : ""}" onclick={()=>{conversion = 3}}>3x</button>
    </div>
    
    <h3  class="text-xl font-bold">Ingredients</h3>
    
    
        <div class="my-3">
            
            <ul class="px-5 list-disc my-1">
                {#each recipe.ingredients as ingredient}
                    <li class="font-semibold"><IngredientDisplay text={ingredient} conversion={conversion}/></li>
                {/each}
            </ul>
        </div>
    
    
    <h3 class="text-xl font-bold">Instructions</h3>
    
    {#each recipe.procedure as step, i}
        <ol class="px-5 my-1">
    
            <li class="my-3">
                <span class="rounded-full inline-flex justify-center items-center h-[2rem] w-[2rem] text-accent-1  border-accent-1 border-2 text-2xl mr-2">
                    <span class="block font-semibold">{i + 1}</span>
                </span>
                <span class="font-semibold">{step}</span>
            </li>
    
        </ol>
    {/each}
    
    {#if recipe.notes}
    
        <h3 class="text-xl font-bold">Notes</h3>
        <p>{recipe.notes}</p>
    {/if}
</div>
{/await}


<div class="max-w-[50rem] m-auto hidden">
    
    <h2 class="text-xl font-bold mb-7">{mockRecipe.name}</h2>
    
    <h3  class="text-xl font-bold">Ingredients</h3>
    
    {#each mockRecipe.bites as bite}
        <div class="my-3">
            <h4 class="font-semibold">{bite.name}</h4>
            <ul class="px-5 list-disc my-1">
                {#each bite.ingredients as ingredient}
                    <li>{ingredient}</li>
                {/each}
            </ul>
        </div>
    {/each}
    
    <h3 class="text-xl font-bold">Instructions</h3>
    
    {#each mockRecipe.bites as bite}
        {#if bite.steps && bite.steps?.length > 0}
            <div class="my-3">
                <h4 class="font-semibold">{bite.name}</h4>
                <ul class="px-5 list-disc my-1">
                    {#each bite.ingredients as ingredient}
                        <li>{ingredient}</li>
                    {/each}
                </ul>
            </div>
        {/if}
    {/each}
    
    {#each mockRecipe.steps as step, i}
        <ol class="px-5 my-1">
    
                <li class="my-3">
                    <span class="rounded-full inline-flex justify-center items-center h-[2rem] w-[2rem] text-accent-1  border-accent-1 border-2 text-2xl mr-2">
                        <span class="block">{i + 1}</span>
                    </span>{step}
                </li>
    
        </ol>
    {/each}
    
    {#if mockRecipe.notes}
    
        <h3 class="text-xl font-bold">Notes</h3>
        <p>{mockRecipe.notes}</p>
    {/if}
</div>

<Modal.Root open={shareMenuOpen}>
    <ManageAccess/>
</Modal.Root>

<style>
    .activeConversion{
        color: white;
        background-color: var(--color-accent-1);
    }
</style>