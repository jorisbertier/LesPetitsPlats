import { renderUstensils } from "./filterUstensils.js";
import { renderAppliances } from "./filterAppliances.js";
import { renderIngredients } from "./filterIngredients.js";
import { getSelectedIngredients, getSelectedUstensils, getSelectedAppliances } from './filter.js';


let currentIngredients = [];
let currentUstensils = [];
let currentAppliances = [];

// Function to update available filters based on filtered recipes
export async function updateAvailableFilters(filteredRecipes) {
    let ingredients = [];
    let ustensils = [];
    let appliances = [];

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

export function getCurrentIngredients() {
    return currentIngredients;
}