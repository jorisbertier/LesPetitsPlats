import { RecipeCard } from "../templates/RecipeCard.js"
import { getRecipes } from "../api/api.js";
import { searchByTitle, removeSearch } from "../functions/search.js";
import { searchByIngredient } from "../functions/searchByIngredient.js";

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


// All functions Ingredients
let inputSearchIngredients = document.querySelector('.search__input');

// Initialize array
let ingredients = [];

// Get all ingredients
async function getAllIngredients() {
    const { recipes } = await getRecipes();
    let allIngredients = [];

    recipes.forEach(recipe => {
        recipe.ingredients.forEach(ingredient => {
            allIngredients.push(ingredient.ingredient.trim().toLowerCase());
        });
    });

    allIngredients = [...new Set(allIngredients)];
    return allIngredients;
}

async function renderIngredients(ingredients) {
    let inputIngredients = document.querySelector('.results');

    inputIngredients.innerHTML = "";

    ingredients.forEach(ingredient => {
        let div = document.createElement('div');
        div.innerHTML = `${ingredient}`;
        div.classList.add('bg-white', 'p-4', 'w-60', 'flex', 'justify-between', 'items-center', 'cursor-pointer');
        inputIngredients.appendChild(div);

        div.addEventListener('click', () => {
            selectIngredient(ingredient);
        });
    });
}

function selectIngredient(ingredient) {
    let wrapperIngredients = document.querySelector('.selected__ingredient');

    let divSelectedIngredient = document.createElement('div');
    divSelectedIngredient.innerHTML = `
        <div class="flex justify-center relative">
            <div class="bg-primary-color p-4 ingredients mt-4 w-3/4 rounded-xl">${ingredient}</div>
            <div class="delete__ingredient">
                <i class="fa-solid fa-xmark absolute text-xl top-9 right-14"></i>
            </div>
        </div>
    `;
    wrapperIngredients.appendChild(divSelectedIngredient);

    ingredients = ingredients.filter(ing => ing != ingredient);
    renderIngredients(ingredients.filter(ing => ing.toLowerCase().includes(inputSearchIngredients.value.toLowerCase())));

    // Update displayed recipes based on selected ingredient
    updateRecipesByIngredient(ingredient);

    let deleteButton = divSelectedIngredient.querySelector('.delete__ingredient');
    deleteButton.addEventListener('click', () => {
        wrapperIngredients.removeChild(divSelectedIngredient);
        ingredients.push(ingredient);
        renderIngredients(ingredients.filter(ing => ing.toLowerCase().includes(inputSearchIngredients.value.toLowerCase())));
        // Reset displayed recipes when an ingredient is removed
        displayRecipes();
    });
}

async function updateRecipesByIngredient(selectedIngredient) {
    const { recipes } = await getRecipes();
    const filteredRecipes = recipes.filter(recipe => 
        recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase() === selectedIngredient.toLowerCase())
    );
    renderRecipes(filteredRecipes);
}

async function displayIngredients() {
    ingredients = await getAllIngredients();

    inputSearchIngredients.addEventListener('input', () => {
        let allIngredientsFilterByvalue = ingredients.filter(ingredient => 
            ingredient.toLowerCase().includes(inputSearchIngredients.value.toLowerCase())
        );
        renderIngredients(allIngredientsFilterByvalue);
    });

    renderIngredients(ingredients);
}

displayIngredients();

/**Fin zone de test */