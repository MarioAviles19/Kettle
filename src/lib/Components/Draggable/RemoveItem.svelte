<script lang=ts>
import { handleKey } from ".";
import { getContext } from "svelte";

const {RemoveParentItem} = getContext(handleKey) as any


</script>

<button type="button" on:click={RemoveParentItem}>
    <slot/>
</button>