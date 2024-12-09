import { firestore } from ".";
import { collection, deleteDoc, doc, getDoc, getDocs, query, setDoc, where } from "firebase/firestore";
import { GetSingleUserFromEmail, GetUsersFromEmail } from "./users";
import type { Recipe } from "$lib/Zod";

export async function DeleteDocByID(path : string, id : string){
    const docToDelete = doc(firestore, path, id)
    const result = deleteDoc(docToDelete)
    return result
}

export async function ShareRecipeByEmail(recipeID : string, email : string, permision : string){
    //Get the user document
    const userDoc = await GetSingleUserFromEmail(email);
    if(userDoc.length == 0){
        return
    }
    const userID = userDoc[0].id
    //Setting the id this way enforces uniqueness
    const shareDoc = doc(firestore, "Shared", recipeID + ":" + userID);

    console.log(shareDoc)

    const result = setDoc(shareDoc, {recipeID : recipeID, sharedWith : userID, permision}, {merge : true})
    return result;
}
export async function GetUsersSharedWith(recipeID : string){

    const shareCol = collection(firestore, "Shared")

    const docQuery = query(shareCol, where("recipeID", "==", recipeID))

    const shareDocs = await getDocs(docQuery);

    const sharedData = shareDocs.docs.map((val)=>{return {id: val.id, ...val.data() as {sharedWith : string, permission : string}}})

    //Get the user documents for each user
    const foundUsers : {[key : string] : any} = {}

    const userPromises = sharedData.map((val)=>{
        return getDoc(doc(firestore, "Users", val.sharedWith))
    })
    const userDocs = (await Promise.all(userPromises)).map(val=>{
        return {...val.data(), id: val.id}
    })

    return {users : userDocs, shareDocs}


}

export async function GetRecipesSharedWith(userID : string){
    const shareCol = collection(firestore, "Shared")

    const docQuery = query(shareCol, where("sharedWith", "==", userID))

    const shareDocs = await getDocs(docQuery);

    const sharedData = shareDocs.docs.map((val)=>{return {id: val.id, ...val.data() as {recipeID : string, sharedWith : string, permission : string}}})

    //Get the recipe for each sharedDoc

    const recipePromises = sharedData.map((val)=>{
        return getDoc(doc(firestore, "TestRecipes", val.recipeID))
    })
    const recipeDocs = (await Promise.all(recipePromises)).map(val=>{
        return {...val.data() as Recipe, id: val.id}
    })

    return {recipe : recipeDocs, shareDocs}

}

export async function UpdateRecipe(id : string, data : Partial<Recipe>){

    const recipeDoc = doc(firestore, "TestRecipes", id);

    return await setDoc(recipeDoc, data, {merge : true});
}