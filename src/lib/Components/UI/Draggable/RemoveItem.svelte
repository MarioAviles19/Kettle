<script lang=ts>
    import { preventDefault } from 'svelte/legacy';

import { handleKey } from ".";
import { getContext } from "svelte";
    interface Props {
        children?: import('svelte').Snippet;
        [key: string]: any
    }

    let { children, ...rest }: Props = $props();

const {RemoveParentItem} = getContext(handleKey) as any


console.log(getContext(handleKey))

</script>

<button {...rest} type="button" onclick={preventDefault(RemoveParentItem)}>
    {@render children?.()}
</button>