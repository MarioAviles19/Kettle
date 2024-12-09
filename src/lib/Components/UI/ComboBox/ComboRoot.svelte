<script lang=ts>
    import { ctx } from ".";
    import { setContext } from "svelte";

    
    let listOpen = $state(false)
    let value = $state("")
    let inputEl : HTMLInputElement | undefined = $state()

    setContext(ctx,{
        GetComboBox,
        RegisterInput
    })
    function RegisterInput(el : HTMLInputElement){
        inputEl = el;
    }

    function OpenList(){
        listOpen = true;
    }
    function CloseList(){
        listOpen = false;
    }
    function FocusInput(){
        if(inputEl){
            inputEl.focus()
        }
    }
    function GetComboBox(){
        return {
            get listOpen() {
                return listOpen;
            },
            set listOpen(val){
                listOpen = val;
            },
            get value(){
                return value
            },
            set value(val){
                value = val;
            },
            OpenList : OpenList,
            CloseList : CloseList,
            FocusInput
        };
    }

    const { children, ...restProps } = $props()

</script>

<div  class="relative {restProps.class}">{@render children()}</div>