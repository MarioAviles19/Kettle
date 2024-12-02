import Content from "./Content.svelte"
import Root from "./Root.svelte"
import Open from "./Open.svelte"
export const ctx = Symbol()

export const PopOver = {
    Root,
    Content,
    Open
}