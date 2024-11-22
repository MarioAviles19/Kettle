<script lang=ts>
    interface Props {
        children?: import('svelte').Snippet;
    }

    let { children }: Props = $props();
    
    let currentPath : string[] = []
    let mode : "list" | "block"
</script>

{@render children?.()}