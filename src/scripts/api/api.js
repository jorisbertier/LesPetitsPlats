// Get datas recipes
export async function getRecipes() {

    let recipes = [];

    try {
        const response = await fetch("/data/recipes.js");
        let data = await response.json();
    
        data.forEach(recipe => {
            recipes.push(recipe)
        });

    } catch(error) {
        console.log('Error getting datas recipes', error)
    }
    // console.log(recipes)
    return ({
        recipes: [...recipes]
    })
}

getRecipes()