"use server";

import db, { Recipe } from "@/lib/db";
import { delay } from "@/lib/utils";
import { cacheLife, cacheTag } from "next/cache";
import { notFound, redirect } from "next/navigation";


export async function getRecipes() {

    
    return db.query("SELECT * FROM recipe").all() as Recipe[];
}


export async function getRecipe(slug: string) {
    "use cache";
    //stale (5 minutes)-> cache cote client dans la memoire vive du navigateur
    // revalidate (1 minutes) -> revalidation du cache cote serveur 
    // renvoie cache expire apres 1 minutes et refetch ls donnees  pour les prochain user
    //expire (60 minutes )-> personne sur la page pendant 60 min donc next affiche le loading.. au premier
    //user qui revient apres 60 minutes
    cacheLife("minutes");
    cacheTag(`recipe-${slug}`);

    //invalidation complete: updatetag(`recipe-${slug}`)
    // revalidation: revalidateTag(`recipe-${slug}`)

    await delay(1000); // Simulate a delay of 1 second

    console.log(`[getRecipe] running for slug: ${slug} at ${new Date().toISOString()}`);
    const recipe = db.query("SELECT * FROM recipe WHERE id = ?").get(slug) as Recipe | undefined;
    if (!recipe) {
        notFound();
    }
    return recipe;
}

export type createRecipeState = {
    errors?:{
        nom?: string;
    };
    nom?: string;
    
}

export async function createRecipe(
     _: createRecipeState,
   formData: FormData
) : Promise<createRecipeState> {
   const nom = formData.get("name");

   if (typeof nom !== "string" || nom.trim().length === 0) {
    return {errors: {nom: "Le nom est requis"}};
   }

  if (nom.trim().length > 100) {
    return {
        errors: { nom: "Le nom ne peut pas dépasser 100 caractères" },
        nom,
    };
  }

  const recipe = db.query("INSERT INTO recipe (nom) VALUES (?) RETURNING id").get(nom.trim()) as { id: number };
  redirect(`/recipes/${recipe.id}`);
}
