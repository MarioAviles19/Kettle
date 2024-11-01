<script lang=ts>
import { getContext } from "svelte";
import { key } from ".";

const {imageURL} = getContext(key) as any;


</script>

<div>
    <slot/>
    {#if $imageURL}
        <img {...$$restProps} src={$imageURL} alt="preview">
    {/if}
</div>