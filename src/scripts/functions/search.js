let messageSearchError = document.querySelector('.search_error')
let messageSearchErrorSection = document.querySelector('.search_error-section')

export function searchByTitle(recipes, query) {

    // Convert query to lowercase
    query = query.toLowerCase();

    let allRecipes = [];

    for (let recipe of recipes) {
        let includeInResults = false;

        // Check if the query is in the recipe's ingredients
        for (let ingredient of recipe.ingredients) {
            if (ingredient.ingredient.toLowerCase().includes(query)) {
                includeInResults = true;
                break;
            }
        }

        // Check if the query is in the recipe's description
        if (!includeInResults && recipe.description.toLowerCase().includes(query)) {
            includeInResults = true;
        }

        // Check if the query is in the recipe's name
        if (!includeInResults && recipe.name.toLowerCase().includes(query)) {
            includeInResults = true;
        }

        if (includeInResults) {
            allRecipes.push(recipe);
        }
    }

    // Remove duplicates by converting to a Set and back to an Array
    allRecipes = [...new Set(allRecipes)];

    return allRecipes;
}

// Function to filter recipes by selected ingredients
export function filterBySelectedIngredients(recipes, selectedIngredients) {
    // Check if there are any selected ingredients
    if (selectedIngredients.length > 0) {
        return recipes.filter(recipe =>
            // Ensure every selected ingredient is present in the recipe's ingredients
            selectedIngredients.every(selectedIngredient =>
                // Check if the recipe has an ingredient that matches the selected ingredient
                recipe.ingredients.some(ingredient => 
                    ingredient.ingredient.toLowerCase() === selectedIngredient.toLowerCase()
                )
            )
        );
    }
    return recipes;
}

export function filterBySelectedUstensils(recipes, selectedUstensils) {

    if (selectedUstensils.length > 0) {
        return recipes.filter(recipe => 
            selectedUstensils.every(selectedUstensil => 
                recipe.ustensils.some(ustensil => 
                    ustensil.toLowerCase() === selectedUstensil.toLowerCase()
                )
            )
        );
    }
    return recipes;
}

export function filterBySelectedAppliances(recipes, selectedAppliances) {

    if (selectedAppliances.length > 0) {
        return recipes.filter(recipe => 
            selectedAppliances.every(selectedAppliance => 
                recipe.appliance.toLowerCase() === selectedAppliance.toLowerCase()
            )
        );
    }
    return recipes;
}