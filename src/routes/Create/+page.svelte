<script lang=ts>
    import RecipeInput from "$lib/Components/RecipeInput.svelte";

    let recipe : {
    image: any;
    name: string;
    description: string;
    notes: string;
    procedure: string[];
} | undefined

</script>

<RecipeInput bind:recipe/>


