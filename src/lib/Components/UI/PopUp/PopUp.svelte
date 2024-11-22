<script>
    import { PopUp } from ".";
    import { fade } from "svelte/transition";

    let open = $state(false);

    let name = $state("Alert");
    let content = $state("Please Do bingus wingus");

    PopUp.subscribe((e)=>{
        if(e){
            name = e.name
            content = e.content
            open = true
        }
    })

</script>

{#if open}
    <div transition:fade class="fixed top-0 left-0 w-full h-full flex justify-center items-center z-10 bg-[#0000002d]">
        <div class="max-w-[30rem] min-w-[14rem] rounded-md bg-background-1 p-4 border-2 border-accent-1 mb-10">
            <h2 class="font-bold mb-2">{name}</h2>
            <p class="font-semibold my-1">{content}</p>
            <div class="flex justify-end">
                <button onclick={()=>{open = false}} class="px-2 py-1 font-bold bg-accent-1 text-white rounded-md" type="button">close</button>
            </div>
        </div>
    </div>
{/if}