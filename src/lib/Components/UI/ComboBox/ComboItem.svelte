<script lang=ts>
    import { ctx } from ".";
    import { getContext } from "svelte";

    const { GetComboBox } = getContext(ctx) as any
    const { children, value, ...restProps } = $props()

    const comboBox = GetComboBox();

    function SetComboBoxValue(){
        comboBox.value = value;
        comboBox.FocusInput()
        comboBox.listOpen = false;
    }
    function OnBlur(e : any){
        const relatedTarget = e.relatedTarget;
        if(relatedTarget?.dataset.combo){
            return
        } else{
            comboBox.listOpen = false;
        }

    }


    let val = $state("")

</script>

<button onclick={SetComboBoxValue} onblur={OnBlur} data-combo class="block w-full hover:bg-light-emphasis focus:bg-light-emphasis text-left {restProps.class}" {...restProps}>
    {@render children()}
</button>