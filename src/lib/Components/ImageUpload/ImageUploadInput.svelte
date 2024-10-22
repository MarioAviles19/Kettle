<script lang=ts>
    import { key } from ".";
    import { getContext } from "svelte";

    const {imageURL, imageData} = getContext(key) as any;
    export let inputElement = null;

    let files : FileList;

    let url = "";

    function HandleChange(e : Event){
        if(files && files.length > 0){
           imageURL.set(URL.createObjectURL(files[0]))
           imageData.set(files[0])
        } else{
            imageData.set(null)
            imageURL.set(null)
        }
    }

</script>


    <label {...$$restProps} >
        {#if url}
            <img src={url} alt="meow">
        {/if}
        <slot/>
        <input  bind:this={inputElement} bind:files={files} on:change={HandleChange} type="file" accept="image/*" class="invisible w-0">
    </label>
