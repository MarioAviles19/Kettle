<script>
    import { getContext } from "svelte";
    import { key } from ".";

    const {AdvancePage} = getContext(key)

    function MoveForward(){
        AdvancePage(1);
    }

</script>

<button on:click={MoveForward}>
    <slot/>
</button>