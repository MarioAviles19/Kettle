<script lang=ts>
    import { ctx } from ".";
    import { getContext } from "svelte";
    import { scale, slide } from "svelte/transition";

    const { GetComboBox } = getContext(ctx) as any
    const { children, ...restProps } = $props()

    let val = $state("")

    const combo = GetComboBox();

    let listEl : HTMLDivElement | undefined = $state()

    let shouldBeTop = $state(false);
    $effect(()=>{
        
        const halfWayPoint = window?.innerHeight / 2;
        shouldBeTop = ((listEl?.getBoundingClientRect()?.top || 0) > halfWayPoint);
    })


</script>

{#if combo.listOpen}
    <div transition:slide bind:this={listEl} class="absolute left-0 {restProps.class}" style={shouldBeTop? "bottom: 100%;": "top:100%"}>{@render children()}</div>
{/if}