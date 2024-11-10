<script lang=ts>
    import { List } from "./UI/List";
    import { Text } from "lucide-svelte";
	import type { Recipe } from "$lib/Zod";
    export let data : Recipe[];
    export let mode : "table" | "blocks" = "table";
</script>


<List.Root>

    {#each data as recipe}
    <List.Item>
        <List.Data>
            
        </List.Data>
    </List.Item>

    {/each}
</List.Root>