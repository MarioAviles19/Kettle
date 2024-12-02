<script lang=ts>
   import { addDoc, collection, serverTimestamp } from "firebase/firestore";
   import { authState } from "$lib/stores";
   import { firestore } from "$lib/Firebase";
   import { writable } from "svelte/store";
   import PopUp from "$lib/Components/UI/PopUp/PopUp.svelte";
   import RecipeInput from "$lib/Components/RecipeInput.svelte";
   import Form from "$lib/Components/Form.svelte";

    

 async function UploadRecipe(e : SubmitEvent){
   console.log("meow")
    e.preventDefault();
    const ref = collection(firestore, "TestRecipes/");
    const payload = {...recipe, ownerID : $authState?.uid}


    const res = await addDoc(ref, {...recipe, ownerID : $authState?.uid, modified : serverTimestamp(), created : serverTimestamp()});

    UploadSuccess()
    console.log(res)
 }

 function UploadSuccess(){
    console.log("success")
 }

 function UploadFailure(){

 }
      let image = $state(writable(null))
      let name = $state("")
      let description = $state("")
      let notes = $state("")
      let procedure = $state([
            "Preheat oven to 350 F degrees. Butter an 8x8 baking dish, or spray with non-stick cooking spray. Set Aside.",
            "In a separate mixing bowl, add topping ingredients (brown sugar, oats, flour, 1 tsp cinnamon, salt, and diced cold butter).",
            "Use pastry cutter to cut the butter into the oat mixture, using a slight downward twisting motion, until mixture resembles pea-sized crumbs. Alternatively, you can use forks or even your hands to cut butter into the mixture.",
            "Spread topping over apples in baking dish, and gently pat to even it out. Bake 40-50 minutes, until golden brown and bubbly"
        ])
      let ingredients = $state([
               "1 cup light brown sugar",
               "3/4 cup old fashioned oats",
               "3/4 cup all-purpose flour",
               "1 tsp ground cinnamon",
               "pinch of kosher salt",
               "1/3 cup cold unsalted butter"
            ])

      let recipe : {
         name: string;
         description: string;
         notes: string;
         procedure: string[];
         ingredients : string[];
      } | undefined = $derived({name, description, procedure, ingredients, notes})

</script>

<RecipeInput onsubmit={UploadRecipe} bind:name bind:description bind:notes bind:procedure bind:ingredients bind:image/>

