import { onAuthStateChanged } from "firebase/auth";
import {fireAuth} from "$lib/Firebase"
import { writable, type Writable, get} from "svelte/store";
import type { User } from "firebase/auth";
import { browser } from "$app/environment";
import type { Recipe, UserDoc } from "./Zod";
import { firestore } from "$lib/Firebase";
import { getDoc, doc, setDoc } from "firebase/firestore";



export const draggedElement = writable<null|{name: string, text : string, orderNumber : number}>();

export const scrollYPos = writable(0);

export const authState : Writable<User|null> = writable(null);

onAuthStateChanged(fireAuth, (user)=>{

    if(user){
        AddUserDocIfNoneExists(user.uid, user.displayName, user.email, user.photoURL)
    }
    console.log(user)
    authState.set(user)

    
})

async function AddUserDocIfNoneExists(userID : string, displayName : string | null, email : string | null, photoURL : string | null){
    const docRef = doc(firestore, "Users", userID)
    const docSnap = await getDoc(docRef)

    if(docSnap.exists()){
    } else{
        //Create the document if none exists
        const result = await setDoc(docRef, {
            displayName,
            email,
            photoURL
        })
    }
}
export const usersStore = writable<{[key : string] : UserDoc}>({})


const storage = <T>(key: string, initValue: T): Writable<T> & {Invalidate : ()=>void} => {
    const store = writable(initValue);
    const Invalidate = ()=>{
        if(!browser) return;
        localStorage.removeItem(key)
    }
    if (!browser) return {...store, Invalidate};

    const storedValueStr = localStorage.getItem(key);
    if (storedValueStr != null) store.set(JSON.parse(storedValueStr));

    store.subscribe((val) => {

        if ([null, undefined].includes(val as any)) {
            localStorage.removeItem(key)
        } else {
            localStorage.setItem(key, JSON.stringify(val))
           
        }
   
    })

    window.addEventListener('storage', () => {
        const storedValueStr = localStorage.getItem(key);
        if (storedValueStr == null) return;

        const localValue: T = JSON.parse(storedValueStr)
        if (localValue !== get(store)) store.set(localValue);
    });



    return {...store, Invalidate};
}

export const PersistantStorage = storage;


export const RecipeCache = PersistantStorage<{[key : string] : Recipe}>("recipeCache", {})

export const MousePosition = writable<{x : number, y : number}>({x : 0, y : 0})