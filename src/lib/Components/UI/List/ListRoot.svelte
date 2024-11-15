<script lang=ts>
    import { setContext } from "svelte";
    import { key } from ".";
    export let mode : "list" | "block" = "list";

    



</script>


<div {...$$restProps}>
    <slot/>
</div>