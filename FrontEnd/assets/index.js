 let projects = [];

fetch('http://localhost:5678/api/works')
    .then(res => res.json())
    .then((data) => {
        projects = data;
        console.log("je suis 1er");
        displayGallery(projects);
    }) 


function displayGallery(datas){
    document.querySelector('.gallery').innerHTML = "";
    datas.forEach(projet => { 
       let fig = document.createElement('figure');
       let img = document.createElement('img');
       img.src = projet.imageUrl;
       img.alt = projet.title;
       let description = document.createElement('figcaption');
       description.innerText = projet.title;
       fig.appendChild(img);
       fig.appendChild(description);
       document.querySelector('.gallery').appendChild(fig);
    })
}

console.log("je suis 2ème");



//Création des categories
let travauxFiltrer = document.createElement('div');
travauxFiltrer.classList.add('filter_travaux')
document.querySelector('#portfolio').appendChild(travauxFiltrer);


for (let i = 0; i < 4; i++) {
    const categorie = document.createElement('button');
    categorie.className = 'select';
    categorie.id = 'select' +i;
    document.querySelector('.filter_travaux').appendChild(categorie);
    
}


// let lesCategorys = ["Tous", "Objets", "Appartements", "Hôtel & restaurants"]; 

// for (let i = 0; i < lesCategorys.length; i++) {
//     const category = lesCategorys[i];
//     document.querySelector('#select').innerText = category;
//     console.log(category);
// }


document.querySelector('#select0').innerText = 'Tous';
document.querySelector('#select1').innerText = 'Objets';
document.querySelector('#select2').innerText = 'Appartements';
document.querySelector('#select3').innerText = 'Hôtels & restaurants';



//Création de la gallery
let gallery = document.createElement('div');
gallery.classList.add('gallery');
document.getElementById('portfolio').appendChild(gallery);


//Filtrer les travaux
function filtreCategory(id, datas){
    return datas.filter((data) => data.categoryId == id)
};

const tousFilter = document.querySelector('#select0');

tousFilter.addEventListener('click', function() {
    const travauxFiltres = projects.filter(function(project) {
        return project.categoryId <= 3;
    })
    console.log(travauxFiltres);
});


/**************************************************************/
const objetFilter = document.querySelector('#select1');

objetFilter.addEventListener('click', function() {
    const travauxFiltres = projects.filter(function(project) {
        return project.categoryId == 1;
    })
    console.log(travauxFiltres);
});


/**************************************************************/
const appartementFilter = document.querySelector('#select2');

appartementFilter.addEventListener('click', function() {
    const travauxFiltres = projects.filter(function(project) {
        return project.categoryId == 2;
    })
    console.log(travauxFiltres);
});


/**************************************************************/
const hotelRestoFilter = document.querySelector('#select3');

hotelRestoFilter.addEventListener('click', function() {
    const travauxFiltres = projects.filter(function(project) {
        return project.categoryId == 3;
    })
    console.log(travauxFiltres);
});

// const categ1 = .
// const categ2 = projects.filter(function(project) {
//     return 
//  });
// const categ3 = projects.filter(function(project) {
//     return 
//  });
// const categ4 = projects.filter(function(project) {
//     return 
//  });



//Ajout des balise <a> pour les liens de la <nav>
for (let i = 0; i < 4; i++) {
   const lien = document.createElement('a');
   document.querySelector('ul').appendChild(lien);
   const li = document.querySelector('li');
   lien.appendChild(li);   
}