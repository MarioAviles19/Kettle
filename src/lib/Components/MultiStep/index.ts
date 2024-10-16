import MultiStepLabel from "./MultiStepLabel.svelte";
import MultiStepPage from "./MultiStepPage.svelte";
import MultiStepRoot from "./MultiStepRoot.svelte";
import MultiStepForward from "./MultiStepForward.svelte";
import MultiStepBackward from "./MultiStepBackward.svelte";
import MultiStepPageContainer from "./MutliStepPageContainer.svelte"

export const key = Symbol();
export const pageKey = Symbol();

export const MultiStep = {
    Label : MultiStepLabel,
    Page : MultiStepPage,
    Root : MultiStepRoot,
    Forward : MultiStepForward,
    Backward : MultiStepBackward,
    Pages : MultiStepPageContainer
}