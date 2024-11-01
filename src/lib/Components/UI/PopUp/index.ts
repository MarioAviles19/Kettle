import { writable, type Writable } from "svelte/store";

export const PopUp : Writable<PopUpOpts | null> = writable(null)


interface PopUpOpts {
    name : string,
    content : string,

}