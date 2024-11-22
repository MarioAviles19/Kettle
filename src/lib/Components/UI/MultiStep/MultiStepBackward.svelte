<script>
    import { getContext } from "svelte";
    import { key } from ".";
    /** @type {{children?: import('svelte').Snippet}} */
    let { children } = $props();

    const {AdvancePage, activePage} = getContext(key)

    function MoveForward(){
        AdvancePage(-1);
    }

</script>

<button class="{$activePage === 0? "invisible" : ""}" onclick={MoveForward}>
    {@render children?.()}
</button>