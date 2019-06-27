let counter = 0;

const menuToggle = () => {

    let menuList = document.querySelector('.menu__list');

    if(menuList.classList.contains('menu__list_display')) {
        menuList.classList.toggle('menu__list_active');
        setTimeout(() => {
            menuList.classList.toggle('menu__list_display');
        }, 300);
    } else {
        menuList.classList.toggle('menu__list_display');
        setTimeout(() => {
            menuList.classList.toggle('menu__list_active');
        }, 20);
    }


};