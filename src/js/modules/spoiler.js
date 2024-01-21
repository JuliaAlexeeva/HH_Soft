// ! SPOILERS =====================================================

// Объект для карточек Cases
let casesCardsSpoiler = {
    // Все карточки активной категории
    allCards: document.querySelectorAll('.cases__block-cards.active .cases-card'),
    showMoreButton: document.getElementById('more_cases'),
    showLessButton: document.getElementById('less_cases'),
    // Глобальный идентификатор конкретного блока карточек
    categoryIdentify: '.cases__block-cards',
}
// Объект для карточек Catalog
let catalogCardsSpoiler = {
    // Все карточки активной категории
    allCards: document.querySelectorAll('.catalog__block-cards.active .catalog-card'),
    showMoreButton: document.getElementById('more_catalog'),
    showLessButton: document.getElementById('less_catalog'),
    // Глобальный идентификатор конкретного блока карточек
    categoryIdentify: '.catalog__block-cards',
}

// Собираем все спойлеры в массив
let spoilerGroup = [casesCardsSpoiler, catalogCardsSpoiler];

for (let i = 0; i < spoilerGroup.length; i++) {
    let spoilerGroupItem = spoilerGroup[i];
    
    // Проверка на то, есть ли этот элемент на странице
    if (spoilerGroupItem) {

        for (let i = 0; i < spoilerGroupItem.allCards.length; i++) {            
            let separateCard = spoilerGroupItem.allCards[i];
            
            if (i > 5) {                
                separateCard.classList.add('hidden');
            }
            if (spoilerGroupItem.allCards.length <= 6) {  
                if (spoilerGroupItem.showMoreButton) {
                    spoilerGroupItem.showMoreButton.style.display = "none";
                }
            }
        }
    
        if (spoilerGroupItem.showMoreButton) {
            spoilerGroupItem.showMoreButton.addEventListener('click', function() {               
                showMoreCards(spoilerGroupItem);
            });
        }
        
        if (spoilerGroupItem.showLessButton) {
            spoilerGroupItem.showLessButton.addEventListener('click', function() {
                showLessCards(spoilerGroupItem);
            });
        }
    }
}


function showMoreCards(spoilerGroupItem) {
    let allHiddenCards = document.querySelectorAll(`${spoilerGroupItem.categoryIdentify}._category-collection.active ._category-collection__item.hidden`);

    if (allHiddenCards.length != 0) {
        if (allHiddenCards.length > 4) {
            for (let i = 0; i < 4; i++) {
                let oneHiddenCard = allHiddenCards[i].classList.remove('hidden');
            }
        } else {
            allHiddenCards.forEach(item => {
                item.classList.remove('hidden');
            });
            spoilerGroupItem.showMoreButton.style.display = "none";
            spoilerGroupItem.showLessButton.classList.remove('hidden-button');
        }
    }
}

function showLessCards(spoilerGroupItem) {
    let currentCards = document.querySelectorAll(`${spoilerGroupItem.categoryIdentify}._category-collection.active ._category-collection__item`);

    for (let i = 0; i < currentCards.length; i++) {
        if ((currentCards.length - i) > 6) {
            let mustHiddenCard = currentCards[currentCards.length - (i + 1)].classList.add('hidden');
        }
    }

    spoilerGroupItem.showMoreButton.style.display = "block";
    spoilerGroupItem.showLessButton.classList.add('hidden-button');

    // Получаем координаты относительно верха документа
    let mustScrollTo = offset(document.querySelector(`${spoilerGroupItem.categoryIdentify}._category-collection.active`)).top;
    window.scrollTo({
        top: mustScrollTo - 350,
        behavior: "smooth"
    });
}

// Корректно получаем координаты объекта относительна документа
function offset(el) {
    const rect = el.getBoundingClientRect(),
        scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
        scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
}






