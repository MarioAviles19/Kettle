<script lang=ts>
    import { SquarePen, Folder, Users } from "lucide-svelte";
    interface Props {
        children?: import('svelte').Snippet;
    }

    let { children }: Props = $props();
</script>

<div class="flex justify-start w-full gap-2">
    <div class="px-2 hidden sm:block">
        <a href="/Create" class="bg-accent-1 px-3 py-2 rounded-xl text-white text-nowrap shadow-md">Create <SquarePen size={20} class="inline-block"/></a>
        <nav class="py-4">
            <ul>
                <li class="text-nowrap min-w-40 my-1 px-2">
                    <a href="/Dashboard" class="w-full hover:bg-[#cdcdcd] rounded-xl px-2 py-1 text-left">
                        <Folder size={20} class="inline"/> My Recipes
                    </a>
                </li>
                <li class="text-nowrap min-w-40 my-1 px-2">
                    <a href="/Dashboard/Shared" class="w-full hover:bg-[#cdcdcd] rounded-xl px-2 py-1 text-left">
                        <Users size={20} class="inline"/> Shared Recipes
                    </a>
                </li>
            </ul>
        </nav>
    </div>
    <div class="w-full bg-white rounded-md shadow-lg p-3 min-h-[70svh] mr-5">
        {@render children?.()}
    </div>
</div>