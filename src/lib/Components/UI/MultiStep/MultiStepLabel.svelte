<script lang=ts>
    import { getContext } from "svelte";
    import { key } from ".";

    interface Props {
        pageNum: number;
        children?: import('svelte').Snippet;
    }

    let { pageNum, children }: Props = $props();
    const {SetPage} = getContext(key) as any

    

</script>

<button type="button" onclick={()=>{SetPage(pageNum)}}>
    {@render children?.()}
</button>