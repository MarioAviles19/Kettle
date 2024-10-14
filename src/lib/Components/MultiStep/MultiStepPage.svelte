<script lang=ts>
    import { getContext, setContext } from "svelte";
    import { key, pageKey } from ".";
	import { slide, fly} from "svelte/transition";
	import { X } from "lucide-svelte";

    
    const sym = Symbol();
    const {activePage, RegisterPage} = getContext(key) as any

    const index = RegisterPage(sym)


    

</script>

    {#if $activePage == index}
        <div in:fly={{x: 100, delay : 200}} out:fly={{x: -100, duration : 200}}>
            <slot/>
        </div>
    {/if}
