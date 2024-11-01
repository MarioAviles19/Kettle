<script lang=ts>
    import { getContext } from "svelte";
    import { key } from ".";

    export let pageNum : number;
    const {SetPage} = getContext(key) as any

    

</script>

<button type="button" on:click={()=>{SetPage(pageNum)}}>
    <slot/>
</button>