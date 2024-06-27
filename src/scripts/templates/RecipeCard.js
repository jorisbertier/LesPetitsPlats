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
                    <h5 class="text-sm text-black max-lg:text-xs">${ingredient.ingredient}</h5>
                    <p class="text-secondary-color uppercase text-xs max-lg:text-xs max-lg:lowercase">${ingredient.quantity || ''}${ingredient.unit || ''}</p>
                </div>
            `).join('');
        }
        
        const formatedDescription = formatDescription(description)

        const formattedTime = formatTime(time)

        const allIngredients = getIngredients(ingredients)

        const card = document.createElement('article');
        card.className = `bg-white rounded-3xl shadow-lg mb-5 w-96 h-700 max-lg:w-56 max-lg:h-500 max-md:w-48
        max-400:w-80 max-426:w-96 max-570:w-96 max-sm:w-5/6 max-md:w-80 max-690:w-72 max-860:w-80 max-lg:w-96
        max-350:w-72 max-md:justify-center h-auto pb-4`;
        card.innerHTML = `
        <a href="#">
                    <div class="relative">
                        <img class="w-full rounded-t-3xl h-56 object-cover max-lg:h-52 max-350:h-36 max-375:h-40 max-800:h-44" src="/src/img/recipes/${image}">
                        <div class="absolute top-4 right-4 bg-primary-color w-20 p-2 rounded-xl text-center max-sm:text-xs/3 max-sm:w-14">${formattedTime}</div>
                    </div>
                    <div class="p-6 mt-3 max-sm:mt-0">
                        <h3 class="text-black font-anton uppercase text-base mb-6 max-lg:text-xs max-sm:mb-0">${name}</h3>
                        <h4 class="text-secondary-color font-anton uppercase text-xs mb-2 font-thin tracking-widest max-400:hidden mt-5 max-570:text-xs">Recette</h4>
                    <p class="text-sm font-manrope max-400:hidden max-800:text-xs">${formatedDescription}.</p>
                        <h4 class="text-secondary-color font-anton uppercase text-xs font-thin tracking-widest mt-6 mb-0 max-lg:text-xs/[2px] max-sm:mt-5">Ingrédients</h4>
                    </div>
                    <div class="grid gap-3 grid-cols-2 pl-6 mt-0">
                        ${allIngredients}
                    </div>

            </a>
        `
        
        return card;
    }
}

export { RecipeCard }
