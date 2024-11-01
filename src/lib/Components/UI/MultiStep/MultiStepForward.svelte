<script>
    import { getContext } from "svelte";
    import { key } from ".";

    const {AdvancePage, activePage, GetPages} = getContext(key)

    function MoveForward(){
        AdvancePage(1);
    }
    const pages = GetPages()

</script>

<button class="{$activePage >= $pages?.length - 1? "invisible" : ""}" on:click={MoveForward}>
    <slot/>
</button>