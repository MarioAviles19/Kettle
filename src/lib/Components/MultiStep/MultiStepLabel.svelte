<script lang=ts>
    import { getContext } from "svelte";
    import { pageKey } from ".";

    const {SetSelfActive} = getContext(pageKey) as any



</script>

<button type="button" on:click={SetSelfActive}>
    <slot/>
</button>