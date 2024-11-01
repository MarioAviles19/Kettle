<script lang=ts>
import { handleKey } from ".";
import { getContext } from "svelte";

const {RemoveParentItem} = getContext(handleKey) as any


console.log(getContext(handleKey))

</script>

<button {...$$restProps} type="button" on:click|preventDefault={RemoveParentItem}>
    <slot/>
</button>