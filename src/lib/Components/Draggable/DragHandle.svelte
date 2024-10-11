<script lang=ts>
    import { handleKey } from ".";
    import { getContext } from "svelte";
    
    const {HandleDragEnter} = getContext(handleKey) as any;




</script>

<div on:pointerdown={HandleDragEnter}>
    <slot/>
</div>