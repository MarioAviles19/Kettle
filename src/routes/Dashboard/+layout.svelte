<script lang=ts>
    import { SquarePen, Folder, Users } from "lucide-svelte";
</script>

<div class="flex justify-start w-full gap-2">
    <div class="px-2 hidden sm:block">
        <a href="/New" class="bg-accent-1 px-3 py-2 rounded-xl text-white text-nowrap shadow-md">Create <SquarePen size={20} class="inline-block"/></a>
        <nav class="py-4">
            <ul>
                <li class="text-nowrap min-w-[10rem] my-1 px-2">
                    <button class="w-full hover:bg-[#cdcdcd] rounded-xl px-2 py-1 text-left">
                        <Folder size={20} class="inline"/> My Recipes
                    </button>
                </li>
                <li class="text-nowrap min-w-[10rem] my-1 px-2">
                    <button class="w-full hover:bg-[#cdcdcd] rounded-xl px-2 py-1 text-left">
                        <Users size={20} class="inline"/> Shared Recipes
                    </button>
                </li>
            </ul>
        </nav>
    </div>
    <div class="w-full bg-white rounded-md p-3 min-h-[70svh] mr-5">
        <slot/>
    </div>
</div>