<script lang=ts>
	import { firestore } from "$lib/Firebase";
	import { authState } from "$lib/stores";
    import { getDocs, collection, query, where, getDoc, doc } from "firebase/firestore";
    import { RecipeCache } from "$lib/stores";
	import type { Recipe, UserDoc } from "$lib/Zod";
	import RecipeList from "$lib/Components/RecipeList.svelte";
    import { usersStore } from "$lib/stores";

    //TODO: put this somewhere else


    async function GetRecipes(){
      
        if(!$authState){
            return [];
        }
        const myRecipesCol = collection(firestore, "TestRecipes/");

        const recipeQuery = query(myRecipesCol, where("ownerID", "==", $authState.uid))

        const result = await getDocs(recipeQuery)

        const payload : Array<Recipe & {id : string}> = [];
        const otherUserUIDS : string[] = [];

        if(!result.empty){
            result.forEach(doc => {
                const val = doc.data() as Recipe;
                if(val.ownerID != $authState.uid){
                    if(!otherUserUIDS.includes(val.ownerID)){
                        otherUserUIDS.push(val.ownerID)
                    }
                }
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
        const userDocs = await GetUsersByIds(otherUserUIDS);
        const users : {[key : string] : UserDoc} = {}
        userDocs.forEach((doc)=>{
            users[doc.id] = doc
        })
        usersStore.set(users)

        return payload;
    }

    async function GetUsersByIds(uids : string[]){

        const userDocs = uids.map((docID)=>{return getDoc(doc(firestore, `Users`, docID))})

        try{
            const docSnapshots = await Promise.all(userDocs)

            const documents = docSnapshots.map(docSnapshot => {
                    if (docSnapshot.exists()) {
                        return { id: docSnapshot.id, ...docSnapshot.data() as UserDoc};
                    } else {
                        return null; // If the document doesn't exist
                    }
                }).filter(doc => doc !== null);
        return documents

        } catch(err){
            console.error("Error getting documents", err)
            return [];
        }

    }
</script>

<h2 class="text-2xl">My Recipes</h2>
{#if $authState}
    {#await GetRecipes()}
        loading
    {:then recipes}
        <RecipeList data={recipes}/>
    {/await}
{/if}