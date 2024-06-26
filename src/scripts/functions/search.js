let messageSearchError = document.querySelector('.search_error')

export function searchByTitle(recipes, query) {
    // Convert query to lower case
    query = query.toLowerCase()

    //Filter by Name || Description || Ingredient
    if(query.length >= 3) {
        let filteredByIngredient = recipes.filter(recipe => recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(query)));
        let filteredByDescription = recipes.filter(recipe => recipe.description.toLowerCase().includes(query));
        let filteredByName = recipes.filter(recipe => recipe.name.toLowerCase().includes(query));
        let allRecipes = [
            ...filteredByIngredient,
            ...filteredByDescription,
            ...filteredByName
        ];
        messageSearchError.innerHTML = ""
        //Delete duplicate
        allRecipes = [... new Set(allRecipes)]

        if(allRecipes.length === 0) {
            messageSearchError.innerHTML = "Aucun résultat ne correspond à votre recherche"
        } else {
            messageSearchError.innerHTML = ""
        }
        return allRecipes
    } else {
        messageSearchError.innerHTML = "Vous devez entrer au minimum 3 caractères pour faire la recherche"
        let allRecipes = []
        return allRecipes
    }

}  

// Remove search at the click, re initialiaze search to ""
export function removeSearch(inputSearchId, removeSearchClass) {
    let inputSearch = document.getElementById(inputSearchId);
    let removeSearch = document.querySelector(removeSearchClass)

    removeSearch.addEventListener('click', ()=> {
        inputSearch.value = ""
    })
}


export function filterBySelectedIngredients(recipes, selectedIngredients) {
    if (selectedIngredients.length > 0) {
        return recipes.filter(recipe => 
            selectedIngredients.every(selectedIngredient => 
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