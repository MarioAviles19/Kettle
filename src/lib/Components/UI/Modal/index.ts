import ModalClose from "./ModalClose.svelte"
import ModalRoot from "./ModalRoot.svelte"
export const ctx = Symbol()

export const Modal = {
    Root : ModalRoot,
    Close : ModalClose
}