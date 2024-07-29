import { renderUstensils } from "./filterUstensils.js";
import { renderAppliances } from "./filterAppliances.js";
import { renderIngredients } from "./filterIngredients.js";
import { getSelectedIngredients, getSelectedUstensils, getSelectedAppliances } from './filter.js';


let currentIngredients = [];
let currentUstensils = [];
let currentAppliances = [];

// Function to update available filters advanced ingredients/ ustensils/ appliances based on filtered recipes
export async function updateAvailableFilters(filteredRecipes) {
    let ingredients = [];
    let ustensils = [];
    let appliances = [];

    // extract & normalize 
    filteredRecipes.forEach(recipe => {
        recipe.ingredients.forEach(ing => {
            ingredients.push(ing.ingredient.trim().toLowerCase());
        });
        recipe.ustensils.forEach(ust => {
            ustensils.push(ust.trim().toLowerCase());
        });
        appliances.push(recipe.appliance.trim().toLowerCase());
    });

    ingredients = [...new Set(ingredients)];
    ustensils = [...new Set(ustensils)];
    appliances = [...new Set(appliances)];

    // Filters lists to exclude ingredients, utensils and appliances already selected by the user
    ingredients = ingredients.filter(ing => !getSelectedIngredients().includes(ing));
    ustensils = ustensils.filter(ust => !getSelectedUstensils().includes(ust));
    appliances = appliances.filter(app => !getSelectedAppliances().includes(app));

    currentIngredients = ingredients;
    currentUstensils = ustensils;
    currentAppliances = appliances;

    renderIngredients(currentIngredients);
    renderUstensils(currentUstensils);
    renderAppliances(currentAppliances);
}

// Update only ingrdients availables by recipes filtered
export function updateAvailableIngredients(filteredRecipes) {
    let ingredients = [];

    filteredRecipes.forEach(recipe => {
        recipe.ingredients.forEach(ing => {
            ingredients.push(ing.ingredient.trim().toLowerCase());
        });
    });

    ingredients = [...new Set(ingredients)];
    ingredients = ingredients.filter(ing => !getSelectedIngredients().includes(ing));

    currentIngredients = ingredients;

    renderIngredients(currentIngredients);
}

export function updateAvailableUstensils(filteredRecipes) {
    let ustensils = [];

    filteredRecipes.forEach(recipe => {
        recipe.ustensils.forEach(ust => {
            ustensils.push(ust.trim().toLowerCase());
        });
    });

    ustensils = [...new Set(ustensils)];
    ustensils = ustensils.filter(ust => !getSelectedUstensils().includes(ust));

    currentUstensils = ustensils;

    renderUstensils(currentUstensils);
}

export function updateAvailableAppliances(filteredRecipes) {
    let appliances = [];

    filteredRecipes.forEach(recipe => {
        appliances.push(recipe.appliance.trim().toLowerCase());
    });

    appliances = [...new Set(appliances)];
    appliances = appliances.filter(app => !getSelectedAppliances().includes(app));

    currentAppliances = appliances;

    renderAppliances(currentAppliances);
}

export function getCurrentIngredients() {
    return currentIngredients;
}

export function getCurrentUstensils() {
    return currentUstensils;
}

export function getCurrentAppliances() {
    return currentAppliances;
}