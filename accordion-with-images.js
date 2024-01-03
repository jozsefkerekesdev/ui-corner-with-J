 document.querySelectorAll('.accordion-item__description').forEach((item) => {
    item.querySelectorAll('a').forEach((link) => {
        if(link.querySelector('strong')) {
            const imgSrc = link.href;
            const img = document.createElement('img');
            img.src = imgSrc;
            img.alt = link.querySelector('strong').innerText;
            img.style.maxWidth = '100%';
            link.replaceWith(img);
        }	
    })	
});
