// export function searchByIngredient(recipes, query, ingredient) {
//     query = query.toLowerCase()
//     selectedIngredient = selectedIngredient ? selectedIngredient.toLowerCase() : null;

//     ingredient = null
//     // return filteredByIngredient
//     let filteredByIngredient = recipes.filter(recipe => recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(query)));
//     let filteredByDescription = recipes.filter(recipe => recipe.description.toLowerCase().includes(query));
//     let filteredByName = recipes.filter(recipe => recipe.name.toLowerCase().includes(query));

//     let allRecipes = [
//             ...filteredByIngredient,
//             ...filteredByDescription,
//             ...filteredByName
//         ];
        
//         allRecipes = [... new Set(allRecipes)]
//         if(ingredient != null) {
//             allRecipes = allRecipes.filter(recipe => recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(selectedIngredient)))
//         }
//         console.log(allRecipes)
//         return allRecipes
//         // let filteredByIngredientWordKey = recipes.filter(recipe => recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(query)));
//         // return filteredByIngredientWordKey  
// }