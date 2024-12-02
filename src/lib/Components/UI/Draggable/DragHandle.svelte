<script lang=ts>
    import { handleKey } from ".";
    import { key } from ".";
    import { getContext, onMount } from "svelte";
    interface Props {
        children?: import('svelte').Snippet;
    }

    let { children }: Props = $props();

    onMount(()=>{
        console.log(getContext(handleKey))

    })
    const HandleDragEnter = getContext<any>(handleKey)?.HandleDragEnter




</script>

<div onpointerdown={HandleDragEnter}>
    {@render children?.()}
</div>