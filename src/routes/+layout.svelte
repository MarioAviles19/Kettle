<script lang=ts>
    import PopUp from "$lib/Components/UI/PopUp/PopUp.svelte";
import "../app.css"
</script>

<header>
    <h1>Kettle</h1>

</header>

<main class="p-1">
    <slot/>

    <PopUp/>
</main>

