import { get } from "../api/api.js";
import { searchByTitle, filterBySelectedUstensils, filterBySelectedAppliances, filterBySelectedIngredients } from "./search.js";
import { totalRecipes } from "./totalRecipes.js";
import { RecipeCard } from "../templates/RecipeCard.js";
import { addUstensil, removeUstensil, getSelectedIngredients, getSelectedUstensils, getSelectedAppliances } from "./filter.js";
import { updateAvailableFilters, updateAvailableUstensils, getCurrentUstensils} from "./updateAvailableFilters.js";

let inputSearchUstensils = document.querySelector('.search__input--ustensils');
let inputSearch = document.getElementById('recipe');

// Initialize arrays to store all ustensils and selected ustensils
let allUstensils = [];
let selectedUstensils = [];

// Function to handle ustensil search input and render suggestions
export async function displayUstensils() {
    allUstensils = await getAllUstensils();

    inputSearchUstensils.addEventListener('input', () => {
        const currentUstensils = getCurrentUstensils();
        const selectedUstensils = getSelectedUstensils();
        const selectedIngredients = getSelectedIngredients();
        
        if (selectedUstensils.length !== 0 || selectedIngredients.length !== 0) {
            let filteredUstensils = currentUstensils.filter(ustensil =>
                ustensil.toLowerCase().includes(inputSearchUstensils.value.toLowerCase())
            );
            renderUstensils(filteredUstensils);
        } else {
            let allUstensilsFilterByValue = allUstensils.filter(ustensil =>
                ustensil.toLowerCase().includes(inputSearchUstensils.value.toLowerCase())
            );
            renderUstensils(allUstensilsFilterByValue);
        }
    });

    renderUstensils(allUstensils);
}

// get all Ustensils
async function getAllUstensils() {
    const recipes = await get("/data/recipes.js");
    let ustensils = [];

    recipes.forEach(recipe => {
        recipe.ustensils.forEach(ustensil => {
            ustensils.push(ustensil.trim().toLowerCase());
        });
    });

    ustensils = [...new Set(ustensils)];
    return ustensils;
}

// Function to render ustensil suggestions
export function renderUstensils(ustensils) {
    let inputUstensils = document.querySelector('.results__ustensils');
    inputUstensils.innerHTML = "";

    ustensils.forEach(ustensil => {
        let div = document.createElement('div');
        div.innerHTML = `${ustensil}`;
        div.classList.add('bg-white', 'p-4', 'w-60', 'flex', 'justify-between', 'items-center', 'cursor-pointer', 'hover:bg-primary-color', 'ease-in', 'duration-150', 'max-lg:w-44');
        inputUstensils.appendChild(div);

        div.addEventListener('click', () => {
            selectUstensil(ustensil);
        });
    });
}

// Function to handle the selection of an ustensil
function selectUstensil(ustensil) {
    let wrapperUstensils = document.querySelector('.filterSearch');
    let divSelectedUstensil = document.createElement('div');

    divSelectedUstensil.innerHTML = `
        <div class="flex justify-center relative">
            <div class="bg-primary-color p-4 w-auto pr-16 rounded-xl max-md:text-xs max-500:w-28 max-md:w-32 max-md:h-11 max-md:p-3">${ustensil}</div>
            <div class="delete__ustensil">
                <i class="fa-solid fa-xmark absolute text-xl top-5 right-5 cursor-pointer max-md:text-sm max-md:top-4 max-md:right-3"></i>
            </div>
        </div>
    `;
    wrapperUstensils.appendChild(divSelectedUstensil);

    addUstensil(ustensil);
    selectedUstensils.push(ustensil);
    allUstensils = allUstensils.filter(ust => ust !== ustensil);
    renderUstensils(allUstensils.filter(ust => ust.toLowerCase().includes(inputSearchUstensils.value.toLowerCase())));
    updateRecipes();

    let deleteButton = divSelectedUstensil.querySelector('.delete__ustensil');
    deleteButton.addEventListener('click', () => {
        wrapperUstensils.removeChild(divSelectedUstensil);
        allUstensils.push(ustensil);
        removeUstensil(ustensil);
        selectedUstensils = selectedUstensils.filter(ust => ust !== ustensil);
        renderUstensils(allUstensils.filter(ust => ust.toLowerCase().includes(inputSearchUstensils.value.toLowerCase())));
        updateRecipes();
    });
}

// Function to update recipes displayed based on selected ustensils
async function updateRecipes() {
    const recipes = await get("/data/recipes.js");
    let query = inputSearch.value;

    let filteredRecipes = searchByTitle(recipes, query);
    filteredRecipes = filterBySelectedIngredients(filteredRecipes, getSelectedIngredients());
    filteredRecipes = filterBySelectedUstensils(filteredRecipes, getSelectedUstensils());
    filteredRecipes = filterBySelectedAppliances(filteredRecipes, getSelectedAppliances());

    updateAvailableFilters(filteredRecipes);
    updateAvailableUstensils(filteredRecipes)

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

export function removeSearchUstensil() {
    let deleteSearchUstensil = document.querySelector('.xmark_ustensil')

    deleteSearchUstensil.addEventListener('click', ()=> {
        inputSearchUstensils.value = ''
    })
}
