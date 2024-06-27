// Selection elements of DOM
let openDropdownIngredients = document.querySelector('.chevron-down--ingredients')
let closeDropdownIngredients = document.querySelector('.chevron-up--ingredients')
let wrapperIngredients = document.querySelector('.ingredients')

let openDropdownUstensils = document.querySelector('.chevron-down--ustensils')
let closeDropdownUstensils = document.querySelector('.chevron-up--ustensils')
let wrapperUstensils = document.querySelector('.ustensils')


let openDropdownAppliances = document.querySelector('.chevron-down--appliances')
let closeDropdownAppliances = document.querySelector('.chevron-up--appliances')
let wrapperAppliances = document.querySelector('.appliances')

let buttonIngredient = document.querySelector('.button__ingredient')
let buttonUstensils = document.querySelector('.button__ustensil')
let buttonAppliances = document.querySelector('.button__appliance')

function openAndCloseDropdown(open, close, wrapper, button) {
        open.addEventListener('click', ()=> {
        open.style.display = "none";
        close.style.display = "flex";
        wrapper.style.display = "flex"
        button.style.borderBottomLeftRadius = "none"
        button.classList.remove("rounded-md");
        button.classList.add('rounded-t-md')
    })
    
    close.addEventListener('click', ()=> {
        open.style.display = "flex";
        close.style.display = "none";
        wrapper.style.display = "none"
        button.classList.add("rounded-md");
        button.classList.remove("rounded-t-md");
    })
    
}

openAndCloseDropdown(openDropdownIngredients, closeDropdownIngredients, wrapperIngredients, buttonIngredient)
openAndCloseDropdown(openDropdownUstensils, closeDropdownUstensils, wrapperUstensils, buttonUstensils)
openAndCloseDropdown(openDropdownAppliances, closeDropdownAppliances, wrapperAppliances, buttonAppliances)