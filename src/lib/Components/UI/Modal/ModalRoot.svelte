<script lang=ts>
    import { fade } from "svelte/transition";
    import { setContext } from "svelte";
    import { ctx } from ".";

    let {open = $bindable(false), children, background = {}, ...restProps} = $props();

    setContext(ctx, {
        ToggleModal
    })

    function ToggleModal(){
        open = !open
    }

    function CloseModal(){
        open = false;
    }
    console.log(background)
</script>


{#if open}
    <div transition:fade class="bg-[#0000001b] fixed top-0 left-0 z-50 w-full h-full flex items-center justify-center {restProps.class}">
            {@render children()}

    </div>
{/if}