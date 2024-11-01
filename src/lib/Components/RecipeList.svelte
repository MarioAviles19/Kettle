<script lang=ts>
	import type { Recipe } from "$lib/Zod";

    export let data : Recipe[];
    export let mode : "table" | "blocks" = "table";
</script>


{#if mode == "table"}
    <table class="w-full">
        <tr>
            <th>Name</th>
            <th>Modified</th>
        </tr>
        {#each data as recipe}
        <tr>
            <td>{recipe.name}</td>
            <td>10:03PM 10/3/2024</td>
        </tr>
        {/each}
    </table>

{/if}