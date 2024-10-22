import { writable } from "svelte/store";

export const draggedElement = writable<null|{name: string, text : string, orderNumber : number}>();

export const scrollYPos = writable(0);