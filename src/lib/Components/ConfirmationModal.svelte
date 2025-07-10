<script lang=ts>
    import { Modal } from "./UI/Modal";

  

    interface Props{
        open : boolean,
        data : {
            text? : string,
            onConfirm : ()=>void,
            onCancel : ()=>void,
            
        },
        testFunc? : ()=>void
    }
    let { open = $bindable(false), data } : Props = $props()
</script>

<Modal.Root open={open}>
    <div class="rounded-sm bg-white p-3 min-w-52 shadow-border">
        <h2 class="font-bold text-lg">Confirm</h2>

            <p class="font-semibold mb-2">{data.text || "Are you sure?"}</p>

        <div class="flex justify-between">
            <button class="px-2 py-1 font-semibold rounded-md shadow-md bg-soft-black text-white" onclick={()=>{data.onConfirm(); open = false}} type="button">Confirm</button>
            <button class="px-2 py-1 font-semibold rounded-md shadow-md outline-2 outline-soft-black outline-solid" onclick={()=>{data.onCancel(); open = false}} type="button">Cancel</button>
        </div>
    </div>
</Modal.Root>