<script lang=ts>
    import { Tokenizer } from "../UI/Input/Tokenize";
    import { FractionToDecimal, DecimalToFraction } from "$lib";
    interface Props {
        text : string,
        conversion : number
    } 

    let { text, conversion = 1 } = $props()

    const tokenizer = new Tokenizer()

    const tokens = tokenizer.Parse(text)

</script>

{#each tokens as token}

    {#if token.isItem}

        {token.text + " "}

    {:else if token.isQuantity}
        <span class="text-accent-1">{DecimalToFraction(FractionToDecimal(token.text) * conversion, 10000)} {(token.unit ?? "") + " "} </span>
    {/if}

{/each}