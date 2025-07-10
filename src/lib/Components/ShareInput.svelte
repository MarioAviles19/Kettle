<script lang=ts>
    import { ComboBox } from "./UI/ComboBox";
    import { GetUsersFromEmail } from "$lib/Firebase/users";

    const usersList = $state([])

    function UpdateSelections(e : Event){
        if(!e.target){
           return
        }
        
    }


</script>

<ComboBox.Root>
    <ComboBox.Input  placeholder="Share" class="rounded-none border w-full p-1"/>
    <ComboBox.List class="max-h-24 border-x border-b border-subtle-light w-full">
        <ComboBox.Item value="Meow" class="w-full border-t border-subtle-light p-1 text-left block">
            <p class="m-0">Meow</p>
        </ComboBox.Item>
    </ComboBox.List>
</ComboBox.Root>