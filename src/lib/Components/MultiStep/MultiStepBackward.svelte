<script>
    import { getContext } from "svelte";
    import { key } from ".";

    const {AdvancePage, activePage} = getContext(key)

    function MoveForward(){
        AdvancePage(-1);
    }

</script>

<button class="{$activePage === 0? "invisible" : ""}" on:click={MoveForward}>
    <slot/>
</button>