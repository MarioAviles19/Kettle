import { getDocs, collection, where, limit, query, orderBy, getDoc} from "firebase/firestore";
import { usersStore } from "$lib/stores";
import { firestore } from ".";


export async function GetUsersFromEmail(email : string, docLimit : number = 6){

    const usersCol = collection(firestore, "Users")
    const userQuery = query(usersCol, where("email", ">=", email), orderBy('email'), limit(docLimit))

    const docsSnapshot = await getDocs(userQuery)

    return docsSnapshot.docs.map((doc)=>{return {id: doc.id, ...doc.data()}})
}
export async function GetSingleUserFromEmail(email : string){

    const usersCol = collection(firestore, "Users")
    const userQuery = query(usersCol, where("email", "==", email))

    const docsSnapshot = await getDocs(userQuery)

    return docsSnapshot.docs.map((doc)=>{return {id: doc.id, ...doc.data()}})
}
