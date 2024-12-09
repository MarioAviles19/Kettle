<script lang=ts>
    import { onMount } from "svelte";
    const {children, ...rest} = $props();

    let stickyEl = $state<HTMLElement>()
    let shouldStick = $state(false)

    
    onMount(()=>{
        const observer  = new IntersectionObserver((el)=>{
            if(!el[0].isIntersecting){
                if(el[0].boundingClientRect.top <= 0){
                    shouldStick = true;
                }
            } else{
                shouldStick = false
            }
    }, {threshold : 1})
        if(stickyEl){
            observer.observe(stickyEl)
        }
    })

</script>

<div bind:this={stickyEl}>
    <div style="{shouldStick? "visibility: hidden": ""}">
        {@render children()}
    </div>
</div>

{#if shouldStick}
    <div class="stick">
        <div {...rest}>{@render children()}</div>
    </div>
{/if}

<style>
    .stick{
        position: fixed;
        top:0;
        left:0;
        width: 100%;
        z-index: 50;
        
    }
</style>