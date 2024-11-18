<script lang=ts>
    import IngredientTokenRenderer from "./IngredientTokenRenderer.svelte";
    import { Tokenizer } from "./Tokenize";

    const tokenizer = new Tokenizer();
    let fauxInput : HTMLDivElement;
    let realInput : HTMLInputElement;
    let inputText = "";

    const units = ['tbs', 'tsp', 'oz'];

    let tokens : any[] = [];



    function HandleInput(e : Event){
        const el = e.target as HTMLElement
        if(!el){
            return;
        }
        inputText = fauxInput.innerText;
        StyleText(inputText);

        const range = document.createRange();
        const selection = window.getSelection();
        range.setStart(el, el.childNodes.length);
        range.collapse(true);
        if(!selection){
            return;
        }
        selection.removeAllRanges();
        selection.addRange(range);
        
    }
    function StyleText(str : string){
        let words = str.split(" ");
        let outStrings : string[] = [];
        words.forEach(str=>{
            
            const word = str.trim().toLowerCase();
            let num = parseInt(word);
            console.log(word)

            if(num){
                str = `<span class="quantity">${str}</span>`
                console.log(word);
            } else if(units.some((val)=>{return val === word})){
                str = `<span class="unit">${str}</span>`
                console.log(str)
            }
            outStrings.push(str)

        })

        fauxInput.innerHTML = outStrings.join(" ");
        tokens = tokenizer.Parse(inputText);
    }

</script>

<div class="border-2 border-black" on:input={HandleInput} bind:this={fauxInput} {...$$restProps} contenteditable="true"></div>

<p>{inputText}</p>
<p>
    {#each tokens as tok}
        <IngredientTokenRenderer token={tok}/>
    {/each} 
</p>

<style>
    :global(.quantity){
        color: var(--color-accent-1)
    }
    :global(.unit){
        color: var(--color-accent-1)
    }
</style>