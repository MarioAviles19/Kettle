<script lang=ts>
    import { addDoc } from "firebase/firestore";
    import { firestore } from "$lib/Firebase";
    import RecipeInput from "$lib/Components/RecipeInput.svelte";

    let recipe : {
    image: any;
    name: string;
    description: string;
    notes: string;
    procedure: string[];
    ingredients : string[];
} | undefined

 function UploadRecipe(e : SubmitEvent){
    e.preventDefault();

    
 }

 function UploadSuccess(){

 }

 function UploadFailure(){
    
 }


</script>

<RecipeInput on:submit={UploadRecipe} bind:recipe/>


