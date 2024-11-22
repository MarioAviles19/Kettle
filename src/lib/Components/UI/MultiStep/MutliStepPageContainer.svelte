<script>
    /** @type {{children?: import('svelte').Snippet}} */
    let { children } = $props();

</script>

<div class="grid place-items-center w-full h-full">
    {@render children?.()}
</div>