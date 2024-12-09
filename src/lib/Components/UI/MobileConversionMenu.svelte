<script lang=ts>
    import { Weight, X} from "lucide-svelte";
    import { Modal } from "./Modal";
    import { fly } from "svelte/transition";
    import { elasticOut } from "svelte/easing";


    let open = $state(true);

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
        <button in:fly={{x: "4rem", delay : 300}} onclick={OpenModal} class="fixed bottom-6 right-6 text-white bg-accent-1 flex justify-center items-center rounded-full h-[3rem] w-[3rem] font-semibold shadow">
            {#if conversion !== 1}
            {conversion}x
            {:else}
            <Weight/>
            {/if}
        </button>
    {/if}
    <Modal.Root bind:open class="bg-none" background.onclick={CloseModal}>
        <div class="fixed bottom-0 left-0 flex justify-between w-full p-2 bg-gradient-to-b from-transparent to-zinc-800">
            <button onclick={()=>{conversion = .25; open = false}} in:fly={{y : "5rem", delay: 0}} class="font-semibold border-2 shadow border-white text-white bg-accent-1 rounded-full h-[2.5rem] w-[2.5rem]">.25x</button>
            <button onclick={()=>{conversion = .5; open = false}} in:fly={{y : "5rem", delay: 100}}  class="font-semibold border-2 shadow border-white text-white bg-accent-1 rounded-full h-[2.5rem] w-[2.5rem]">.5x</button>
            <button onclick={()=>{conversion = 1; open = false}} in:fly={{y : "5rem", delay: 200}}   class="font-semibold border-2 shadow border-white text-white bg-accent-1 rounded-full h-[2.5rem] w-[2.5rem]">1x</button>
            <button onclick={()=>{conversion = 2; open = false}} in:fly={{y : "5rem", delay: 300}}   class="font-semibold border-2 shadow border-white text-white bg-accent-1 rounded-full h-[2.5rem] w-[2.5rem]">2x</button>
            <button onclick={()=>{conversion = 3; open = false}} in:fly={{y : "5rem", delay: 400}}   class="font-semibold border-2 shadow border-white text-white bg-accent-1 rounded-full h-[2.5rem] w-[2.5rem]">3x</button>
            <button in:fly={{y : "5rem", delay: 600}} onclick={CloseModal} class="font-semibold border-2 border-white text-white bg-accent-1 rounded-full h-[2.5rem] w-[2.5rem] flex justify-center items-center"><X/></button>
        </div>
    </Modal.Root>
</div>
