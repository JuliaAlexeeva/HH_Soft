// ! Counter for "statistic card" ==============================================
window.addEventListener('load', windowLoad);

function windowLoad() {
    function digitsCountersInit(digitsCountersItems) {
        let digitsCounters = digitsCountersItems ? digitsCountersItems : document.querySelectorAll("[data-digits-counter]");
        if (digitsCounters) {
            digitsCounters.forEach(digitsCounter => {
                digitsCountersAnimate(digitsCounter);
            });
        }
    }

    // Функция анимации
    function digitsCountersAnimate(digitsCounter) {
        let startTimestamp = null;
        // Скорость за которую мы перейдем от 0 до конечного значения
        const duration = parseInt(digitsCounter.dataset.digitsCounter) ? parseInt(digitsCounter.dataset.digitsCounter) : 1000;
        // тут получаем значение, то есть цифры
        const startValue = parseInt(digitsCounter.innerHTML);
        // Стартовая позиция от нуля
        const startPosition = 0;
        // Шаг анимации
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;

            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            digitsCounter.innerHTML = Math.floor(progress * (startPosition + startValue));

            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    // Запуск счетчика при загрузке страницы
    // digitsCountersInit();

    // при скролле и запуск анимции при отображении 30% от объекта
    let options = {
        // 30% от объекта должно отоброзиться, чтобы началась анимация счетчика
        threshold: 0.3
    }
    let observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const targetElement = entry.target;
                // из этого объекта получаем все элементы для анимации, содержащие данный атрибут
                const digitsCountersItems = targetElement.querySelectorAll("[data-digits-counter");
                // и если они есть, то вызываем функцию инициализации анимации, передавая эти элементы
                if (digitsCountersItems.length) {
                    digitsCountersInit(digitsCountersItems);
                }
                // отключить отслеживание после срабатывания
                observer.unobserve(targetElement);
            }
        });
    }, options);

    // получаем все объекты (блоки), в которых есть data атрибуты (внутри), нужный для анимации
    let sections = document.querySelectorAll('.statistic__block-card');
    if (sections.length) {
        sections.forEach(section => {
            // то передаем в функцию значения каждого объекта
            observer.observe(section);
        });
    }
}
