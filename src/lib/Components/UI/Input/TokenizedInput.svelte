<script lang=ts>
    import IngredientTokenRenderer from "./IngredientTokenRenderer.svelte";
    import { Tokenizer } from "./Tokenize";

    const tokenizer = new Tokenizer();
    let fauxInput : HTMLDivElement | undefined = $state();
    let realInput : HTMLInputElement;
    let inputText = $state("");

    const units = ['tbs', 'tsp', 'oz'];

    interface Props {
        tokens?: any[];
        [key: string]: any
    }

    let { tokens = $bindable([]), ...rest }: Props = $props();



    function HandleInput(e : Event){
        if(!fauxInput){
            return
        }

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

            if(num){
                str = `<span class="quantity">${str}</span>`
            } else if(units.some((val)=>{return val === word})){
                str = `<span class="unit">${str}</span>`
            }
            outStrings.push(str)

        })

        if(fauxInput){
            fauxInput.innerHTML = outStrings.join(" ");
        }
    }

</script>

<div class="border-2 border-black" oninput={HandleInput} bind:this={fauxInput} {...rest} contenteditable="true"></div>

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