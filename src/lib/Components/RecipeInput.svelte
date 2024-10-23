<script lang=ts>
    import IngredientsInput from "./IngredientsInput.svelte";
    import ProcedureInput from "./ProcedureInput.svelte";
    import RecipeDetailsInput from "./RecipeDetailsInput.svelte";
    import { scrollYPos } from "$lib/stores";
	import AutoComplete from "./AutoComplete.svelte";
    import { CookingPot, Text, Carrot} from "lucide-svelte"
    

    let ingredientsList : Array<string> = [];



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
    
    let image : any;
    let name = "Untitled";
    let description = "";
    let notes = "";
    let procedure : Array<string> = [""];

    export let  recipe = {
        image,
        name,
        description,
        notes,
        procedure
    }

    $:recipe = {
        image,
        name,
        description,
        notes,
        procedure
    };

</script>

<div class="w-full max-w-[40rem] m-auto mb-[10rem]">
  
    
        <div id="detail" class="composeStep my-4  p-1 min-h-[25rem]  ">
            

            
            <div >
                

                <RecipeDetailsInput bind:description bind:notes bind:name bind:image />

            </div>

        </div>
        <div id="ingredients" class="composeStep my-4  p-1 min-h-[25rem]  ">


            <div class="my-4">
                <h3 class="text-xl font-bold">Ingredients</h3>
                <div class="my-2">
                    <IngredientsInput bind:ingredients={ingredientsList}/>
                </div>
            </div>
        </div>

        <div id="procedure" class="composeStep my-4  p-1 min-h-[9rem]  ">


            <div>
                <h3 class="text-xl font-bold">Instructions</h3>
                <ProcedureInput bind:steps={procedure}/>

                <button class="bg-accent-1 my-4 text-white text-xl rounded-md m-auto px-4 py-1 block font-bold">Save</button>
            </div>
            
        </div>

</div>
<div class="fixed bottom-8 w-full">
    <div class="flex justify-around items-center px-[2rem] w-[90%] min-w-[16rem] max-w-[30rem]  m-auto">
        <a href="#detail"  class="mx-[2px] block p-3 transition-all duration-300 rounded-full outline outline-2 outline-accent-1  {name? "bg-accent-1 text-white" : "bg-white text-accent-1"}" type="button"><Text size={30}/></a>
        <div aria-hidden="true" class="h-1 transition-all duration-300 w-full grow {ingredientsList[0]? "bg-accent-1" : "bg-[#d1d1d1]"}"></div>
        <a href="#ingredients" class=" mx-[2px] block p-3 transition-all duration-300 rounded-full outline outline-2 outline-accent-1  {ingredientsList[0]? "bg-accent-1 text-white" : "bg-white text-accent-1"}" type="button"><Carrot size={30}/></a>
        <div aria-hidden="true" class="h-1 w-full transition-all duration-300 grow {procedure[0]? "bg-accent-1" : "bg-[#d1d1d1]"}"></div>
        <a href="#procedure" class="mx-[2px] block p-3 transition-all duration-300 rounded-full outline outline-2 outline-accent-1 {procedure[0]? "bg-accent-1 text-white" : "bg-white text-accent-1"}" type="button"><CookingPot size={30}/></a>
    </div>
</div>


<style>



</style>