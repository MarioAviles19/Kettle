<script lang=ts>

    import { List } from "./UI/List";
    import { Text, Drumstick} from "lucide-svelte";
	import type { Recipe } from "$lib/Zod";
    import { authState, usersStore } from "$lib/stores";
	import { Skeleton } from "./UI/Skeleton";


    interface Props {
        data: Recipe[];
        mode?: "table" | "blocks";
    }

   
</script>


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

    {#each {length: 12} as _}
        
        <List.Item class="border-b border-soft-black hover:bg-[#f3f3f3] font-medium hidden sm:grid py-1">

            <div class="row-span-2 sm:hidden flex justify-center items-center ">
                <Skeleton.Text/>
            </div>
            <List.Data class="w-full col-span-2 sm:col-auto">
                <Skeleton.Text/>
            </List.Data>
            <List.Data class="text-sm sm:text-base">
                <Skeleton.Text/>
            </List.Data>
            <List.Data class="text-sm sm:text-base">
                <Skeleton.Text/>
            </List.Data>
        </List.Item>

        <List.Item class="border-b border-soft-black hover:bg-[#f3f3f3] font-medium grid sm:hidden">

            <div class="row-span-2 sm:hidden flex justify-center items-center">
                
            </div>
            <List.Data class="w-full col-span-2 sm:col-auto">
                <Skeleton.Text/>

            </List.Data>
            <List.Data class="text-sm sm:text-base">
                <Skeleton.Text/>

            </List.Data>
        </List.Item>

    {/each}
    
</List.Root>