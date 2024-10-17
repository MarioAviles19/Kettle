<script lang=ts>
    import { ResizeToFitInput } from "./Misc";
    import type { Writable } from "svelte/store";
	import { ImageUpload } from "./ImageUpload";
    
    import {Camera} from "lucide-svelte"


    let image : Writable<Blob | null>;
    let name : string;
    
</script>

<div class="composeStep p-1">

    <div class="my-2">
        <h3 class="text-xl font-bold">Image (Optional)</h3>
        <ImageUpload.Root bind:imageData={image}>
            <ImageUpload.Input>
                <ImageUpload.Preview/>
                {#if !$image}
                    <div class="w-full min-h-[10rem] text-subtle-light flex items-center justify-center border-4 border-dashed border-subtle-light rounded-lg">
                        <Camera size={40}/>
                    </div>
                {/if}
            </ImageUpload.Input>
        </ImageUpload.Root>
    </div>

    <div class="my-2">   
        <h3 class="text-xl font-bold">Name</h3>
        <input type="text" class="border-black border-2 rounded w-full p-1" bind:value={name}/>
    </div>
 

    <div class="my-2">   
        <h3 class="text-xl font-bold">description</h3>
        <textarea use:ResizeToFitInput class="border-2 border-black rounded w-full min-h-[5rem] p-1"></textarea>
    </div>




    <h3 class="font-bold text-xl">Notes</h3>

    <textarea  placeholder="Enter note..." class="border-2 border-black rounded w-full min-h-[5rem] p-1"></textarea>


</div>