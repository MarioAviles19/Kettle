import { onAuthStateChanged } from "firebase/auth";
import {fireAuth} from "$lib/Firebase"
import { writable, type Writable } from "svelte/store";
import type { User } from "firebase/auth";

export const draggedElement = writable<null|{name: string, text : string, orderNumber : number}>();

export const scrollYPos = writable(0);

export const authState : Writable<User|null> = writable(null);

onAuthStateChanged(fireAuth, (user)=>{

    authState.set(user)
    console.log(user);

})

