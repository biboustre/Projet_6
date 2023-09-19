 fetch('http://localhost:5678/api/works')
    .then(res => res.json())                        //transformer au format json
    .then(data => data.forEach(projet => {          //Récuperation des données et boucle pour inserer les travaux dans le HTML
        console.log(projet);
       let fig = document.createElement('figure');
       let img = document.createElement('img');
       img.src = projet.imageUrl;
       img.alt = projet.title;
       let description = document.createElement('figcaption');
       description.innerText = projet.title;
       fig.appendChild(img);
       fig.appendChild(description);
       document.querySelector('.gallery').appendChild(fig);
    }));




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




//filtrer les travaux
// const arrayResponse = await fetch('')
// const filterTous = document.querySelector('#select0');

// filterTous.addEventListener('click', function(){
//     const tous = 
// })


// fetch('http://localhost:5678/api/categories')
//     .then(res => res.json())
//     .then(data => data.forEach(category => {
//         console.log(category);
//         const tous = document.querySelector('#select0');
        
//     tous.addEventListener('click', function(){
//         const travauxFilter = category.filter(function(categories){
//         return categories.category >= 0;
//         console.log(travauxFilter);
//         })
//     })
// }))
























// for (let i = 0; i < 4; i++) {
//     const categorie = document.createElement('div');
//     categorie.className = 'select';
//     categorie.id = 'select' +i;
//     document.querySelector('.filter_travaux').appendChild(categorie);
// }


// let texte = document.createElement('p');
// texte.classList.add('texte');     
// document.querySelector('.select').appendChild(texte);      


//     let texte = document.createElement('p');
//     texte.classList.add('texte');
// document.querySelectorAll('.select').appendChild(texte);





// fetch('http://localhost:5678/api/works')
//     .then((res => res.json()))
//     .then((data => data.filter()))