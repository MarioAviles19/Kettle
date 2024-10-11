<script lang=ts>
   
    export let text : string = "";


    let list = ["flour", "eggs", "fish"]
    let autocompleteItem = "mow";

    function OnTextEntered(e : Event){
        console.log(text);
    }


</script>

<div class="autocompleteTextbox">
    <input class="acInput" on:keyup={OnTextEntered} type="text" bind:value={text}>
    <div class="shadowText"><p><span class="hiddenText">{text + " "}</span>{autocompleteItem}</p></div>
</div>

<style>
    p{
        margin:0;
    }
    .acInput{
        font-size: 1rem;
        padding:0;
    }
    .autocompleteTextbox{
        position:relative;
        width:fit-content;
    }
    .hiddenText{
        color: rgba(0, 0, 0, 80)


    }
    .shadowText{
        position:absolute;
        top:0;
        left:0;
        width:100%;
        height:100%;
        pointer-events: none;
        font-size: 1rem;
    }
</style>
