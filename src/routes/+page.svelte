<script lang=ts>
    import TokenizedInput from "$lib/Components/UI/Input/TokenizedInput.svelte";
    import { PopOver } from "$lib/Components/UI/PopOver";
    
</script>


<TokenizedInput/>

<div class="flex justify-between">
    <PopOver.Root>
        <PopOver.Open>
            meow
        </PopOver.Open>
        <PopOver.Content>
            hello I am content
        </PopOver.Content>
    </PopOver.Root>
    
    <PopOver.Root>
        <PopOver.Open>
            meow
        </PopOver.Open>
        <PopOver.Content>
            hello I am content
        </PopOver.Content>
    </PopOver.Root>
</div>

