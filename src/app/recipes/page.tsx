import db, { Recipe } from "@/lib/db";
import { get } from "http";
import Link from "next/link";
import { getRecipes } from "./action";


export default async function Recipes() {
    const recipes = await getRecipes();

    return (
        <div>
            <h1>Liste des recettes :</h1>
            <Link href="/recipes/new">creer une recette</Link>
            <ul className="list-disc list-inside">
                {recipes.map((recipe) => (
                    <li key={recipe.id}>
                        <Link href={`/recipes/${recipe.id}`} className="hover:underline">
                            {recipe.nom}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}