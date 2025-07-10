<script lang=ts>
    import { getContext, setContext } from "svelte";
    import { key, pageKey } from ".";
	import { slide, fly} from "svelte/transition";
	import { X } from "lucide-svelte";
   interface Props {
      children?: import('svelte').Snippet;
   }

   let { children }: Props = $props();

    
    const sym = Symbol();
    const {activePage, RegisterPage, transitionDirection} = getContext(key) as any

    const index = RegisterPage(sym)

   
    

</script>



    
        {#if $activePage == index}
            <div class="row-1 col-1 w-full h-full" in:fly={{x: 100 * $transitionDirection, delay : 200, duration : 200, }} out:fly={{x: -100 * $transitionDirection, duration : 200}}>
                {@render children?.()}
            </div>
        {/if}

