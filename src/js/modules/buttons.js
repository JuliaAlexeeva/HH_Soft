
// ! Banner video start on click =====================================================
let videoLaptopScreen = document.querySelector('.laptop-screen');
let laptopScreenVideo = document.querySelector('.laptop-screen__video');

if (laptopScreenVideo) {
    laptopScreenVideo.addEventListener('click', playVideo);
}

function playVideo() {
    let currentDeviceWidth = window.innerWidth;
    let videoLink = laptopScreenVideo.getAttribute('data-link');

    videoLaptopScreen.classList.add('hidden');
    laptopScreenVideo.innerHTML = `<iframe src="${videoLink}" frameborder="0" allowfullscreen></iframe>`;
    if (currentDeviceWidth > 991) {
        laptopScreenVideo.querySelector('iframe').src += "&autoplay=1";
    }
}

// ! Spoiler button for "services card" ==============================================
let spoilerServiceCard = document.querySelectorAll('.services-card__spoiler');

if (spoilerServiceCard.length > 0) {
    spoilerServiceCard.forEach(button => {
        button.addEventListener('click', function(e) {
            let spoilerTextBlock = e.target.previousElementSibling;
            spoilerTextBlock.classList.remove('spoiler');
            e.target.style.display = 'none';
        });
    });
}
// -----------------------------------------------------------------------------------------------

// ! Объект для "skills block"
let skillsSelection = {
    categoriesButtons: document.querySelectorAll('.skills-elements__link'),
    categoriesBlocks: document.querySelectorAll('.skills-elements__figure'),
}

// ! Объект категорий Cases
let casesSelection = {
    categoriesButtons: document.querySelectorAll('.cases__block-categories .select-field__item'),
    categoriesBlocks: document.querySelectorAll('.cases__block-cards._category-collection'),
    moreButton: document.getElementById('more_cases'),
    lessButton: document.getElementById('less_cases'),

    // Глобальный идентификатор конкретного блока категорий
    selectionIdentify: '.cases__block-categories',
}
// ! Объект для категорий Catalog
let catalogSelection = {
    categoriesButtons: document.querySelectorAll('.catalog__block-categories .select-field__item'),
    categoriesBlocks: document.querySelectorAll('.catalog__block-cards._category-collection'),
    moreButton: document.getElementById('more_catalog'),
    lessButton: document.getElementById('less_catalog'),

    // Глобальный идентификатор конкретного блока категорий
    selectionIdentify: '.catalog__block-categories',
}

// ! Собираем все объекты переключателей в массив
let selectionGroups = [skillsSelection, casesSelection, catalogSelection];

for (let i = 0; i < selectionGroups.length; i++) {
    let selectionGroup = selectionGroups[i];
    
    // Проверка на то, есть ли этот элемент на странице
    if (selectionGroup) {
        if (selectionGroup.categoriesBlocks.length > 0 && selectionGroup.categoriesButtons.length > 0) {
            
            selectionGroup.categoriesButtons.forEach(item => {
                item.addEventListener('click', function() {                    
                    let thisElement = this;
                    let lessButton = selectionGroup.lessButton;
                    if (lessButton) {
                        lessButton.classList.add('hidden-button');
                        showElements(thisElement, selectionGroup.categoriesButtons, selectionGroup.categoriesBlocks, selectionGroup.moreButton, selectionGroup.lessButton);
                    } else {
                        showElements(thisElement, selectionGroup.categoriesButtons, selectionGroup.categoriesBlocks);
                    }
                    
                });
            });
        }
    }
}

// * Общая функция для переключающихся блоков ========================================
function showElements(thisTarget, buttons, elements, moreButton, lessButton) {
    
    let dataAttr = thisTarget.getAttribute('data-target');
    let textClassName = `.${dataAttr}`;

    // Убираем у всех active
    buttons.forEach(item => {
        item.classList.remove('active');
    });
    elements.forEach(item => {
        item.classList.remove('active');
    });

    // Добавляем только тому тексту и той кнопке, на которую нажали
    if (!thisTarget.classList.contains('active')) {
        thisTarget.classList.add('active');
        document.querySelector(textClassName).classList.add('active');

        // ! Для блоков спойлеров
        let thisCollectionCategory = document.querySelectorAll(`${textClassName} ._category-collection__item`);
        if (thisCollectionCategory.length > 0) {
            for (let i = 0; i < thisCollectionCategory.length; i++) {
                let separateCard = thisCollectionCategory[i];
                if (i > 5) {
                    separateCard.classList.add('hidden');
                    if (moreButton) {
                        moreButton.style.display = "flex";
                    }
                }
                if (thisCollectionCategory.length <= 6) {
                    if (moreButton) {
                        moreButton.style.display = "none";
                    }
                }
            }
        }
    }
    event.preventDefault();
}