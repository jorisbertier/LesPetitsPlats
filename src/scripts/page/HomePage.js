import { RecipeCard } from "../templates/RecipeCard.js"
import { getRecipes } from "../api/api.js";
import { searchByTitle, removeSearch, filterBySelectedIngredients } from "../functions/search.js";
// import { searchByIngredient } from "../functions/searchByIngredient.js";

//Select DOM element
let inputSearch = document.getElementById('recipe')
let search = document.querySelector('.search')

removeSearch('recipe', '.remove__result')

//Display
async function displayRecipes() {
    const { recipes } = await getRecipes()
    renderRecipes(recipes);

    inputSearch.addEventListener('input', ()=> {
        let query = inputSearch.value;
        let filteredRecipes = searchByTitle(recipes, query)
        filteredRecipes = filterBySelectedIngredients(filteredRecipes, selectedIngredients)
        renderRecipes(filteredRecipes)
    })

    search.addEventListener('click', ()=> {
        let query = inputSearch.value;
        let filteredRecipes = searchByTitle(recipes, query)
        filteredRecipes = filterBySelectedIngredients(filteredRecipes, selectedIngredients)
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

// Initialize arrays to store all ingredients and selected ingredients
let ingredients = [];
let selectedIngredients = [];

// Function to get all ingredients without duplicate from recipes
async function getAllIngredients() {
    const { recipes } = await getRecipes();
    let allIngredients = [];

    // Extract ingredients from each recipe
    recipes.forEach(recipe => {
        recipe.ingredients.forEach(ingredient => {
            allIngredients.push(ingredient.ingredient.trim().toLowerCase()); // Add ingredient to the list
        });
    });

    allIngredients = [...new Set(allIngredients)]; // Remove duplicate ingredients
    return allIngredients; // Return all ingredients without duplicate
}

// Function to render ingredients suggestions
async function renderIngredients(ingredients) {
    let inputIngredients = document.querySelector('.results');

    inputIngredients.innerHTML = "";

    // Create and display a list of suggestions for each ingredient
    ingredients.forEach(ingredient => {
        let div = document.createElement('div');
        div.innerHTML = `${ingredient}`;
        div.classList.add('bg-white', 'p-4', 'w-60', 'flex', 'justify-between', 'items-center', 'cursor-pointer', 'hover:bg-primary-color', 'ease-in', 'duration-150');
        inputIngredients.appendChild(div);

         // Add click event listener for each ingredient
        div.addEventListener('click', () => {
            selectIngredient(ingredient);
        });
    });
}

// Function to handle(gèrer) the selection of an ingredient
function selectIngredient(ingredient) {
    let wrapperIngredients = document.querySelector('.selected__ingredient');

    // Create a div for the selected ingredient
    let divSelectedIngredient = document.createElement('div');
    divSelectedIngredient.innerHTML = `
        <div class="flex justify-center relative">
            <div class="bg-primary-color p-4 ingredients mt-4 w-3/4 rounded-xl">${ingredient}</div>
            <div class="delete__ingredient">
                <i class="fa-solid fa-xmark absolute text-xl top-9 right-14 cursor-pointer"></i>
            </div>
        </div>
    `;
    wrapperIngredients.appendChild(divSelectedIngredient);

    // Add the selected ingredient to the list of selected ingredients
    selectedIngredients.push(ingredient);
    console.log(selectedIngredients);

    // Remove the selected ingredient from the suggestions
    ingredients = ingredients.filter(ing => ing != ingredient);
    renderIngredients(ingredients.filter(ing => ing.toLowerCase().includes(inputSearchIngredients.value.toLowerCase())));

    // Update displayed recipes based on selected ingredients
    updateRecipesByIngredient();

    // Add event listener to delete the selected ingredient
    let deleteButton = divSelectedIngredient.querySelector('.delete__ingredient');
    deleteButton.addEventListener('click', () => {
        wrapperIngredients.removeChild(divSelectedIngredient); // Remove the ingredient from the selected list
        ingredients.push(ingredient); // Add the ingredient back to the suggestions
        selectedIngredients = selectedIngredients.filter(ing => ing !== ingredient); // Remove the ingredient from selected ingredients
        console.log(selectedIngredients);

        // Render the updated list of ingredient suggestions
        renderIngredients(ingredients.filter(ing => ing.toLowerCase().includes(inputSearchIngredients.value.toLowerCase())));

        // Update displayed recipes based on remaining selected ingredients
        updateRecipesByIngredient();
    });
}

// Function to update recipes displayed based on selected ingredients
async function updateRecipesByIngredient() {
    const { recipes } = await getRecipes();

    let query = inputSearch.value; // Récupérer la valeur de la recherche actuelle

    let filteredRecipes = searchByTitle(recipes, query);
    filteredRecipes = filterBySelectedIngredients(filteredRecipes, selectedIngredients);
    renderRecipes(filteredRecipes); // Render the filtered recipes
}

// Function to handle ingredient search input and render suggestions
async function displayIngredients() {
    ingredients = await getAllIngredients(); // Get all unique ingredients

    // Add event listener to the ingredient search input
    inputSearchIngredients.addEventListener('input', () => {
        let allIngredientsFilterByValue = ingredients.filter(ingredient => 
            ingredient.toLowerCase().includes(inputSearchIngredients.value.toLowerCase())
        );
        renderIngredients(allIngredientsFilterByValue); // Render filtered ingredient suggestions
    });

    renderIngredients(ingredients); // Initial rendering of all ingredient suggestions
}

displayIngredients(); // Initial call to display ingredient suggestions

/**Fin zone de test */