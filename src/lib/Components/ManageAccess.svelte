<script lang=ts>
    import { Link, X } from "lucide-svelte";
    import { Modal } from "./UI/Modal";

    let link = "This is the link"

    let shouldShowClipboardText = $state(false)

    function CopyLink(){
        navigator.clipboard.writeText(link);
        shouldShowClipboardText = true;
        setTimeout(HideText, 2000);
    }
    function HideText(){
        shouldShowClipboardText = false
    }

</script>

<div class="bg-white p-4 shadow-xl rounded-md">
    <div class="flex justify-between mb-2">
        <h2 class="font-bold text-xl">Manage Access</h2>
        <Modal.Close class="hover:bg-light-emphasis px-1 rounded-full"><X size={18}/></Modal.Close>
    </div>

    <form class="flex items-stretch border-2 border-gray-400 shadow-md">
        <input type="text" placeholder="Add People" class="px-2 rounded-none border-none min-w-[16rem]">
        <select class="border-x-2 border-gray-400">
            <option value="View">Can View</option>
            <option value="View">Can Edit</option>
        </select>
        <button class="px-2 bg-accent-1 text-white">Share</button>
    </form>
    <div class="my-2">
        <h2 class="font-bold text-lg">People Shared With</h2>
    </div>
    <h2 class="text-lg font-bold">Access</h2>
    <div class="">
        <select class="hover:bg-light-emphasis hover:cursor-pointer">
            <option value="Restricted">Restricted</option>
            <option value="Anyone">Anyone With The Link</option>
        </select>
        <p class="text-sm">Only people with access can open with the link</p>
    </div>

    <div class="py-2 flex justify-start items-end">
        <button onclick={CopyLink} class="py-1 px-2 text-accent-1 shadow-2xl border-2 border-gray-300 rounded-3xl"><Link class="inline" size={20}/> Copy Link</button>
        {#if shouldShowClipboardText}
            <p class="text-sm">Copied!</p>
        {/if}
    </div>
</div>