import { RecipeCard } from "../templates/RecipeCard.js";
import { get } from "../api/api.js";
import { searchByTitle, filterBySelectedIngredients, filterBySelectedUstensils, filterBySelectedAppliances } from "./search.js";
import { totalRecipes } from "./totalRecipes.js";
import { getSelectedIngredients, getSelectedUstensils, getSelectedAppliances } from "./filter.js";
import { removeSearchIngredient } from "./filterIngredients.js";
import { removeSearchUstensil } from "./filterUstensils.js";
import { removeSearchAppliance } from "./filterAppliances.js";

// Sélectionne l'élément DOM
let inputSearch = document.getElementById('recipe');

export async function displayRecipes() {
    const recipes = await get("/data/recipes.js");
    renderRecipes(recipes);

    inputSearch.addEventListener('input', () => {
        let query = inputSearch.value;
        let filteredRecipes = searchByTitle(recipes, query);
        filteredRecipes = filterBySelectedIngredients(filteredRecipes, getSelectedIngredients());
        filteredRecipes = filterBySelectedUstensils(filteredRecipes, getSelectedUstensils());
        filteredRecipes = filterBySelectedAppliances(filteredRecipes, getSelectedAppliances())
        renderRecipes(filteredRecipes);
        totalRecipes(filteredRecipes.length);
    });
}

function renderRecipes(recipes) {
    let wrapperRecipes = document.querySelector('.wrapper__recipes');
    wrapperRecipes.innerHTML = "";

    recipes.forEach((recipe) => {
        let recipeCard = new RecipeCard(recipe);
        let cardElement = recipeCard.createTemplate();
        wrapperRecipes.appendChild(cardElement);
    });
}

// Remove search at the click, re initialiaze search to ""
async function removeSearch() {
    const recipes = await get("/data/recipes.js");
    let inputSearch = document.getElementById('recipe');
    let removeSearch = document.querySelector('.remove__result')

    removeSearch.addEventListener('click', ()=> {
        inputSearch.value = ""
        renderRecipes(recipes)
        totalRecipes(recipes.length)
    })
}

removeSearch()
removeSearchIngredient()
removeSearchUstensil()
removeSearchAppliance()