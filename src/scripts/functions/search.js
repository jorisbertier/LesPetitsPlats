let messageSearchError = document.querySelector('.search_error')

export function searchByTitle(recipes, query) {

    //function replace caracter by entity html for prevent fail xss
    function escapeHtml(unsafe) {
        return unsafe
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    // Convert query lowCase & escape special caracters
    query = escapeHtml(query.toLowerCase());

    //Filter by Name || Description || Ingredient
    // if(query.length >= 3) {
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
        // if(allRecipes.length === 0) {
        //     messageSearchError.innerHTML = "Aucun résultat ne correspond à votre recherche"
        // } else {
        //     messageSearchError.innerHTML = ""
        // }
        return allRecipes
    // } else {
    //     messageSearchError.innerHTML = "Vous devez entrer au minimum 3 caractères pour faire la recherche"
    //     let allRecipes = []
    //     return allRecipes
    // }

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