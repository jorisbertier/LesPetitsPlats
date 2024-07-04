// filters.js
export const filters = {
    selectedIngredients: [],
    selectedUstensils: [],
    selectedAppliances: [],
};

export function addIngredient(ingredient) {
    filters.selectedIngredients.push(ingredient);
}

export function removeIngredient(ingredient) {
    filters.selectedIngredients = filters.selectedIngredients.filter(ing => ing !== ingredient);
}

export function addUstensil(ustensil) {
    filters.selectedUstensils.push(ustensil);
}

export function removeUstensil(ustensil) {
    filters.selectedUstensils = filters.selectedUstensils.filter(ust => ust !== ustensil);
}

export function addAppliance(appliance) {
    filters.selectedAppliances.push(appliance);
}

export function removeAppliance(appliance) {
    filters.selectedAppliances = filters.selectedAppliances.filter(app => app !== appliance);
}

export function getSelectedIngredients() {
    return filters.selectedIngredients;
}

export function getSelectedUstensils() {
    return filters.selectedUstensils;
}

export function getSelectedAppliances() {
    return filters.selectedAppliances;
}