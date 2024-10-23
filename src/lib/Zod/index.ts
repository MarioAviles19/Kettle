import {z} from "zod";


export const RecipeSchema = z.object({
    ownerID : z.string(),
    name : z.string().min(1),
    description : z.string().optional(),
    notes : z.string().optional(),
    ingredients : z.string().array().nonempty(),
    steps : z.string().array().nonempty(),

})

