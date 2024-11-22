<script lang=ts>
    export let conversionFactor = 1;
    export let token : {text : string, isQuantity? : boolean, isUnit? : boolean, isItem? : boolean, unit? : string}


</script>

{#if token.isQuantity}
<span class="text-accent-1">{token.text} {token.unit || ""}&nbsp</span>
{:else if token.isUnit}
<span class="text-accent-1">{token.text}&nbsp</span>
{:else if token.isItem}
<span class="text-red-700">{token.text}&nbsp</span>
{:else}
{token.text}&nbsp
{/if}