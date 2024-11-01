<script lang=ts>

    const mockRecipe = {
        name: "Apple Crisp",
            bites : [{
                name : "Spiced Apples",
                ingredients : [
                    "Six golen delicious apples",
                    "2 Tbsp granulated sugar",
                    "1 1/2 tsp lemon juice",
                ],
                steps : [
                    
                ]
            },
            {
                name : "Crisp Topping",
                ingredients : [
                    "1 cup light brown sugar",
                    "3/4 cup old fashioned oats",
                    "3/4 cup all-purpose flour",
                    "1 sp ground cinnamon",
                    "pinch of kosher salt",
                    "1/2 cup cold unsalted butter"
                ],
                steps : [

                ]
            }
        ],
        steps : [
            "Preheat oven to 350 F degrees. Butter an 8x8 baking dish, or spray with non-stick cooking spray. Set Aside.",
            "In a separate mixing bowl, add topping ingredients (brown sugar, oats, flour, 1 tsp cinnamon, salt, and diced cold butter).",
            "Use pastry cutter to cut the butter into the oat mixture, using a slight downward twisting motion, until mixture resembles pea-sized crumbs. Alternatively, you can use forks or even your hands to cut butter into the mixture.",
            "Spread topping over apples in baking dish, and gently pat to even it out. Bake 40-50 minutes, until golden brown and bubbly"
        ],
        notes : "I hope you enjoy!"
    }

</script>
<div class="max-w-[50rem] m-auto">
    
    <h2 class="text-xl font-bold mb-7">{mockRecipe.name}</h2>
    
    <h3  class="text-xl font-bold">Ingredients</h3>
    
    {#each mockRecipe.bites as bite}
        <div class="my-3">
            <h4 class="font-semibold">{bite.name}</h4>
            <ul class="px-5 list-disc my-1">
                {#each bite.ingredients as ingredient}
                    <li>{ingredient}</li>
                {/each}
            </ul>
        </div>
    {/each}
    
    <h3 class="text-xl font-bold">Instructions</h3>
    
    {#each mockRecipe.bites as bite}
        {#if bite.steps && bite.steps?.length > 0}
            <div class="my-3">
                <h4 class="font-semibold">{bite.name}</h4>
                <ul class="px-5 list-disc my-1">
                    {#each bite.ingredients as ingredient}
                        <li>{ingredient}</li>
                    {/each}
                </ul>
            </div>
        {/if}
    {/each}
    
    {#each mockRecipe.steps as step, i}
        <ol class="px-5 my-1">
    
                <li class="my-3">
                    <span class="rounded-full inline-flex justify-center items-center h-[2rem] w-[2rem] text-accent-1  border-accent-1 border-2 text-2xl mr-2">
                        <span class="block">{i + 1}</span>
                    </span>{step}
                </li>
    
        </ol>
    {/each}
    
    {#if mockRecipe.notes}
    
        <h3 class="text-xl font-bold">Notes</h3>
        <p>{mockRecipe.notes}</p>
    {/if}
</div>