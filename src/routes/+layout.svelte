<script lang=ts>
    import PopUp from "$lib/Components/UI/PopUp/PopUp.svelte";
import "../app.css"
</script>

<header class="flex justify-between items-center">
    <h1>Kettle</h1>
    <nav>
        <ul class="flex gap-4">
            <li>
                <a href="/Dashboard">Dashboard</a>
            </li>
            <li>
                <a href="/Recipes">My Recipes</a>
            </li>
            <li>
                <a href="/Account">Account</a>
            </li>
        </ul>
    </nav>
</header>

<main class="p-1">
    <slot/>

    <PopUp/>
</main>

