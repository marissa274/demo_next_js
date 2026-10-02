import db, { Recipe } from "@/lib/db";
import Link from "next/link";

export default function Recipes() {
    const recipes = db.query("SELECT * FROM recipe").all() as Recipe[];

    return (
        <div>
            <h1>Liste des recettes :</h1>
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