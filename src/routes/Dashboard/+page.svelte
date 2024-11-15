<script lang=ts>
	import { firestore } from "$lib/Firebase";
	import { authState } from "$lib/stores";
    import { getDocs, collection, query, where } from "firebase/firestore";
    import { RecipeCache } from "$lib/stores";
	import type { Recipe } from "$lib/Zod";
	import RecipeList from "$lib/Components/RecipeList.svelte";


    async function GetRecipes(){
      
        if(!$authState){
            return [];
        }
        const myRecipesCol = collection(firestore, "TestRecipes/");

        const recipeQuery = query(myRecipesCol, where("ownerID", "==", $authState.uid))

        const result = await getDocs(recipeQuery)

        const payload : Array<Recipe & {id : string}> = [];

        if(!result.empty){
            result.forEach(doc => {
                const val = doc.data() as Recipe;
                console.log(doc);
                console.log(doc.data())
                payload.push({...val, id : doc.id})
                //if the doc is not in the cache, add it.
                if(!$RecipeCache[doc.id]){
                    RecipeCache.update(el=>{


                        $RecipeCache[doc.id] = val;
                        


                        return Object.assign({}, $RecipeCache)
                        
                    })
                }
            });
        }
        console.log(result);
        return payload;
    }
</script>

<h2 class="text-2xl ">My Recipes</h2>
{#if $authState}
    {#await GetRecipes()}
        loading
    {:then recipes} 
        <RecipeList data={recipes}/>
    {/await}
{/if}