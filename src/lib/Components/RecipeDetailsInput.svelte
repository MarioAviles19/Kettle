<script lang=ts>
    import type { Writable } from "svelte/store";
	import { ImageUpload } from "./ImageUpload";
    
    import {Camera} from "lucide-svelte"

    let image : Writable<Blob | null>;

    $: console.log(!image)
</script>

<div class="composeStep p-1">

    <h3 class="text-xl font-bold">Image (Optional)</h3>
    <ImageUpload.Root bind:imageData={image}>
        <ImageUpload.Input>
            <ImageUpload.Preview/>
            {#if !$image}
                <Camera/>
            {/if}
        </ImageUpload.Input>
    </ImageUpload.Root>



    <h3 class="font-bold text-xl">Notes</h3>

    <textarea  placeholder="Enter note..." class="border-2 border-black rounded w-full min-h-[7rem]"></textarea>


</div>