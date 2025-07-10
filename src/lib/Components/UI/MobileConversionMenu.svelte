<script lang=ts>
    import { Weight, X} from "lucide-svelte";
    import { Modal } from "./Modal";
    import { fly } from "svelte/transition";
    import { elasticOut } from "svelte/easing";


    let open = $state(false);

    let { conversion = $bindable(1), ...restProps} = $props()

    function CloseModal(){
        open = false;
    }
    function OpenModal(){
        open = true;
    }


</script>
<div {...restProps}>
    
    {#if !open}
        <button in:fly={{x: "4rem", delay : 300}} onclick={OpenModal} class="fixed bottom-6 right-6 text-white bg-accent-1 flex justify-center items-center rounded-full h-12 w-12 font-semibold shadow-sm">
            {#if conversion !== 1}
            {conversion}x
            {:else}
            <Weight/>
            {/if}
        </button>
    {/if}
    <Modal.Root bind:open class="bg-none h-min" background.onclick={CloseModal}>
        <div class="fixed bottom-0 left-0 flex justify-between w-full p-2 bg-linear-to-b from-transparent to-zinc-800">
            <button onclick={()=>{conversion = .25; open = false}} in:fly={{y : "5rem", delay: 0}} class="font-semibold shadow-sm text-white bg-accent-1 rounded-full h-10 w-10">.25x</button>
            <button onclick={()=>{conversion = .5; open = false}} in:fly={{y : "5rem", delay: 100}}  class="font-semibold shadow-sm text-white bg-accent-1 rounded-full h-10 w-10">.5x</button>
            <button onclick={()=>{conversion = 1; open = false}} in:fly={{y : "5rem", delay: 200}}   class="font-semibold shadow-sm text-white bg-accent-1 rounded-full h-10 w-10">1x</button>
            <button onclick={()=>{conversion = 2; open = false}} in:fly={{y : "5rem", delay: 300}}   class="font-semibold shadow-sm text-white bg-accent-1 rounded-full h-10 w-10">2x</button>
            <button onclick={()=>{conversion = 3; open = false}} in:fly={{y : "5rem", delay: 400}}   class="font-semibold shadow-sm text-white bg-accent-1 rounded-full h-10 w-10">3x</button>
            <button in:fly={{y : "5rem", delay: 600}} onclick={CloseModal} class="font-semibold text-white bg-accent-1 rounded-full h-10 w-10 flex justify-center items-center"><X/></button>
        </div>
    </Modal.Root>
</div>
