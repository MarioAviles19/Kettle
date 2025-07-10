<script lang=ts>
	import { writable } from 'svelte/store';


    import IngredientsInput from "./IngredientsInput.svelte";
    import ProcedureInput from "./ProcedureInput.svelte";
    import RecipeDetailsInput from "./RecipeDetailsInput.svelte";
    import { CookingPot, Text, Carrot} from "lucide-svelte"
    import Sticky from './UI/Sticky.svelte';

    

    let ingredientsList : Array<string> = $state([]);

    //TODO: Add fields for total time (Prep and cook)
    //TODO: Add number of Servings
    //TODO: Add equipment



    function AttatchObserver(el : HTMLElement, callback : IntersectionObserverCallback){
        const intersectionOpts : IntersectionObserverInit = {
        rootMargin: "0px 0px -50% 0px",
        }

        const observer = new IntersectionObserver(callback,intersectionOpts)
        observer.observe(el)

    }

    function UpdateCurrentStep(entry : IntersectionObserverEntry, stepNum : number){
        if(entry.isIntersecting){
            currentStep = stepNum;
        }
    }

    let currentStep = 1;

  interface Props {
        description? : string,
        name? : string,
        notes? : string,
        procedure? : string[],
        image? : any,
        ingredients? : string[],
        onsubmit : any,
        oncancel? : any
  }

  let {
        image = $bindable(writable(null)),
        name = $bindable(""),
        description = $bindable(""),
        notes = $bindable(""),
        procedure = $bindable([]),
        ingredients = $bindable([]),
        onsubmit,
        oncancel
}: Props = $props();


</script>

<form onsubmit={onsubmit} class="w-full max-w-clamp-sm m-auto mb-40">
  

    
        <div id="detail" class="composeStep my-4  p-2 min-h-100 mb-2 rounded-md shadow-md bg-white">
            <Sticky class="max-w-clamp-sm m-auto mt-4 p-2">
                <div class="flex justify-end items-center gap-2">
                    <button onclick={oncancel} type="button" class="bg-white shadow-md text-accent-1 text-xl rounded-md px-2 py-1 block font-bold">Cancel</button>
                    <button class="bg-accent-1 shadow-md text-white text-xl rounded-md px-2 py-1 block font-bold">Save</button>
                </div>
            </Sticky>

            
            <div >
                

                <RecipeDetailsInput bind:description bind:notes bind:name bind:image />

            </div>

        </div>
        <div id="ingredients" class="composeStep my-4  p-2 min-h-100 mb-2 rounded-md shadow-md bg-white">


            <div class="my-4">
                <h3 class="text-xl font-bold">Ingredients</h3>
                <div class="my-2">
                    <IngredientsInput bind:ingredients/>
                </div>
            </div>
        </div>

        <div id="procedure" class="composeStep my-4  p-2 min-h-36 mb-2 rounded-md shadow-md bg-white">


            <div>
                <h3 class="text-xl font-bold">Instructions</h3>
                <ProcedureInput bind:steps={procedure}/>

            </div>
            
        </div>

    </form>
<div class="fixed bottom-8 w-full">
    <div class="flex justify-around items-center px-8 w-[90%] min-w-[16rem] max-w-120  m-auto">
        <a href="#detail"  class="mx-[2px] block p-3 transition-all duration-300 rounded-full outline-solid outline-2 outline-accent-1  {name? "bg-accent-1 text-white" : "bg-white text-accent-1"}" type="button"><Text size={30}/></a>
        <div aria-hidden="true" class="h-1 transition-all duration-300 w-full grow {ingredients[0]? "bg-accent-1" : "bg-[#d1d1d1]"}"></div>
        <a href="#ingredients" class=" mx-[2px] block p-3 transition-all duration-300 rounded-full outline-solid outline-2 outline-accent-1  {ingredients[0]? "bg-accent-1 text-white" : "bg-white text-accent-1"}" type="button"><Carrot size={30}/></a>
        <div aria-hidden="true" class="h-1 w-full transition-all duration-300 grow {procedure[0]? "bg-accent-1" : "bg-[#d1d1d1]"}"></div>
        <a href="#procedure" class="mx-[2px] block p-3 transition-all duration-300 rounded-full outline-solid outline-2 outline-accent-1 {procedure[0]? "bg-accent-1 text-white" : "bg-white text-accent-1"}" type="button"><CookingPot size={30}/></a>
    </div>
</div>




<style>



</style>