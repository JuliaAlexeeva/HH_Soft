let stepsBlock = document.querySelector('.steps__block');
let stepsTitleBlock = document.querySelector('.steps__block-title');
let stepsTitleBlockFixed = document.querySelector('.steps__block-title.fixed');
let stepsItems = document.querySelectorAll('.steps__block-item');

document.addEventListener('scroll', function() {
    let currentDeviceWidth = window.innerWidth;

    if (currentDeviceWidth > 991) {
        if (stepsBlock && stepsItems.length > 0) {
            if (stepsBlock.getBoundingClientRect().top > 100) {
                stepsTitleBlockFixed.style.opacity = '0';
                stepsTitleBlockFixed.style.visibility = 'hidden';
                stepsTitleBlock.style.opacity = '1';
                stepsTitleBlock.style.visibility = 'visible';
                return;
            } else {
                stepsTitleBlock.style.opacity = '0';
                stepsTitleBlock.style.visibility = 'hidden';
                stepsTitleBlockFixed.style.opacity = '1';
                stepsTitleBlockFixed.style.visibility = 'visible';
                stepsTitleBlockFixed.style.top = '100px';
                stepsTitleBlockFixed.style.left = `${stepsBlock.getBoundingClientRect().left}`;
            }
            stepsItems.forEach(item => {
                if (item.getBoundingClientRect().top < 200) {    
                    stepsItems.forEach(item => {
                        item.classList.remove('active');
                    });
                    item.classList.add('active');
                } else {
                    item.classList.remove('active');
                } 
            });

            let lastStepsItem = document.querySelector('.steps__block-item._last.active');
            if (lastStepsItem && lastStepsItem.getBoundingClientRect().top < 120) {
                stepsTitleBlockFixed.style.top = '-50%';
                stepsTitleBlockFixed.style.opacity = '0';
                stepsTitleBlockFixed.style.visibility = 'hidden';
            }
        }
    }
});