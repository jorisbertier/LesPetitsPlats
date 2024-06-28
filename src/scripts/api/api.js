// Get datas recipes
export async function get(url) {

    // let recipes = [];

    try {
        const response = await fetch(url);
        let data = await response.json();
        return data
        // data.forEach(recipe => {
        //     recipes.push(recipe)
        // });

    } catch(error) {
        console.log('Error getting datas', error)
    }
    // console.log(recipes)
    // return ({
    //     recipes: [...recipes]
    // })
}

// getRecipes()