import { firestore } from ".";
import { deleteDoc, doc } from "firebase/firestore";

export async function DeleteDocByID(path : string, id : string){
    const docToDelete = doc(firestore, path, id)
    const result = deleteDoc(docToDelete)
    return result
}