import db, { type Recipe } from "@/lib/db";
import { notFound } from "next/navigation";

function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export default async function Recipe({ 
    params,  
    // searchParams
}: PageProps<"/recipes/[slug]">) {
    const { slug } = await params;

    await delay(1000); // Simulate a delay of 1 second
    const recipe = db.query("SELECT * FROM recipe WHERE id = ?").get(slug) as Recipe | undefined;
    if (!recipe) {
        notFound();
    }

    return (
        <div>
            <h1>Détails de la recette {recipe.nom}</h1>
        </div>
    )
}