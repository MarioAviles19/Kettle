import {z} from "zod";


export const RecipeSchema = z.object({
    ownerID : z.string(),
    name : z.string().min(1),
    description : z.string().optional(),
    notes : z.string().optional(),
    ingredients : z.string().array().nonempty(),
    procedure : z.string().array().nonempty(),
    cookTimeMinutes : z.number().optional(),
    numberServings : z.number().optional(),
    linkPublic : z.boolean()

})

export type Recipe = z.infer<typeof RecipeSchema> & {modified : {seconds : number}, id : string, ownerDoc? : UserDoc};

export type UserDoc = {displayName : string, email : string, photoURL? : string | null}
