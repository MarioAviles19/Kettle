<script lang=ts>
    import { getContext } from "svelte";
    import { ctx } from ".";
    
    const {ToggleModal} = getContext(ctx) as any;
    const {children, ...restProps} = $props();
</script>

<button onclick={ToggleModal} {...restProps}>{@render children()}</button>