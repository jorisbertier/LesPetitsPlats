import { get } from "../api/api.js";
import { searchByTitle, filterBySelectedAppliances, filterBySelectedIngredients, filterBySelectedUstensils } from "./search.js";
import { totalRecipes } from "./totalRecipes.js";
import { RecipeCard } from "../templates/RecipeCard.js";
import { addAppliance, removeAppliance, getSelectedIngredients, getSelectedUstensils, getSelectedAppliances } from "./filter.js";

let inputSearchAppliance = document.querySelector('.search__input--appliances');
let inputSearch = document.getElementById('recipe');
let appliances = [];
export async function displayAppliances() {
    appliances = await getAllAppliances();

    inputSearchAppliance.addEventListener('input', () => {
        let allAppliancesFilterByValue = appliances.filter(appliance =>
            appliance.toLowerCase().includes(inputSearchAppliance.value.toLowerCase())
        );
        renderAppliances(allAppliancesFilterByValue);
    });

    renderAppliances(appliances);
}

async function getAllAppliances() {
    const recipes = await get("/data/recipes.js");
    let allAppliances = [];

    recipes.forEach(recipe => {
        allAppliances.push(recipe.appliance.trim().toLowerCase());
    });

    allAppliances = [...new Set(allAppliances)];
    return allAppliances;
}

function renderAppliances(appliances) {
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
    appliances = appliances.filter(app => app != appliance);
    renderAppliances(appliances.filter(app => app.toLowerCase().includes(inputSearchAppliance.value.toLowerCase())));
    updateRecipes();

    let deleteButton = divSelectedAppliance.querySelector('.delete__appliance');
    deleteButton.addEventListener('click', () => {
        wrapperAppliances.removeChild(divSelectedAppliance);
        appliances.push(appliance);
        removeAppliance(appliance)
        renderAppliances(appliances.filter(app => app.toLowerCase().includes(inputSearchAppliance.value.toLowerCase())));
        updateRecipes();
    });
}

async function updateRecipes() {
    const recipes = await get("/data/recipes.js");
    let query = inputSearch.value;

    let filteredRecipes = searchByTitle(recipes, query);
    filteredRecipes = filterBySelectedIngredients(filteredRecipes, getSelectedIngredients());
    filteredRecipes = filterBySelectedUstensils(filteredRecipes, getSelectedUstensils());
    filteredRecipes = filterBySelectedAppliances(filteredRecipes, getSelectedAppliances())

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


export function removeSearchAppliance() {
    let deleteSearchAppliance = document.querySelector('.xmark_appliance')

    deleteSearchAppliance.addEventListener('click', ()=> {
        inputSearchAppliance.value = ''
    })
}