import ImageUploadInput from "./ImageUploadInput.svelte";
import ImageUploadPreview from "./ImageUploadPreview.svelte";
import ImageUploadRoot from "./ImageUploadRoot.svelte";
export const key = Symbol();

export const ImageUpload = {
    Root : ImageUploadRoot,
    Input : ImageUploadInput,
    Preview : ImageUploadPreview
}