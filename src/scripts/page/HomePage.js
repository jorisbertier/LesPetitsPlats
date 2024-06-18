import { RecipeCard } from "../templates/RecipeCard.js"
import { getRecipes } from "../api/api.js";

let inputSearch = document.getElementById('recipe')
let search = document.querySelector('.search')
let removeSearch = document.querySelector('.remove__result')

removeSearch.addEventListener('click', ()=> {
    inputSearch.value = ""
    console.log('delete')
})

function searchByTitle(recipes, query) {
    query = query.toLowerCase()
    // console.log(recipes.filter(recipe => recipe.description.toLowerCase().includes(query)))
    // return recipes.filter(recipe => recipe.description.toLowerCase().includes(query))
    // console.log(recipes.filter(recipe => recipe.name.toLowerCase().includes(query)))
    // return recipes.filter(recipe => recipe.name.toLowerCase().includes(query))
    console.log(recipes.filter(recipe => recipe.ingredients.some( ingredient =>
        ingredient.ingredient.toLowerCase().includes(query)
    )))
    return recipes.filter(recipe => recipe.ingredients.some( ingredient =>ingredient.ingredient.toLowerCase().includes(query)))


    
    // Displaying the filtered recipes

}  

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