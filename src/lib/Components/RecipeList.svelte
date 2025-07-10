<script lang=ts>

    import { List } from "./UI/List";
    import { Text, Drumstick, Clock } from "lucide-svelte";
	import type { Recipe } from "$lib/Zod";
    import { authState, usersStore } from "$lib/stores";
	import { ConvertMinutesToTime } from "./Misc";


    interface Props {
        data: Recipe[];
        grid?: boolean;
    }

    let { data, grid = true }: Props = $props();
    console.log(data);
   
</script>

{#if !grid}
<List.Root class="w-full">
    <List.Header class="border-b border-soft-black text-soft-black">
        <List.Data class="font-bold">
            Name
        </List.Data>
        <List.Data class="font-bold">
            Last Modified
        </List.Data>
        <List.Data class="font-bold">
            Owner
        </List.Data>
    </List.Header>

    {#each data as recipe}
    <a href="/Recipe?r={recipe.id}">
        <List.Item class="border-b border-soft-black hover:bg-[#f3f3f3] font-medium hidden sm:grid py-1">

            <div class="row-span-2 sm:hidden flex justify-center items-center ">
                <Text class="mr-1 text-accent-1 opacity-65"/>
            </div>
            <List.Data class="w-full col-span-2 sm:col-auto">
                <Text class="mr-1 text-accent-1 hidden sm:inline-block"/>
                {recipe.name}
            </List.Data>
            <List.Data class="text-sm sm:text-base">
                {new Date(recipe?.modified?.seconds * 1000 || "").toLocaleDateString()}
            </List.Data>
            <List.Data class="text-sm sm:text-base">
                {recipe.ownerID == $authState?.uid? "You" : $usersStore[recipe.ownerID]?.displayName || "Unknown"}
            </List.Data>
        </List.Item>
        <List.Item class="border-b border-soft-black hover:bg-[#f3f3f3] font-medium grid sm:hidden">

            <div class="row-span-2 sm:hidden flex justify-center items-center">
                <Text class="mr-1 text-accent-1" size={30}/>
            </div>
            <List.Data class="w-full col-span-2 sm:col-auto">
                <Text class="mr-1 text-accent-1 hidden sm:inline-block"/>
                {recipe.name}
            </List.Data>
            <List.Data class="text-sm sm:text-base">
                {recipe.name}
            </List.Data>
        </List.Item>
    </a>
    {/each}
    {#if data.length == 0}
        <div class="flex items-center flex-col justify-center p-40 text-subtle-light-hard">
            <div class="rounded-full bg-light-emphasis p-4">
                <Drumstick size={70}/>
            </div>
            <p class="text-center text-lg font-semibold text-subtle-light-hard">No Recipes</p>
        </div>
    {/if}
    
</List.Root>

{:else}
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
        {#each data as recipe}
            <a href="/Recipe?r={recipe.id}" class="rounded-xl transition-all bg-zinc-200 hover:bg-zinc-300 p-2 shadow-md hover:shadow-lg">
                <div class="flex justify-between items-center gap-2">
                    <h3 class="font-bold">{recipe.name}</h3>
                        <p class="font-bold text-sm"><Clock class="inline" size={16}/> {recipe.cookTimeMinutes? ConvertMinutesToTime(recipe.cookTimeMinutes) : ""}</p>
                </div>
                {#if recipe?.modified?.seconds}
                    <p class="text-sm font-semibold text-zinc-600">{new Date(recipe.modified.seconds * 1000).toLocaleDateString()} by {recipe.ownerID == $authState?.uid? "You" : $usersStore[recipe.ownerID]?.displayName || "Unknown"}</p>
                {/if}

            </a>
        {/each}
    </div>
    {#if data.length == 0}
    <div class="flex items-center flex-col justify-center p-40 text-subtle-light-hard">
        <div class="rounded-full bg-light-emphasis p-4">
            <Drumstick size={70}/>
        </div>
        <p class="text-center text-lg font-semibold text-subtle-light-hard">No Recipes</p>
    </div>
{/if}


{/if}