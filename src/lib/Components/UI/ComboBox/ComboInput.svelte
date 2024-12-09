<script lang=ts>
    import { ctx } from ".";
    import { getContext } from "svelte";

    const { GetComboBox, RegisterInput } = getContext(ctx) as any
    const { oninput = ()=>{}, ...restProps } = $props()

    const comboBox = GetComboBox();
    let thisEl = $state();


    function OnInput(e : Event){
        if(e.target){
            const target = e.target as any;
            if(target.value == ""){
                comboBox.CloseList();
            } else{
                comboBox.OpenList();
                console.log("open")
            }
            oninput(e)
            
        }
    }
    function OnBlur(e : any){
        const relatedTarget = e.relatedTarget;
        if(relatedTarget?.dataset.combo){
            return
        } else{
            comboBox.listOpen = false;
        }

    }
    $effect.pre(()=>{
        console.log(thisEl)
        RegisterInput(thisEl)
    })

</script>

<input type="text" class="w-full {restProps.class}" bind:this={thisEl} onblur={OnBlur} oninput={OnInput} bind:value={comboBox.value} {...restProps}>