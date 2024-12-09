<script lang=ts>
    import PopUp from "$lib/Components/UI/PopUp/PopUp.svelte";
    import "../app.css"

    import { page } from "$app/stores";
    import { authState } from "$lib/stores";
    import { goto } from "$app/navigation";
	import { onMount } from "svelte";
    

    onMount(()=>{
        page.subscribe(val=>{
        if(!val?.url){
            return
        }

        })
    })

    interface Props {
        children?: import('svelte').Snippet;
    }

    let { children }: Props = $props();
</script>

<header class="flex justify-between items-center p-2">
    <h1 class="font-bold text-xl text-accent-1">Kettle</h1>
    <nav class="print:hidden">
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

<main class="sm:p-2">
    {@render children?.()}

    <PopUp/>
</main>

