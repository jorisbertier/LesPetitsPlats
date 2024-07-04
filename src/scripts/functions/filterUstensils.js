import { get } from "../api/api.js";
import { searchByTitle, filterBySelectedUstensils, filterBySelectedAppliances, filterBySelectedIngredients } from "./search.js";
import { totalRecipes } from "./totalRecipes.js";
import { RecipeCard } from "../templates/RecipeCard.js";
import { addUstensil, removeUstensil, getSelectedIngredients, getSelectedUstensils, getSelectedAppliances } from "./filter.js";

let inputSearchUstensils = document.querySelector('.search__input--ustensils');
let inputSearch = document.getElementById('recipe');
let ustensils = [];

export async function displayUstensils() {
    ustensils = await getAllUstensils();

    inputSearchUstensils.addEventListener('input', () => {
        let allUstensilsFilterByValue = ustensils.filter(ustensil =>
            ustensil.toLowerCase().includes(inputSearchUstensils.value.toLowerCase())
        );
        renderUstensils(allUstensilsFilterByValue);
    });

    renderUstensils(ustensils);
}

async function getAllUstensils() {
    const recipes = await get("/data/recipes.js");
    let allUstensils = [];

    recipes.forEach(recipe => {
        recipe.ustensils.forEach(ustensil => {
            allUstensils.push(ustensil.trim().toLowerCase());
        });
    });

    allUstensils = [...new Set(allUstensils)];
    return allUstensils;
}

function renderUstensils(ustensils) {
    let inputUstensils = document.querySelector('.results__ustensils');
    inputUstensils.innerHTML = "";

    ustensils.forEach(ustensil => {
        let div = document.createElement('div');
        div.innerHTML = `${ustensil}`;
        div.classList.add('bg-white', 'p-4', 'w-60', 'flex', 'justify-between', 'items-center', 'cursor-pointer', 'hover:bg-primary-color', 'ease-in', 'duration-150');
        inputUstensils.appendChild(div);

        div.addEventListener('click', () => {
            selectUstensil(ustensil);
        });
    });
}

function selectUstensil(ustensil) {
    let wrapperUstensils = document.querySelector('.filterSearch');
    let divSelectedUstensil = document.createElement('div');

    divSelectedUstensil.innerHTML = `
        <div class="flex justify-center relative">
            <div class="bg-primary-color p-4 w-auto pr-16 rounded-xl">${ustensil}</div>
            <div class="delete__ustensil">
                <i class="fa-solid fa-xmark absolute text-xl top-5 right-5 cursor-pointer"></i>
            </div>
        </div>
    `;
    wrapperUstensils.appendChild(divSelectedUstensil);

    addUstensil(ustensil);
    ustensils = ustensils.filter(ust => ust != ustensil);
    renderUstensils(ustensils.filter(ust => ust.toLowerCase().includes(inputSearchUstensils.value.toLowerCase())));
    updateRecipes();

    let deleteButton = divSelectedUstensil.querySelector('.delete__ustensil');
    deleteButton.addEventListener('click', () => {
        wrapperUstensils.removeChild(divSelectedUstensil);
        ustensils.push(ustensil);
        removeUstensil(ustensil)
        renderUstensils(ustensils.filter(ust => ust.toLowerCase().includes(inputSearchUstensils.value.toLowerCase())));
        updateRecipes();
    });
}

async function updateRecipes() {
    const recipes = await get("/data/recipes.js");
    let query = inputSearch.value;

    let filteredRecipes = searchByTitle(recipes, query);
    filteredRecipes = filterBySelectedIngredients(filteredRecipes, getSelectedIngredients()); // Utilise les ingrédients sélectionnés
    filteredRecipes = filterBySelectedUstensils(filteredRecipes, getSelectedUstensils()); // Utilise les ustensiles sélectionnés
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