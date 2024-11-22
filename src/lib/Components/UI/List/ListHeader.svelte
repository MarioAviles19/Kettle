<script>
    /** @type {{children?: import('svelte').Snippet, [key: string]: any}} */
    let { children, ...rest } = $props();
</script>




<div {...rest}>
    <div class="grid grid-cols-[repeat(auto-fit,minmax(50px,1fr))]">
        {@render children?.()}
    </div>
</div>