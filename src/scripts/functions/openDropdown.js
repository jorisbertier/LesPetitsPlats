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


function openAndCloseDropdown(open, close, wrapper) {
        open.addEventListener('click', ()=> {
        open.style.display = "none";
        close.style.display = "flex";
        wrapper.style.display = "flex"
    })
    
    close.addEventListener('click', ()=> {
        open.style.display = "flex";
        close.style.display = "none";
        wrapper.style.display = "none"
    })
    
}

openAndCloseDropdown(openDropdownIngredients, closeDropdownIngredients, wrapperIngredients)
openAndCloseDropdown(openDropdownUstensils, closeDropdownUstensils, wrapperUstensils)
openAndCloseDropdown(openDropdownAppliances, closeDropdownAppliances, wrapperAppliances)