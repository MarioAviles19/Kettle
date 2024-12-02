import { onAuthStateChanged } from "firebase/auth";
import {fireAuth} from "$lib/Firebase"
import { writable, type Writable, get} from "svelte/store";
import type { User } from "firebase/auth";
import { browser } from "$app/environment";
import type { Recipe } from "./Zod";



export const draggedElement = writable<null|{name: string, text : string, orderNumber : number}>();

export const scrollYPos = writable(0);

export const authState : Writable<User|null> = writable(null);

onAuthStateChanged(fireAuth, (user)=>{

    authState.set(user)

})


const storage = <T>(key: string, initValue: T): Writable<T> => {
    const store = writable(initValue);
    if (!browser) return store;

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

    return store;
}

export const PersistantStorage = storage;


export const RecipeCache = PersistantStorage<{[key : string] : Recipe}>("recipeCache", {})

export const MousePosition = writable<{x : number, y : number}>({x : 0, y : 0})