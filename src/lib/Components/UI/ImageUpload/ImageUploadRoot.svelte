<script lang=ts>
    import { setContext } from "svelte";
	import { writable } from "svelte/store";
    import { key } from ".";

    export let imageData = writable<Blob | null>(null);
    let imageURL = writable<string | null>(null);

    setContext(key, {
        imageData,
        imageURL
    })
    

</script>

<slot/>