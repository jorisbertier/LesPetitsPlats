import { Recipe } from "../models/Recipe.js";
import { RecipeCard } from "../templates/RecipeCard.js"
import { getRecipes } from "../api/api.js";


async function displayRecipes() {
    const { recipes } = await getRecipes()

    recipes.forEach((recipe) => {
        let recipeCard = new RecipeCard(recipe)
        recipeCard.createTemplate()
    })

}

displayRecipes()