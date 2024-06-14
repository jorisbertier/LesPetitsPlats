import { RecipeCard } from "../templates/RecipeCard.js"
import { getRecipes } from "../api/api.js";

let inputSearch = document.getElementById('recipe')
let search = document.querySelector('.search')

// function searchByTitle(recipes, query) {
//     query = query.toLowerCase()
//     console.log(recipes.filter(recipe => recipe.name.toLowerCase().includes(query)))
//     return recipes.filter(recipe => recipe.name.toLowerCase().includes(query))
// }  


// console.log(search)
//     search.addEventListener('click', ()=> {
//         console.log(inputSearch.value)
//         if(recipe.name === recipe.name.include(inputSearch.value)) {
//             return recipe
//         }
//     })

//au click je lance la recherhce
// si la recherche correspond au mot j'affiche que les elements qui corresponde a ce mot

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

    // while (wrapperRecipes.firstChild) {
    //     wrapperRecipes.removeChild(wrapperRecipes.firstChild);
    // }
    
    wrapperRecipes.innerHTML = ""

    recipes.forEach((recipe) => {
        let recipeCard = new RecipeCard(recipe)
        let cardElement = recipeCard.createTemplate()
        wrapperRecipes.appendChild(cardElement)

    })

}

displayRecipes()