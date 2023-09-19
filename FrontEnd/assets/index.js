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
console.log(projects);

const cat1 = projects.filter(function(project) {
   return project;
});

function filtreCategory(id, datas){
    return datas.filter((data) => data.categoryId == id)
}



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

document.querySelector('#select0').innerText = 'Tous';
document.querySelector('#select1').innerText = 'Objets';
document.querySelector('#select2').innerText = 'Appartements';
document.querySelector('#select3').innerText = 'Hôtels & restaurants';


let gallery = document.createElement('div');
gallery.classList.add('gallery');
document.getElementById('portfolio').appendChild(gallery);

