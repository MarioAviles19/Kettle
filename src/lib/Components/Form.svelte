<script lang=ts>
	

  interface Props {
        onsubmit : any
  }

  let { onsubmit }: Props = $props();


</script>

<form onsubmit={onsubmit} class="w-full max-w-[40rem] m-auto mb-[10rem]">

        <div id="procedure" class="composeStep my-4  p-2 min-h-[9rem] mb-2 rounded-md shadow-md bg-white">


            <div>

                <button class="bg-accent-1 my-4 text-white text-xl rounded-md m-auto px-4 py-1 block font-bold">Save</button>
            </div>
            
        </div>

    </form>
