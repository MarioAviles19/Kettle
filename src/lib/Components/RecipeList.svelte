<script lang=ts>
    import { List } from "./UI/List";
    import { Text } from "lucide-svelte";
	import type { Recipe } from "$lib/Zod";
    export let data : Recipe[];
    export let mode : "table" | "blocks" = "table";
</script>


<List.Root class="w-full">
    <List.Header class="border-b border-soft-black">
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
    <a href="/recipe?r={recipe.id}">
        <List.Item class="border-b border-soft-black hover:bg-[#f3f3f3] font-medium hidden sm:grid py-1">

            <div class="row-span-2 sm:hidden flex justify-center items-center ">
                <Text class="mr-1 text-accent-1"/>
            </div>
            <List.Data class="w-full col-span-2 sm:col-auto">
                <Text class="mr-1 text-accent-1 hidden sm:inline-block"/>
                {recipe.name}
            </List.Data>
            <List.Data class="text-sm sm:text-base">
                {recipe.name}
            </List.Data>
            <List.Data class="text-sm sm:text-base">
                {recipe.name}
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
</List.Root>