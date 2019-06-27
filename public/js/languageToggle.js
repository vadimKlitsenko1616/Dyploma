const languageToggle = () => {

    let dropdownItem = document.getElementById('languageDropdown');
    let dropdownArrow = document.querySelector('.language__toggle').lastChild;

    console.log(dropdownArrow);

    dropdownArrow.classList.toggle('language__toggle-arrow_active');

    dropdownItem.classList.toggle('language__item_hidden');
    dropdownItem.classList.toggle('language__item_active');


};