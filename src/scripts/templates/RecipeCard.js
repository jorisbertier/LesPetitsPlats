class RecipeCard {
    constructor(data) {
        this.data = data
    }

    createTemplate() {

        const {id,image, name, servings, ingredients, time, description, appliance, ustensils} = this.data

        const template = document.querySelector('.wrapper__recipes');
        const content = `
        <article class="bg-white rounded-3xl shadow-lg mb-5 w-96 h-650">
                <div class="relative">
                    <img class="w-full rounded-t-3xl h-64 object-cover"src="/src/img/lampos-aritonang-24gR_9lCdes-unsplash.jpg">
                    <div class="absolute top-4 right-4 bg-primary-color w-20 p-2 rounded-xl text-center">${time} min</div>
                </div>
                <div class="p-6 mt-3">
                    <h3 class="text-black font-anton uppercase text-base mb-6">${name}</h3>
                    <h4 class="text-secondary-color font-anton uppercase text-xs mb-2 font-thin tracking-widest">Recette</h4>
                    <p class="text-sm font-manrope">${description}.</p>
                    <h4 class="text-secondary-color font-anton uppercase text-xs font-thin tracking-widest mt-6 mb-3">Ingrédients</h4>
                    <div class="flex justify-between w-4/5">
                        <div>
                            <h5 class="text-sm text-black">Lait de Coco</h5>
                            <p class="text-secondary-color uppercase text-xs">400ml</p>
                        </div>
                        <div>
                            <h5 class="text-sm text-black">Lait de Coco</h5>
                            <p class="text-secondary-color uppercase text-xs">400ml</p>
                        </div>
                    </div>
                </div>
            </article>
        `
        template.innerHTML += content
        return content
    }
}

export { RecipeCard }