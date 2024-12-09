<script lang=ts>
    import { setContext } from "svelte";
    import { ctx } from ".";
	import { writable } from "svelte/store";
    let { children, open = $bindable(false), ...restProps} = $props()

    setContext(ctx, {
        GetPopOver
    })
    function GetPopOver(){
        return {
            get isOpen() {
                return open;
            },
            Open,
            Close
        };
    }

    function Close(){
        open = false
    }
    function Open(){
        open = true
    }
</script>

<div role="menu" tabindex="0" class="relative w-min h-min overflow-visible {restProps.class}" onmouseleave={Close}>{@render children()}</div>