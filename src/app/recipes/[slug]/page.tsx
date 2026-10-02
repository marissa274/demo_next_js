import db, { type Recipe } from "@/lib/db";
import { notFound } from "next/navigation";
import { delay } from "@/lib/utils";
import { cacheLife, cacheTag } from "next/cache";   
import { getRecipe } from "../action";



export default async function Recipe({ 
    params,  
    // searchParams
}: PageProps<"/recipes/[slug]">) {
    const { slug } = await params;
    const recipe = await getRecipe(slug);

    return (
        <div>
            <h1>Détails de la recette {recipe.nom}</h1>
            
        </div>
    )
}
