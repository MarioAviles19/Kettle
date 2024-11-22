<script lang=ts>
    import IngredientTokenRenderer from "./IngredientTokenRenderer.svelte";
    import { Tokenizer } from "./Tokenize";

    const tokenizer = new Tokenizer();
    let fauxInput : HTMLDivElement;
    let realInput : HTMLInputElement;
    let inputText = "";

    const units = ['tbs', 'tsp', 'oz'];

    export let tokens : any[] = [];



    function HandleInput(e : Event){

        inputText = fauxInput.innerText;
        tokens = tokenizer.Parse(inputText);  
    }
    function SyntaxHighlighting(e : Event){
        const currentSelection = window.getSelection();
        if(!currentSelection){
            return;
        }
        const currentRange = currentSelection.getRangeAt(0);
        const cursorPosition = currentRange.startOffset;
        
        const el = e.target as HTMLElement
        if(!el){
            return;
        }
        StyleText(inputText);
        console.log({cursorPosition, len : el.childNodes.length})
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