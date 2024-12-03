<script lang=ts>
    import { getContext } from "svelte";
    import { ctx } from ".";
    import {slide} from "svelte/transition"

    const { GetPopOver } = getContext(ctx) as any

    const { children, ...restProps} = $props()

    const pop = GetPopOver();

    let popEl : HTMLDivElement | undefined = $state();
  
    let isRight = $state(false);
    $effect(()=>{
        console.log(pop.isOpen)
        
        const halfWayPoint = window?.innerWidth / 2;
        isRight = ((popEl?.getBoundingClientRect()?.right || 0) > halfWayPoint);
    })


</script>

{#if pop.isOpen}
    <div in:slide out:slide bind:this={popEl}  class="absolute top-0  {restProps.class}" style={isRight? "right: 0" : "left: 0"}>
        {@render children()}
    </div>
{/if}

