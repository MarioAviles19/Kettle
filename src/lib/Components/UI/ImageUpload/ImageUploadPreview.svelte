<script lang=ts>
import { getContext } from "svelte";
import { key } from ".";
    interface Props {
        children?: import('svelte').Snippet;
        [key: string]: any
    }

    let { children, ...rest }: Props = $props();

const {imageURL} = getContext(key) as any;


</script>

<div>
    {@render children?.()}
    {#if $imageURL}
        <img {...rest} src={$imageURL} alt="preview">
    {/if}
</div>