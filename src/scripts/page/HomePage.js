import { Recipe } from "../models/Recipe.js";
import { RecipeCard } from "../templates/RecipeCard.js"

async function getRecipes() {

    let recipes = [];

    try {
        const response = await fetch("/data/recipes.js");
        let data = await response.json();
    
        data.forEach(recipe => {
            recipes.push(recipe)
        });

    } catch(error) {
        console.log('Error getting datas recipes', error)
    }
    console.log(recipes)
    return ({
        recipes: [...recipes]
    })
}

async function displayRecipes() {
    const { recipes } = await getRecipes()

    recipes.forEach((recipe) => {
        let recipeCard = new RecipeCard(recipe)
        recipeCard.createTemplate()
    })

}

getRecipes()
displayRecipes()