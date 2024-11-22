<script lang=ts>
    import { handleKey } from ".";
    import { getContext } from "svelte";
    interface Props {
        children?: import('svelte').Snippet;
    }

    let { children }: Props = $props();
    
    const {HandleDragEnter} = getContext(handleKey) as any;




</script>

<div onpointerdown={HandleDragEnter}>
    {@render children?.()}
</div>