import { RecipeCard } from "../templates/RecipeCard.js"
import { getRecipes } from "../api/api.js";

//Select DOM element
let inputSearch = document.getElementById('recipe')
let search = document.querySelector('.search')
let removeSearch = document.querySelector('.remove__result')
let messageSearchError = document.querySelector('.search_error')

removeSearch.addEventListener('click', ()=> {
    inputSearch.value = ""
    console.log('delete')
})

function searchByTitle(recipes, query) {
    // Convert query to lower case
    query = query.toLowerCase()

    //Filter by Name || Description || Ingredient
    if(query.length >= 3) {
        let filteredByIngredient = recipes.filter(recipe => recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(query)));
        let filteredByDescription = recipes.filter(recipe => recipe.description.toLowerCase().includes(query));
        let filteredByName = recipes.filter(recipe => recipe.name.toLowerCase().includes(query));
        let allRecipes = [
            ...filteredByIngredient,
            ...filteredByDescription,
            ...filteredByName
        ];
        messageSearchError.innerHTML = ""
        //Delete duplicate
        allRecipes = [... new Set(allRecipes)]
        return allRecipes
    } else {
        messageSearchError.innerHTML = "Vous devez entrer au minimum 3 caractères pour faire la recherche"
        let allRecipes = []
        return allRecipes
    }


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