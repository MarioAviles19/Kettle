<script lang=ts>
    import { setContext } from "svelte";
    import { key } from ".";
    interface Props {
        mode?: "list" | "block";
        children?: import('svelte').Snippet;
        [key: string]: any
    }

    let { mode = "list", children, ...rest }: Props = $props();

    



</script>


<div {...rest}>
    {@render children?.()}
</div>