<script lang=ts>
    interface Props {
        isDefault?: boolean;
        children?: import('svelte').Snippet;
        [key: string]: any
    }

    let { isDefault = false, children, ...rest }: Props = $props();
</script>

<div {...rest}>
    {@render children?.()}
</div>
