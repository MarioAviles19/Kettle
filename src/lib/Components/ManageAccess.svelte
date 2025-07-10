<script lang=ts>
    import { Link, X } from "lucide-svelte";
    import { Modal } from "./UI/Modal";
	import type { Recipe, UserDoc } from "$lib/Zod";
    import { usersStore } from "$lib/stores";
	import { authState } from "$lib/stores";
    import {User} from "lucide-svelte";
    import { GetUsersSharedWith, ShareRecipeByEmail, UpdateRecipe } from "$lib/Firebase/recipes";

    interface Props{
        recipe : Recipe,
        onsubmit? : any
    }
    const { recipe, onsubmit = ()=>{} } : Props = $props()

    let link = "This is the link"
    let email = $state("")
    let linkPublicVal : "Restricted" | "Anyone" = $state(recipe.linkPublic? "Anyone" : "Restricted")
    let linkIsPublic = $derived(linkPublicVal == "Anyone")
    const newShares : {email : string, permission : string}[] = $state([])
    let saveDisabled = $derived(linkIsPublic === (recipe.linkPublic ?? false))


    let shouldShowClipboardText = $state(false)

    let isSharing = $state(false);

    let sharedUsers = GetSharedUsers()
    async function GetSharedUsers(){
        //If there is no recipe id, return
        if(recipe?.id){
            const docSnap = await GetUsersSharedWith(recipe.id)

            return docSnap;
        } else{
            return {}
        }
    }
    

    function CopyLink(){
        navigator.clipboard.writeText(link);
        shouldShowClipboardText = true;
        setTimeout(HideText, 2000);
    }
    function HideText(){
        shouldShowClipboardText = false
    }
    function AddEmail(e : Event){
        e.preventDefault();
        
        if(email){
            if(!newShares.some((val)=>{return val.email == email})){
                newShares.push({email, permission : "View"})
            }
            console.log(newShares)
        }
    }
    async function AddShares(){
        //Set state variable to show that it is sending
        isSharing = true
        console.log(recipe)
        //Add the share documents
        const promises = newShares.map((val)=>{
            return ShareRecipeByEmail(recipe.id, val.email, val.permission)
        })

        const res = await Promise.all(promises)
        //update linkPublic
        const updatedRecipe = await UpdateRecipe(recipe.id, {linkPublic : linkIsPublic})
        isSharing = false;
        onsubmit()

    }
    function RemoveShare(i : number){
        newShares.splice(i, 1)
    }


</script>

<div class="bg-white p-4 shadow-xl rounded-md">
    <div class="flex justify-between mb-2">
        <h2 class="font-bold text-xl">Manage Access</h2>
        <Modal.Close class="hover:bg-light-emphasis px-1 rounded-full"><X size={18}/></Modal.Close>
    </div>

    <form onsubmit={AddEmail} class="flex items-stretch justify-between w-full">
        <input bind:value={email} type="text" placeholder="Add People By Email" class="px-2 rounded-none border border-light-emphasis grow">
        <button type="submit" class="px-2 bg-accent-1 text-white">Share</button>
    </form>
    <div class="flex justify-start items-center gap-2 flex-wrap py-2">
        {#each newShares as share, i (share.email)}
            <div class="rounded-full border-subtle-light flex items-center justify-start shadow-border text-sm gap-1 px-1"><p class="m-0">{share.email}</p><button class="text-subtle-light" onclick={()=>{RemoveShare(i)}}><X size={15}/></button></div>
        {/each}
    </div>
    <div class="border-b border-light-emphasis py-2">
        <div class="my-2">
            <h2 class="font-bold text-lg">People Shared With</h2>
        </div>
        {#snippet UserCard(user : UserDoc, permission : string)}
            <div class="flex justify-start items-center gap-4 hover:bg-light-emphasis py-2 px-1">
                <div class="rounded-full flex justify-center shrink-0 bg-light-emphasis items-center overflow-hidden w-10 h-10 sm:w-16 sm:h-16">
                    {#if user.photoURL}
                        <img referrerPolicy="no-referrer" src={user.photoURL} alt="Profile">
                    {:else}
                        <div class="bg-light-emphasis"><User size={40}/></div>
                    {/if}
                </div>
                <div class="">
                    <h3 class="font-bold sm:text-lg text-base">{user.displayName}</h3>
                    <p class="font-semibold sm:text-sm text-xs">{user.email}</p>
                </div>
                <p class="w-full text-right">{permission}</p>
            </div>
        {/snippet}
        {#await sharedUsers}
            loading...
        {:then data} 
            {#if recipe.ownerID === $authState?.uid}
                {@render UserCard({displayName: "You", email: $authState.email || "", photoURL: $authState.photoURL}, "Owner")}
            
                {:else}

                {@render UserCard({displayName: $usersStore[recipe.ownerID].displayName, email : $usersStore[recipe.ownerID].email, photoURL: $usersStore[recipe.ownerID].photoURL}, "Owner")}

            {/if}
            {#each data.users as user}
                {@render UserCard({displayName: user.displayName, email: user.email, photoURL : user.photoURL}, "Viewer")}
            {/each}
        {/await}

        
    </div>


    <h2 class="text-lg font-bold">Access</h2>
    <div class="">
        <select bind:value={linkPublicVal} class="hover:bg-light-emphasis hover:cursor-pointer">
            <option selected={!recipe.linkPublic} value="Restricted">Restricted</option>
            <option value="Anyone">Anyone With The Link</option>
        </select>
        {#if linkIsPublic}
            <p class="text-sm">Anyone with the link can view this recipe</p>
        {:else}
            <p class="text-sm">Only people with access can open with the link</p>
        {/if}
    </div>

    <div class="flex items-center justify-between">
        <div class="py-2 flex justify-start items-end">
            <button onclick={CopyLink} class="py-1 px-3 text-accent-1 shadow-border font-semibold border-gray-300 rounded-3xl"><Link class="inline" size={20}/> Copy Link</button>
            {#if shouldShowClipboardText}
                <p class="text-sm ml-1 font-semibold">Copied!</p>
            {/if}
        </div>
        <button onclick={AddShares} disabled={saveDisabled} class="py-1 px-3 text-white bg-accent-1 transition-all disabled:bg-white shadow-border font-semibold disabled:border-gray-300 rounded-3xl disabled:text-subtle-light">Save</button>
    </div>
</div>