import { RecipeCard } from "../templates/RecipeCard.js"
import { get } from "../api/api.js";
import { searchByTitle, removeSearch, filterBySelectedIngredients, filterBySelectedUstensils, filterBySelectedAppliances } from "../functions/search.js";
import { totalRecipes } from "../functions/totalRecipes.js"
// import { searchByIngredient } from "../functions/searchByIngredient.js";

//Select DOM element
let inputSearch = document.getElementById('recipe')
let search = document.querySelector('.search')

removeSearch('recipe', '.remove__result')

//Display
async function displayRecipes() {
    const recipes = await get("/data/recipes.js");
    renderRecipes(recipes);

    inputSearch.addEventListener('input', ()=> {
        let query = inputSearch.value;
        let filteredRecipes = searchByTitle(recipes, query)
        filteredRecipes = filterBySelectedIngredients(filteredRecipes, selectedIngredients)
        filteredRecipes = filterBySelectedUstensils(filteredRecipes, selectedUstensils)
        filteredRecipes = filterBySelectedAppliances(filteredRecipes, selectedAppliances);
        renderRecipes(filteredRecipes)
        totalRecipes(filteredRecipes.length)
    })

    // search.addEventListener('click', ()=> {
    //     let query = inputSearch.value;
    //     let filteredRecipes = searchByTitle(recipes, query)
    //     filteredRecipes = filterBySelectedIngredients(filteredRecipes, selectedIngredients)
    //     renderRecipes(filteredRecipes)
    // })

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
    const recipes = await get("/data/recipes.js");
    
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
        div.classList.add('bg-white', 'p-4', 'w-60', 'flex', 'justify-between', 'items-center', 'cursor-pointer', 'hover:bg-primary-color',
            'ease-in', 'duration-100', 'max-sm:w-28', 'max-sm:text-xs', 'max-sm:p-2');
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

    // Create a div for the selected ingredient
    let divSelectedIngredient = document.createElement('div');
    // divSelectedIngredient.innerHTML = `
    //     <div class="flex justify-center relative">
    //         <div class="bg-primary-color p-4 ingredients mt-4 w-3/4 rounded-xl">${ingredient}</div>
    //         <div class="delete__ingredient">
    //             <i class="fa-solid fa-xmark absolute text-xl top-9 right-14 cursor-pointer"></i>
    //         </div>
    //     </div>
    // `;
    divSelectedIngredient.innerHTML = `
        <div class="flex justify-center relative">
            <div class="bg-primary-color p-4 w-auto pr-16 rounded-xl">${ingredient}</div>
            <div class="delete__ingredient">
                <i class="fa-solid fa-xmark absolute text-xl top-5 right-5 cursor-pointer"></i>
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
    const recipes = await get("/data/recipes.js");

    let query = inputSearch.value; // Récupérer la valeur de la recherche actuelle
    

    let filteredRecipes = searchByTitle(recipes, query);
    filteredRecipes = filterBySelectedIngredients(filteredRecipes, selectedIngredients);
    totalRecipes(filteredRecipes.length)
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



// Get all Ustensiles
let inputSearchUstensils = document.querySelector('.search__input--ustensils');
let ustensils = [];
let selectedUstensils = [];

async function getAllUstensils() {
    const recipes = await get("/data/recipes.js");
    let allUstensils = [];

    // Extract ustensils from each recipe
    recipes.forEach(recipe => {
        recipe.ustensils.forEach(ustensil => {
            allUstensils.push(ustensil.trim().toLowerCase()) // Add ustensils to the list
        });
    });

    allUstensils = [...new Set(allUstensils)]; // Remove duplicate ustensils
    return allUstensils; // Return all ustensil without duplicate
}

async function renderUstensils(ustensils) {
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
    let wrapperUsentils = document.querySelector('.filterSearch');
    let divSelectedUstensil = document.createElement('div');

    divSelectedUstensil.innerHTML = `
        <div class="flex justify-center relative">
            <div class="bg-primary-color p-4 w-auto pr-16 rounded-xl">${ustensil}</div>
            <div class="delete__ustensil">
                <i class="fa-solid fa-xmark absolute text-xl top-5 right-5 cursor-pointer"></i>
            </div>
        </div>
    `;
    wrapperUsentils.appendChild(divSelectedUstensil);

    selectedUstensils.push(ustensil);

    ustensils = ustensils.filter(ing => ing != ustensil);
    renderUstensils(ustensils.filter(ing => ing.toLowerCase().includes(inputSearchUstensils.value.toLowerCase())));
    updateRecipesByUstensil();

    let deleteButton = divSelectedUstensil.querySelector('.delete__ustensil');
    deleteButton.addEventListener('click', () => {
        wrapperUsentils.removeChild(divSelectedUstensil);
        ustensils.push(ustensil);
        selectedUstensils = selectedUstensils.filter(ing => ing !== ustensil);

        renderUstensils(ustensils.filter(ing => ing.toLowerCase().includes(inputSearchUstensils.value.toLowerCase())));
        updateRecipesByUstensil();
    });
}


async function updateRecipesByUstensil() {
    const recipes = await get("/data/recipes.js");

    let query = inputSearch.value;

    // console.log(ustensils)
    let filteredRecipes = searchByTitle(recipes, query);
    filteredRecipes = filterBySelectedIngredients(filteredRecipes, selectedIngredients);
    filteredRecipes = filterBySelectedUstensils(filteredRecipes, selectedUstensils);
    totalRecipes(filteredRecipes.length)
    renderRecipes(filteredRecipes); // Render the filtered recipes
}


async function displayUstensils() {
    ustensils = await getAllUstensils();

    inputSearchUstensils.addEventListener('input', () => {
        
        let allUstensilsFilterByValue = ustensils.filter(ingredient => 
            ingredient.toLowerCase().includes(inputSearchUstensils.value.toLowerCase())
        );
        console.log(allUstensilsFilterByValue)
        renderUstensils(allUstensilsFilterByValue);
    });

    renderUstensils(ustensils);
}

displayUstensils();

/*Get all appareils */
// Get all Ustensiles
let inputSearchAppliance = document.querySelector('.search__input--appliances');
let appliances = [];
let selectedAppliances = [];

async function getAllAppliances() {
    const recipes = await get("/data/recipes.js");
    let allAppliances = [];

    recipes.forEach(recipe => {
        allAppliances.push(recipe.appliance.trim().toLowerCase())
    });

    allAppliances = [...new Set(allAppliances)];
    return allAppliances;
}

async function renderAppliances(appliances) {
    let inputAppliances= document.querySelector('.results__appliances');

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
            <div class="bg-primary-color p-4 w-auto pr-16 rounded-xl">${appliance}</div>
            <div class="delete__appliance">
                <i class="fa-solid fa-xmark absolute text-xl top-5 right-5 cursor-pointer"></i>
            </div>
        </div>
    `;
    wrapperAppliances.appendChild(divSelectedAppliance);

    selectedAppliances.push(appliance);

    appliances = appliances.filter(ing => ing != appliance);
    renderAppliances(appliances.filter(ing => ing.toLowerCase().includes(inputSearchAppliance.value.toLowerCase())));
    updateRecipesByAppliance();

    let deleteButton = divSelectedAppliance.querySelector('.delete__appliance');
    deleteButton.addEventListener('click', () => {
        wrapperAppliances.removeChild(divSelectedAppliance);
        appliances.push(appliance);
        selectedAppliances= selectedAppliances.filter(ing => ing !== appliance);

        renderAppliances(appliances.filter(ing => ing.toLowerCase().includes(inputSearchAppliance.value.toLowerCase())));
        updateRecipesByAppliance();
    });
}

async function updateRecipesByAppliance() {
    const recipes = await get("/data/recipes.js");

    let query = inputSearch.value;

    let filteredRecipes = searchByTitle(recipes, query);
    filteredRecipes = filterBySelectedIngredients(filteredRecipes, selectedIngredients);
    filteredRecipes = filterBySelectedUstensils(filteredRecipes, selectedUstensils);
    filteredRecipes = filterBySelectedAppliances(filteredRecipes, selectedAppliances);
    totalRecipes(filteredRecipes.length)
    renderRecipes(filteredRecipes);
}


async function displayAppliances() {
    appliances = await getAllAppliances();

    inputSearchAppliance.addEventListener('input', () => {
        
        let allAppliancesFilterByValue = appliances.filter(appliance => 
            appliance.toLowerCase().includes(inputSearchAppliance.value.toLowerCase())
        );
        console.log(allAppliancesFilterByValue)
        renderAppliances(allAppliancesFilterByValue);
    });

    renderAppliances(appliances);
}

displayAppliances();