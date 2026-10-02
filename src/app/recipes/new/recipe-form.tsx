"use client";
import { useActionState } from "react";
import { createRecipe } from "../action";

export default function RecipeForm(){
    const [state, formAction, pending] =  useActionState(createRecipe, {});

    return (
        <form action={formAction} className="flex flex-col gap-4 max-w-md">
            <div className="flex flex-col gap-1">
                <label htmlFor="name">Nom de la recette</label>
                <input type="text" 
                id="name" 
                name="name" 
                defaultValue={state.nom}
                required 
                maxLength={100} 
                aria-invalid = {state.errors?.nom ? "true" : undefined}
                aria-describedby="name-error"
                className="border border-gray-400 rounded px-2 py-1"/>
                <p id="name-error" className="text-red 600 text-sm">{state.errors?.nom}</p>
            </div>

            <button type="submit" disabled={pending} className="bg-gray-800 text-white rounded px-4 py-2">
                 {pending ? "Création en cours..." : "Créer la recette"}
            </button>
        </form>
    );
}
