<script lang=ts>
    import { setContext } from "svelte";
	import { writable } from "svelte/store";
    import { key } from ".";

    interface Props {
        imageData?: any;
        children?: import('svelte').Snippet;
    }

    let { imageData = writable<Blob | null>(null), children }: Props = $props();
    let imageURL = writable<string | null>(null);

    setContext(key, {
        imageData,
        imageURL
    })
    

</script>

{@render children?.()}