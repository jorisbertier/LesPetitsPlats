import { RecipeCard } from "../templates/RecipeCard.js"
import { getRecipes } from "../api/api.js";
import { searchByTitle, removeSearch } from "../functions/search.js";

//Select DOM element
let inputSearch = document.getElementById('recipe')
let search = document.querySelector('.search')

removeSearch('recipe', '.remove__result')


//Display
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


// TEST INGREDIENTS
let inputSearchIngredients = document.querySelector('.search__input')
let searchButtonIngredients = document.querySelector('.search__button')
//get all ingrdedients
async function getAllIngredients() {

    const { recipes } = await getRecipes()
    let allIngredients = []

    recipes.forEach(ingredient => {
        ingredient.ingredients.forEach(ingredient => {
            allIngredients.push(ingredient.ingredient.trim().toLowerCase())
        })
    });

    allIngredients = [...new Set(allIngredients)]
    console.log(allIngredients)
    return allIngredients
}

function renderIngredients(ingredients) {
    let inputIngredients = document.querySelector('.results')

    inputIngredients.innerHTML = ""

    ingredients.forEach(ingredient => {
        let div = document.createElement('div')
        div.innerHTML = `${ingredient}`
        div.classList.add('bg-white', 'p-4', 'w-60', 'flex', 'justify-between', 'items-center')
        inputIngredients.appendChild(div);

    })
}
const ingredients = await getAllIngredients()

renderIngredients(ingredients)

async function displayIngredients() {

    const ingredients = await getAllIngredients()

    inputSearchIngredients.addEventListener('input', ()=> {
        let allIngredientsFilterByvalue = ingredients.filter(ingredient => ingredient.toLowerCase().includes(inputSearchIngredients.value.toLowerCase()))    
        console.log(allIngredientsFilterByvalue)
        renderIngredients(allIngredientsFilterByvalue)
    })

}

displayIngredients()

/**Fin zone de test */