import { get } from "../api/api.js";
import { searchByTitle, filterBySelectedIngredients, filterBySelectedAppliances, filterBySelectedUstensils } from "./search.js";
import { totalRecipes } from "./totalRecipes.js";
import { RecipeCard } from "../templates/RecipeCard.js";
import { addIngredient, removeIngredient, getSelectedIngredients, getSelectedUstensils, getSelectedAppliances } from "./filter.js";
import { updateAvailableFilters, updateAvailableIngredients, getCurrentIngredients } from "./updateAvailableFilters.js";

let inputSearchIngredients = document.querySelector('.search__input');
let inputSearch = document.getElementById('recipe');

// Initialize arrays to store all ingredients and selected ingredients
let allIngredients = [];
let selectedIngredients = [];

// Function to handle ingredient search input and render suggestions
export async function displayIngredients() {
    allIngredients = await getAllIngredients(); // Get all unique ingredients

    inputSearchIngredients.addEventListener('input', () => {
        const currentIngredients = getCurrentIngredients(); // Get currently available ingredients
        const selectedUstensils = getSelectedUstensils();
        const selectAppliances = getSelectedAppliances()
        const mainSearchValue = inputSearch.value.trim().toLowerCase();

        if(selectedIngredients.length !== 0 || selectedUstensils.length !== 0 || selectAppliances.length !== 0 || mainSearchValue !== "") {
            let filteredIngredients = currentIngredients.filter(ingredient =>
                ingredient.toLowerCase().includes(inputSearchIngredients.value.toLowerCase())
            );
            renderIngredients(filteredIngredients);

        } else {
            let allIngredientsFilterByValue = allIngredients.filter(ingredient =>
                ingredient.toLowerCase().includes(inputSearchIngredients.value.toLowerCase())
            );
            renderIngredients(allIngredientsFilterByValue); // Render filtered ingredient suggestions

        }
    });

    renderIngredients(allIngredients); // Initial rendering of all ingredient suggestions
}

// get all Ingredients
async function getAllIngredients() {
    const recipes = await get("/data/recipes.js");
    let ingredients = [];

    // Extract ingredients from each recipe
    recipes.forEach(recipe => {
        recipe.ingredients.forEach(ingredient => {
            ingredients.push(ingredient.ingredient.trim().toLowerCase()); // Add ingredient to the list
        });
    });

    ingredients = [...new Set(ingredients)]; // Remove duplicate ingredients
    return ingredients; // Return all ingredients without duplicate
}

// Function to render ingredients suggestions
export function renderIngredients(ingredients) {
    let inputIngredients = document.querySelector('.results');
    inputIngredients.innerHTML = "";

    // Create and display a list of suggestions for each ingredient
    ingredients.forEach(ingredient => {
        let div = document.createElement('div');
        div.innerHTML = `${ingredient}`;
        div.classList.add('bg-white', 'p-4', 'w-60', 'flex', 'justify-between', 'items-center', 'cursor-pointer', 'hover:bg-primary-color', 'ease-in', 'duration-100', 'max-lg:w-44', 'max-sm:w-28', 'max-sm:text-xs', 'max-sm:p-2');
        inputIngredients.appendChild(div);

        // Add click event listener for each ingredient
        div.addEventListener('click', () => {
            selectIngredient(ingredient);
        });
    });
}

// Function to handle(gèrer) the selection of an ingredient
function selectIngredient(ingredient) {
    let wrapperIngredients = document.querySelector('.filterSearch');
    let divSelectedIngredient = document.createElement('div');

    // Create a div for the selected ingredient
    divSelectedIngredient.innerHTML = `
        <div class="flex justify-center relative rounded-xl">
            <div class="bg-primary-color p-4 w-auto pr-16 rounded-xl max-md:text-xs max-500:w-28 max-md:w-32 max-md:h-11 max-md:p-3">${ingredient}</div>
            <div class="delete__ingredient">
                <i class="fa-solid fa-xmark absolute text-xl top-5 right-5 cursor-pointer max-md:text-sm max-md:top-4 max-md:right-3"></i>
            </div>
        </div>
    `;
    wrapperIngredients.appendChild(divSelectedIngredient);

    // Add the selected ingredient to the list of selected ingredients
    addIngredient(ingredient);
    selectedIngredients.push(ingredient);
    allIngredients = allIngredients.filter(ing => ing !== ingredient);

    // Remove the selected ingredient from the suggestions
    renderIngredients(allIngredients.filter(ing => ing.toLowerCase().includes(inputSearchIngredients.value.toLowerCase())));

    // Update displayed recipes based on selected ingredients
    updateRecipes();

    let deleteButton = divSelectedIngredient.querySelector('.delete__ingredient');
    deleteButton.addEventListener('click', () => {
        wrapperIngredients.removeChild(divSelectedIngredient);
        allIngredients.push(ingredient);
        removeIngredient(ingredient);
        selectedIngredients = selectedIngredients.filter(ing => ing !== ingredient);
        renderIngredients(allIngredients.filter(ing => ing.toLowerCase().includes(inputSearchIngredients.value.toLowerCase())));
        updateRecipes();
    });
}

// Function to update recipes displayed based on selected ingredients
async function updateRecipes() {
    const recipes = await get("/data/recipes.js");
    let query = inputSearch.value;

    let filteredRecipes = searchByTitle(recipes, query);
    filteredRecipes = filterBySelectedIngredients(filteredRecipes, getSelectedIngredients()); // Utilise les ingrédients sélectionnés
    filteredRecipes = filterBySelectedUstensils(filteredRecipes, getSelectedUstensils()); // Utilise les ustensiles sélectionnés
    filteredRecipes = filterBySelectedAppliances(filteredRecipes, getSelectedAppliances());

    // Updated lists of available ingredients
    updateAvailableFilters(filteredRecipes);
    updateAvailableIngredients(filteredRecipes)

    totalRecipes(filteredRecipes.length);
    renderRecipes(filteredRecipes);
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

export function removeSearchIngredient() {
    let deleteSearchIngredient = document.querySelector('.xmark_ingredient')

    deleteSearchIngredient.addEventListener('click', () => {
        inputSearchIngredients.value = ''
    })
}
