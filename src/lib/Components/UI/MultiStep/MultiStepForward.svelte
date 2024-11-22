<script>
    import { getContext } from "svelte";
    import { key } from ".";
    /** @type {{children?: import('svelte').Snippet}} */
    let { children } = $props();

    const {AdvancePage, activePage, GetPages} = getContext(key)

    function MoveForward(){
        AdvancePage(1);
    }
    const pages = GetPages()

</script>

<button class="{$activePage >= $pages?.length - 1? "invisible" : ""}" onclick={MoveForward}>
    {@render children?.()}
</button>