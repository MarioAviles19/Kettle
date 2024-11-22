<script lang=ts>
    import { addDoc, collection, serverTimestamp } from "firebase/firestore";
    import { authState } from "$lib/stores";
    import { firestore } from "$lib/Firebase";
    import PopUp from "$lib/Components/UI/PopUp/PopUp.svelte";
    import RecipeInput from "$lib/Components/RecipeInput.svelte";

    let recipe : {
    image: any;
    name: string;
    description: string;
    notes: string;
    procedure: string[];
    ingredients : string[];
} | undefined = $state()

 async function UploadRecipe(e : SubmitEvent){
    e.preventDefault();
    const ref = collection(firestore, "TestRecipes/");
    const payload = {...recipe, ownerID : $authState?.uid}

    console.log(payload)
    const res = await addDoc(ref, {...recipe, ownerID : $authState?.uid, modified : serverTimestamp(), created : serverTimestamp()});

    UploadSuccess()
    console.log(res)
 }

 function UploadSuccess(){
    console.log("success")
 }

 function UploadFailure(){

 }


</script>

<RecipeInput on:submit={UploadRecipe} bind:recipe/>


