<script lang=ts>

    import { RecipeCache } from "$lib/stores";
    import IngredientDisplay from "$lib/Components/IngredientsParser/IngredientDisplay.svelte";
    import { page } from "$app/stores";
	import { onMount } from "svelte";
    import {ChevronLeft, EllipsisVertical, Share2, SquareX, Printer, SquarePen} from "lucide-svelte"
    import { Modal } from "$lib/Components/UI/Modal";
    import ManageAccess from "$lib/Components/ManageAccess.svelte";
	import { PopOver } from "$lib/Components/UI/PopOver";
	import { DeleteDocByID } from "$lib/Firebase/recipes";
	import ConfirmationModal from "$lib/Components/ConfirmationModal.svelte";
	import { goto } from "$app/navigation";
	import MobileConversionMenu from "$lib/Components/UI/MobileConversionMenu.svelte";
	import RecipeInput from "$lib/Components/RecipeInput.svelte";
	import { doc, getDoc } from "firebase/firestore";
	import { firestore } from "$lib/Firebase";
	import type { Recipe } from "$lib/Zod";

    let recipeID = $page.url.searchParams.get("r");

    let confirmationProps = $state({text : "", onConfirm : ()=>{}, onCancel : ()=>{}});
    let confirmationBoxOpen = $state(false);
    let editMode = $state(false)

    function DeleteRecipe(){
        if(!recipeID) return;
        DeleteDocByID("TestRecipes/", recipeID).then(val=>{
            goto("/Dashboard")
            
        }).catch(err=>{console.log(err)})
        RecipeCache.Invalidate()

    }
    function OpenConfirmation(){
        confirmationProps = {
            text : "Are you sure you want to delete this recipe?",
            onConfirm : ()=>{DeleteRecipe()},
            onCancel : ()=>{console.log("Cancel")},
        }
        confirmationBoxOpen = true;

    }
    function ToggleEditMode(){
        editMode = !editMode;
    }


    onMount(()=>{
        console.log(editMode)
        if(!recipeID){
            return;
        }

    })

    async function GetRecipe(id : string){
        //TODO: If there is no recipe in cache, load from db


        if(!$RecipeCache[id]){
            const recipeDoc = doc(firestore, "TestRecipes", id);

            const result = await getDoc(recipeDoc);

            return {id : result.id, ...result.data()} as Recipe
        } else{
            const recipeFromCache = $RecipeCache[id];
            //If the recipe is in the cache, load that instead
            console.log(recipeFromCache)
            return recipeFromCache;
        }

    }


    let conversion = $state(1);
    let shareMenuOpen = $state(false);

    function OpenShareMenu(){
        shareMenuOpen = true;
        console.log(shareMenuOpen)
    }
    function PrintRecipe(){
        window.print();
    }
    function ReloadRecipe(opts? : {useCache? : boolean}){
        RecipeCache.update(el=>{
            if(recipeID && !opts?.useCache){
                delete el[recipeID]
            }
            return el
        })
        recipeData = GetRecipe(recipeID || "")
    }
    let recipeData = $state(GetRecipe(recipeID || ""));
</script>

<a href="/Dashboard" class="max-w-200 m-auto my-2 font-bold flex justify-start items-center print:hidden"><ChevronLeft size={30}/>Dashboard</a>
{#await recipeData}
    loading...
{:then recipe} 

{#if !recipe}

    something went wrong

{:else}
    {#if !editMode}
    <div class="max-w-clamp-sm m-auto bg-white rounded-lg p-4 shadow-md print:shadow-none mb-20 sm:mb-0">
        
        <div class="mb-4">
            <div class="flex justify-between">
                <h2 class="sm:text-2xl text-xl font-bold">{recipe.name}</h2>
                <PopOver.Root class="print:hidden">
                    <PopOver.Open class="hover:bg-light-emphasis transition-all rounded-full"><EllipsisVertical/></PopOver.Open>
                    <PopOver.Content class="bg-white shadow-border rounded-md p-1 text-nowrap min-w-40">
                        <button onclick={ToggleEditMode} class="transition-all px-1 py-2 w-full flex justify-start items-center gap-4 my-2 hover:bg-light-emphasis font-bold"><SquarePen size={20}/> <span>Edit</span></button>
                        <button onclick={PrintRecipe} class="transition-all px-1 py-2 w-full flex justify-start items-center gap-4 my-2 hover:bg-light-emphasis font-bold"><Printer size={20}/> <span>Print</span></button>
                        <button onclick={OpenShareMenu} class="transition-all px-1 py-2 w-full flex justify-start items-center gap-4 my-2 hover:bg-light-emphasis font-bold"><Share2 size={20}/> <span>Share</span></button>
                        <button onclick={OpenConfirmation} class="transition-all px-1 py-2 w-full flex justify-start items-center gap-4 hover:bg-light-emphasis font-bold text-red-900"><SquareX size={20}/> <span>Delete</span></button>
                    </PopOver.Content>
                </PopOver.Root>

            </div>
            {#if recipe?.modified?.seconds}
                <p class="font-semibold text-xs">Updated {new Date(recipe.modified.seconds * 1000).toLocaleString()}</p>
            {/if}
            <p class="font-semibold sm:text-base text-sm">{recipe.description}</p>
        </div>
        <div class="hidden gap-2 print:hidden sm:flex">
            <button class="border-2 border-accent-1 text-accent-1 font-bold rounded-md px-2 transition-all {conversion === .25? "activeConversion" : ""}" onclick={()=>{conversion = .25}}>.25x</button>
            <button class="border-2 border-accent-1 text-accent-1 font-bold rounded-md px-2 transition-all {conversion === .5? "activeConversion" : ""}" onclick={()=>{conversion = .5}}>.5x</button>
            <button class="border-2 border-accent-1 text-accent-1 font-bold rounded-md px-2 transition-all {conversion === 1? "activeConversion" : ""}" onclick={()=>{conversion = 1}}>1x</button>
            <button class="border-2 border-accent-1 text-accent-1 font-bold rounded-md px-2 transition-all {conversion === 2? "activeConversion" : ""}" onclick={()=>{conversion = 2}}>2x</button>
            <button class="border-2 border-accent-1 text-accent-1 font-bold rounded-md px-2 transition-all {conversion === 3? "activeConversion" : ""}" onclick={()=>{conversion = 3}}>3x</button>
        </div>
        
        
        
        <div class="my-3 py-1 border-y border-light-emphasis">
        <h3  class="text-xl font-bold">Ingredients</h3>

            
            <ul class="px-5 list-disc my-2 sm:text-base text-sm">
                {#each recipe.ingredients as ingredient}
                    <li class="font-semibold"><IngredientDisplay text={ingredient} conversion={conversion}/></li>
                {/each}
            </ul>
        </div>
        
        
        <h3 class="text-xl font-bold">Instructions</h3>
        
        {#each recipe.procedure as step, i}
            <ol class="my-4 sm:text-base text-sm sm:px-5 sm:my-2">
        
                <li class="my-3">
                    <span class="rounded-full inline-flex justify-center items-center h-8 w-8 text-white bg-accent-1  border-accent-1  border-2 text-2xl mr-2">
                        <span class="block text-lg font-semibold">{i + 1}</span>
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

    <Modal.Root bind:open={shareMenuOpen} class="backdrop-brightness-75">
        <div class="max-w-160 w-full">
            <ManageAccess onsubmit={ReloadRecipe} recipe={{...recipe, id : recipeID ?? ""}}/>
        </div>
    </Modal.Root>
    {:else}
        <RecipeInput 
        description={recipe.description} 
        ingredients={recipe.ingredients} 
        name={recipe.name} 
        notes={recipe.notes}
        procedure={recipe.procedure}
        onsubmit={()=>{console.log("edit")}}
        oncancel={()=>{editMode = false; ReloadRecipe({useCache : true})}}
        />
    {/if}
{/if}
{/await}





<ConfirmationModal bind:open={confirmationBoxOpen} data={confirmationProps} />

<MobileConversionMenu class="sm:hidden block" bind:conversion/>


<style>
    .activeConversion{
        color: white;
        background-color: var(--color-accent-1);
    }
</style>