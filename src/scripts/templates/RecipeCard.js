class RecipeCard {
    constructor(data) {
        this.data = data
    }

    createTemplate() {

        const {id,image, name, servings, ingredients, time, description, appliance, ustensils} = this.data

        const template = document.querySelector('.wrapper__recipes');

        function formatTime(time) {
            if(time > 60) {
                let hours = Math.floor(time / 60)
                let minutes = time % 60;
                return `${hours}h ${minutes} min`
            } else {
                return `${time} min`
            }
        }

        function formatDescription(description) {
            if(description.length > 200) {
                return description.substring(0, 200) + "...";
            } else {
                return description
            }
        }
        
        function getIngredients(ingredients) {
            return ingredients.map((ingredient) => `
                <div>
                    <h5 class="text-sm text-black">${ingredient.ingredient}</h5>
                    <p class="text-secondary-color uppercase text-xs">${ingredient.quantity || ''}${ingredient.unit || ''}</p>
                </div>
            `).join('');
        }
        
        const formatedDescription = formatDescription(description)

        const formattedTime = formatTime(time)

        const allIngredients = getIngredients(ingredients)

        const content = `
        <a href="#">
            <article class="bg-white rounded-3xl shadow-lg mb-5 w-96 h-700">
                    <div class="relative">
                        <img class="w-full rounded-t-3xl h-64 object-cover"src="/src/img/lampos-aritonang-24gR_9lCdes-unsplash.jpg">
                        <div class="absolute top-4 right-4 bg-primary-color w-20 p-2 rounded-xl text-center">${formattedTime}</div>
                    </div>
                    <div class="p-6 mt-3">
                        <h3 class="text-black font-anton uppercase text-base mb-6">${name}</h3>
                        <h4 class="text-secondary-color font-anton uppercase text-xs mb-2 font-thin tracking-widest">Recette</h4>
                        <p class="text-sm font-manrope">${formatedDescription}.</p>
                        <h4 class="text-secondary-color font-anton uppercase text-xs font-thin tracking-widest mt-6 mb-0">Ingrédients</h4>
                    </div>
                    <div class="grid gap-3 grid-cols-2 pl-6 mt-0">
                        ${allIngredients}
                    </div>
                    
                </article>
            </a>
        `
        template.innerHTML += content
        return content
    }
}

export { RecipeCard }

                        // <div class="grid gap-4 grid-cols-2 grid-flow-col wrapper__recipe--ingredient">
                        //     <div class="h-16">
                        //         <h5 class="text-sm text-black">Lait de Coco</h5>
                        //         <p class="text-secondary-color uppercase text-xs">400ml</p>
                        //     </div>
                        //     <div class="bg-red-500">
                        //         <h5 class="text-sm text-black bg-red-500">Lait de Coco</h5>
                        //         <p class="text-secondary-color uppercase text-xs">400ml</p>
                        //     </div>

                        // </div>