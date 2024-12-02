<script lang=ts>
    import { setContext } from "svelte";
    import { ctx } from ".";
	import { writable } from "svelte/store";
    let { children, open = $bindable(false) } = $props()

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
        console.log({open})
    }
</script>

<div class="relative w-min h-min overflow-visible" onpointerleave={Close}>{@render children()}</div>