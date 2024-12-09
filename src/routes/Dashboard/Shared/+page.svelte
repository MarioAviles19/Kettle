<script lang=ts>
	import { firestore } from "$lib/Firebase";
	import { authState } from "$lib/stores";
    import { getDocs, collection, query, where, getDoc, doc } from "firebase/firestore";
    import { RecipeCache } from "$lib/stores";
	import type { Recipe, UserDoc } from "$lib/Zod";
	import RecipeList from "$lib/Components/RecipeList.svelte";
    import { usersStore } from "$lib/stores";
	import { GetRecipesSharedWith } from "$lib/Firebase/recipes";
	import RecipeListSkeleton from "$lib/Components/RecipeListSkeleton.svelte";

    //TODO: put this somewhere else

    console.log($authState)


    async function GetRecipes(){
      
        if(!$authState){
            return [];
        }
        const myRecipesCol = collection(firestore, "TestRecipes/");

        const result = await GetRecipesSharedWith($authState.uid)

        const otherUserUIDS : string[] = [];

        if((result.recipe.length > 0)){
            result.recipe.forEach(doc => {
                console.log(doc)
                if(doc.ownerID != $authState.uid){
                    if(!otherUserUIDS.includes(doc.ownerID)){
                        otherUserUIDS.push(doc.ownerID)
                    }
                }
                //if the doc is not in the cache, add it.
                if(!$RecipeCache[doc.id]){
                    RecipeCache.update(el=>{


                        $RecipeCache[doc.id] = doc;
                        
                        return Object.assign({}, $RecipeCache)
                        
                    })
                }
            });
        }
        console.log(result);
        console.log($usersStore)
        const userDocs = await GetUsersByIds(otherUserUIDS);
        console.log(userDocs)
        const users : {[key : string] : UserDoc} = {}
        userDocs.forEach((doc)=>{
            users[doc.id] = doc
        })
        usersStore.set(users)

        return result.recipe;
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

<h2 class="text-2xl">Shared With Me</h2>
{#if $authState}
    {#await GetRecipes()}
        <RecipeListSkeleton/>
    {:then recipes}
        <RecipeList data={recipes}/>
    {/await}
{/if}