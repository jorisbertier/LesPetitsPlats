import { get } from "../api/api.js";
import { searchByTitle, filterBySelectedAppliances, filterBySelectedIngredients, filterBySelectedUstensils } from "./search.js";
import { totalRecipes } from "./totalRecipes.js";
import { RecipeCard } from "../templates/RecipeCard.js";
import { addAppliance, removeAppliance, getSelectedIngredients, getSelectedUstensils, getSelectedAppliances } from "./filter.js";

let inputSearchAppliance = document.querySelector('.search__input--appliances');
let inputSearch = document.getElementById('recipe');

// Initialize arrays to store all appliances and selected appliances
let allAppliances = [];
let selectedAppliances = [];

// Function to handle appliance search input and render suggestions
export async function displayAppliances() {
    allAppliances = await getAllAppliances();

    inputSearchAppliance.addEventListener('input', () => {
        let allAppliancesFilterByValue = allAppliances.filter(appliance =>
            appliance.toLowerCase().includes(inputSearchAppliance.value.toLowerCase())
        );
        renderAppliances(allAppliancesFilterByValue);
    });

    renderAppliances(allAppliances);
}

// get all Appliances
async function getAllAppliances() {
    const recipes = await get("/data/recipes.js");
    let appliances = [];

    recipes.forEach(recipe => {
        appliances.push(recipe.appliance.trim().toLowerCase());
    });

    appliances = [...new Set(appliances)];
    return appliances;
}

// Function to render appliance suggestions
export function renderAppliances(appliances) {
    let inputAppliances = document.querySelector('.results__appliances');
    inputAppliances.innerHTML = "";

    appliances.forEach(appliance => {
        let div = document.createElement('div');
        div.innerHTML = `${appliance}`;
        div.classList.add('bg-white', 'p-4', 'w-60', 'flex', 'justify-between', 'items-center', 'cursor-pointer', 'hover:bg-primary-color', 'ease-in', 'duration-150');
        inputAppliances.appendChild(div);

        div.addEventListener('click', () => {
            selectAppliance(appliance);
        });
    });
}

// Function to handle the selection of an appliance
function selectAppliance(appliance) {
    let wrapperAppliances = document.querySelector('.filterSearch');
    let divSelectedAppliance = document.createElement('div');

    divSelectedAppliance.innerHTML = `
        <div class="flex justify-center relative">
            <div class="bg-primary-color p-4 w-auto pr-16 rounded-xl max-md:text-xs max-500:w-28 max-md:w-32 max-md:h-11 max-md:p-3">${appliance}</div>
            <div class="delete__appliance">
                <i class="fa-solid fa-xmark absolute text-xl top-5 right-5 cursor-pointer max-md:text-sm max-md:top-4 max-md:right-3"></i>
            </div>
        </div>
    `;
    wrapperAppliances.appendChild(divSelectedAppliance);

    addAppliance(appliance);
    selectedAppliances.push(appliance);
    allAppliances = allAppliances.filter(app => app !== appliance);
    renderAppliances(allAppliances.filter(app => app.toLowerCase().includes(inputSearchAppliance.value.toLowerCase())));
    updateRecipes();

    let deleteButton = divSelectedAppliance.querySelector('.delete__appliance');
    deleteButton.addEventListener('click', () => {
        wrapperAppliances.removeChild(divSelectedAppliance);
        allAppliances.push(appliance);
        removeAppliance(appliance);
        selectedAppliances = selectedAppliances.filter(app => app !== appliance);
        renderAppliances(allAppliances.filter(app => app.toLowerCase().includes(inputSearchAppliance.value.toLowerCase())));
        updateRecipes();
    });
}

// Function to update recipes displayed based on selected appliances
async function updateRecipes() {
    const recipes = await get("/data/recipes.js");
    let query = inputSearch.value;

    let filteredRecipes = searchByTitle(recipes, query);
    filteredRecipes = filterBySelectedIngredients(filteredRecipes, getSelectedIngredients());
    filteredRecipes = filterBySelectedUstensils(filteredRecipes, getSelectedUstensils());
    filteredRecipes = filterBySelectedAppliances(filteredRecipes, getSelectedAppliances());

    // Mise à jour des listes d'appareils disponibles
    updateAvailableAppliances(filteredRecipes);

    totalRecipes(filteredRecipes.length);
    renderRecipes(filteredRecipes);
}

// Function to update available appliances based on filtered recipes
function updateAvailableAppliances(filteredRecipes) {
    let appliances = [];

    filteredRecipes.forEach(recipe => {
        appliances.push(recipe.appliance.trim().toLowerCase());
    });

    // Remove duplicates
    appliances = [...new Set(appliances)];

    // Filter out already selected appliances
    appliances = appliances.filter(appliance => !selectedAppliances.includes(appliance));

    // Render updated suggestions for appliances
    renderAppliances(appliances);
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

export function removeSearchAppliance() {
    let deleteSearchAppliance = document.querySelector('.xmark_appliance')

    deleteSearchAppliance.addEventListener('click', ()=> {
        inputSearchAppliance.value = ''
    })
}
