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


export function filteredBySelectedIngredients(recipes, selectedIngredients) {

    return recipes.filter(recipe => 
        // Vérifier que chaque ingrédient sélectionné se trouve dans la liste des ingrédients de la recette
        selectedIngredients.every(selectedIngredient => 
            // Utiliser la méthode some pour vérifier si au moins un des ingrédients de la recette correspond à l'ingrédient sélectionné
            recipe.ingredients.some(ingredient => 
                // Comparer les ingrédients en minuscules pour éviter les problèmes de casse (majuscules/minuscules)
                ingredient.ingredient.toLowerCase() === selectedIngredient.toLowerCase()
            )
        )
    );
}