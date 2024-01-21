let headerBlock = document.querySelector('.header');
let logoBlock = document.querySelector('.header__block-logo img');
let burgerButton = document.querySelector('.header__burger-button');

let burgerMenu = document.querySelector('.header__block-menu');
let mainBody = document.body;

let headerBlockMenu = document.querySelector('.header__block-menu');

/*===================================================================================*/
// TODO: чтобы загрузке страницы если будет уже проскролено, чтобы header имел фон
document.addEventListener('readystatechange', (event) => {
    if(event.target.readyState === 'complete') {        
        let scrollValue = window.pageYOffset;
        let currentDeviceWidth = window.innerWidth;
        if (scrollValue > 1) {
            if (!document.querySelector('.header__burger-button.active')) {
                if (currentDeviceWidth > 991) {
                    logoBlock.src = 'img/common/logo_black.svg';
                }
                headerBlock.classList.add('active-scroll');
            }

        } else {
            if (!(burgerButton.classList.contains('active'))) {
                logoBlock.src = 'img/common/logo.svg';
            }

            let popupActive = document.querySelector('.popup.open');
            if (!popupActive) {
                headerBlock.classList.remove('active-scroll');
            }
            logoBlock.src = 'img/common/logo_black.svg';
            if (!popupActive && scrollValue === 0) {
                if (!(burgerButton.classList.contains('active'))) {
                    logoBlock.src = 'img/common/logo.svg';
                }
            }
        }
    }
});
/*===================================================================================*/
// Функция для определения координаты body при скролле к нужному попапу (для фиксации body на IOS)
function coordValue() {
    const currentWindowCoord = document.body.getBoundingClientRect().top;
    return currentWindowCoord;
}
/*===================================================================================*/
burgerButton.addEventListener('click', function () {
    let scrollValue = coordValue();
    
    burgerButton.classList.toggle('active');
    burgerMenu.classList.toggle('active');
    mainBody.classList.toggle('lock');
    logoBlock.src = 'img/common/logo_black.svg';   

    mainBody.style.position = 'fixed';
    mainBody.style.top = scrollValue + 'px';

    if (!(burgerButton.classList.contains('active'))) {
        scrollValue = coordValue() * (-1);
        logoBlock.src = 'img/common/logo.svg';
        mainBody.style.position = '';
        mainBody.style.top = '';
        window.scrollTo(0, scrollValue);
    }

    // Если нажали вне блока с меню, когда оно активно
    headerBlockMenu.addEventListener('click', function(e) {
        if (!e.target.closest('.header__menu')) {
            burgerButton.classList.remove('active');
            burgerMenu.classList.remove('active');
            mainBody.classList.remove('lock');
            scrollValue = coordValue() * (-1);
            logoBlock.src = 'img/common/logo.svg';
            mainBody.style.position = '';
            mainBody.style.top = '';
            window.scrollTo(0, scrollValue);            
        }
    });
});
/*===================================================================================*/
// TODO: чтобы при изменении ширины экрана убирался active у Бургера
window.addEventListener('resize', resizeBurger);
// переменная для того, чтобы код при resize отработала единожды
let isResize = false;
export function resizeBurger() {
    let currentDeviceWidth = window.innerWidth;

    if (currentDeviceWidth >= 991 && !isResize) {
        logoBlock.src = 'img/common/logo.svg';
        burgerButton.classList.remove('active');
        burgerMenu.classList.remove('active');
        mainBody.classList.remove('lock');
        mainBody.style.position = '';
        mainBody.style.top = '';

        isResize = true;
    } else if (currentDeviceWidth < 768 && isResize) {
        isResize = false;
    }
}
/*===================================================================================*/
// TODO: чтобы при скролле добавлялся фон к header
window.addEventListener('scroll', function() {
    let scrollValue = window.pageYOffset;
    let currentDeviceWidth = window.innerWidth;
    if (scrollValue > 1) {
        if (!document.querySelector('.header__burger-button.active')) {
            if (currentDeviceWidth > 991) {
                logoBlock.src = 'img/common/logo_black.svg';
            }
            headerBlock.classList.add('active-scroll');
        }

    } else {
        if (!(burgerButton.classList.contains('active'))) {
            logoBlock.src = 'img/common/logo.svg';
        }

        let popupActive = document.querySelector('.popup.open');
        if (!popupActive) {
            headerBlock.classList.remove('active-scroll');
        }
        logoBlock.src = 'img/common/logo_black.svg';
        if (!popupActive && scrollValue === 0) {
            if (!(burgerButton.classList.contains('active'))) {
                logoBlock.src = 'img/common/logo.svg';
            }
        }
    }
});
/*===================================================================================*/
