document.querySelectorAll('.accordion-item__description').forEach((item) => {
          const pattern = /(\[\[)([^\]\]]+)(\]\])(\s*<a[^>]*>(.*?)<\/a>|[^<]+)/g;
          const parser = new DOMParser();
    
          item.innerHTML = item.innerHTML.replace(pattern, (match, $1, $2, $3, $4) => {
             const tagname = $2.trim();
             const linkHTML = parser.parseFromString($4,'text/html');
             const link = linkHTML.body.children[0];
             
             switch(tagname) {
               case "image":
                   const image = `<img src="${link.href}" alt="${link.innerText}" />`;
                  
                   return image;
                   break;
               case "video":  
                   const video = `<video controls><source type="video/mp4" src="${link.href}"></source></video>`
                   return video;
               case "h1": 
                 return `<h1>${$4}</h1>`
               case "h2": 
                 return `<h2>${$4}</h2>`  
               case "h3": 
                 return `<h3>${$4}</h3>`   
               case "h4": 
                 return `<h4>${$4}</h4>`   
               case "h5": 
                 return `<h5>${$4}</h5>`
               case "h6": 
                 return `<h6>${$4}</h6>`   
               case "ul":
                 const items = $4.split("|").map(item => {
                     return `<li>${item}</li>`
                 }).join('');
                 const list = `
                     <ul>
                        ${items}
                     </ul>
                 `
                 return list
               case "ol":
                 const listItems = $4.split("|").map(item => {
                     return `<li>${item}</li>`
                 }).join('');
                 const orderedlist = `
                     <ol>
                        ${listItems}
                     </ol>
                 `
                 return orderedlist;
               case "table":
                 let tableString = `
                  <table>
                 `
                 const tableRows = $4.split(" / ");
                 tableRows.forEach(row => {
                   const tableRow = row.includes(' || ') ?  "th" : "td";
                   
                   tableString += `<tr>`;
                   if(tableRow === "th") {
                     row.split(' || ').forEach(th => {
                       tableString += `<th>${th}</th>`
                     });
                   }
                   else {
                     row.split(' | ').forEach(td => {
                       tableString += `<td>${td}</td>`
                     });
                   }
                   tableString += `</tr>`;
                 });
                 tableString += '</table>'
                 
                 return tableString;
               default: ''  
             }
        });
        item.querySelectorAll('p[style]').forEach(p => {
           if(!p.children.length) p.style.display = 'none';
        });
});
