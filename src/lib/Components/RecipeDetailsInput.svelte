<script lang=ts>
    import { ResizeToFitInput } from "./Misc";
    import type { Writable } from "svelte/store";
	import { ImageUpload } from "./UI/ImageUpload";
    
    import {Camera} from "lucide-svelte"


    interface Props {
        image: Writable<Blob | null>;
        name: string;
        description: string;
        notes: string;
    }

    let {
        image = $bindable(),
        name = $bindable(),
        description = $bindable(),
        notes = $bindable()
    }: Props = $props();

    function ResizeToFit(e : Event){

        const target = e.target as HTMLElement | null

        if(target && target.scrollHeight > 0){
            

            target.style.height = "auto"
            target.style.height = target.scrollHeight + 'px';
        }
    }
    
</script>

<div class="composeStep p-1">
    <div class="my-2">   
        <h3 class="text-xl font-bold">Name</h3>
        <input  type="text" class="border-black border-2 rounded w-full p-1" bind:value={name}/>
    </div>
    
    <div class="my-2">
        <h3 class="text-xl font-bold">Image (Optional)</h3>
        <ImageUpload.Root bind:imageData={image}>
            <ImageUpload.Input class="block">
                <ImageUpload.Preview/>
                {#if !$image}
                    <div class=" min-h-[10rem] text-subtle-light flex items-center justify-center border-4 border-dashed border-subtle-light rounded-lg">
                        <Camera size={40}/>
                    </div>
                {/if}
            </ImageUpload.Input>
        </ImageUpload.Root>
    </div>


 

    <div class="my-2">   
        <h3 class="text-xl font-bold">description</h3>
        <textarea oninput={ResizeToFit} bind:value={description} use:ResizeToFitInput class="border-2 border-black rounded w-full min-h-[5rem] p-1"></textarea>
    </div>




    <h3 class="font-bold text-xl">Notes</h3>

    <textarea oninput={ResizeToFit} bind:value={notes} placeholder="Enter note..." class="border-2 border-black rounded w-full min-h-[5rem] p-1"></textarea>


</div>