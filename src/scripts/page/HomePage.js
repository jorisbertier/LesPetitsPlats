import { RecipeCard } from "../templates/RecipeCard.js"
import { getRecipes } from "../api/api.js";
import { searchByTitle, removeSearch } from "../functions/search.js";

//Select DOM element
let inputSearch = document.getElementById('recipe')
let search = document.querySelector('.search')


//get all ingrdedients
async function getAllIngredients() {

    const { recipes } = await getRecipes()
    let allIngredients = []

    recipes.forEach(ingredient => {
        ingredient.ingredients.forEach(ingredient => {
            allIngredients.push(ingredient.ingredient)
        })
    });

    allIngredients = [...new Set(allIngredients)]
    return allIngredients
}

async function renderIngredients() {
    const ingredients = await getAllIngredients()
    let inputIngredients = document.querySelector('.ingredients')

    ingredients.forEach(ingredient => {
        console.log(ingredient)
        let div = document.createElement('div')
        div.innerHTML = `${ingredient}`
        div.classList.add('bg-white', 'p-4', 'w-40', 'flex', 'justify-between', 'items-center')
        inputIngredients.insertAdjacentElement('afterend', div);
        inputIngredients = div;
    })
}
renderIngredients()

removeSearch('recipe', '.remove__result')

async function displayRecipes() {
    const { recipes } = await getRecipes()
    renderRecipes(recipes);

    search.addEventListener('click', ()=> {
        let query = inputSearch.value;
        const filteredRecipes = searchByTitle(recipes, query)
        renderRecipes(filteredRecipes)
    })

}

function renderRecipes(recipes) {
    let wrapperRecipes = document.querySelector('.wrapper__recipes')

    wrapperRecipes.innerHTML = ""

    recipes.forEach((recipe) => {
        let recipeCard = new RecipeCard(recipe)
        let cardElement = recipeCard.createTemplate()
        wrapperRecipes.appendChild(cardElement)
    })

}

displayRecipes()