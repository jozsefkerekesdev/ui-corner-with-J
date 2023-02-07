 [...document.querySelectorAll('.accordion-item__description')].forEach((item) => {
    [...item.querySelectorAll('a')].forEach((link) => {
        if(link.querySelector('strong')) {
            const imgSrc = link.href;
            const img = document.createElement('img');
            img.src = imgSrc;
            img.alt = link.querySelector('strong').innerText;
            link.replaceWith(img);
        }	
    })	
});