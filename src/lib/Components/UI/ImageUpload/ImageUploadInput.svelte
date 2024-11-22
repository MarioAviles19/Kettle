<script lang=ts>
    import { key } from ".";
    import { getContext } from "svelte";

    const {imageURL, imageData} = getContext(key) as any;
    interface Props {
        inputElement?: any;
        children?: import('svelte').Snippet;
        [key: string]: any
    }

    let { inputElement = $bindable(null), children, ...rest }: Props = $props();

    let files : FileList = $state();

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


    <label {...rest} >
        {#if url}
            <img src={url} alt="meow">
        {/if}
        {@render children?.()}
        <input  bind:this={inputElement} bind:files={files} onchange={HandleChange} type="file" accept="image/*" class="invisible w-0">
    </label>
