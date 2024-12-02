<script lang=ts>
    import { getContext } from "svelte";
    import { ctx } from ".";

    const { GetPopOver } = getContext(ctx) as any

    const popOver = GetPopOver();

    function Open(){
        popOver.Open();
    }

    const { children, ...restProps} = $props()
</script>


   <button onclick={Open} {...restProps}> {@render children()}</button>


