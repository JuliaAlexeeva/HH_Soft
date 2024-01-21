
let selectField = document.querySelector('.select-field');
let selectItems = document.querySelectorAll('.select-field__item');

if (selectField) {
    selectField.addEventListener('click', function() {
        let currentDeviceWidth = window.innerWidth;
        if (currentDeviceWidth < 991) {
            this.classList.toggle('active');
        }
    });

    // При клике вне поля селект
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.select-field')) {
            selectField.classList.remove('active');
        }
    });

    selectItems.forEach(item => {
        item.addEventListener('click', selectChoose);
    });
}

// Функция выбора select item
function selectChoose() {
	// Записываем то значение, на которое кликнули
	let itemValue = this.innerText;    
	let currentValue = this.closest('.select-field').querySelector('.select-field__initial-value')
	// Заменяем значение на то, на которое кликнули
	currentValue.innerText = itemValue;
    // Закрытие произойдет через обработчик на документе, который не найдет ближайшего родителя select-field
    // при клике по пункту и убирет класс active
}