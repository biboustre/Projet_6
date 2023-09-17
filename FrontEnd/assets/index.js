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
       document.getElementById('gallery').appendChild(fig);
       
    }));



//Création des categories
let travauxFiltrer = document.createElement('div');
travauxFiltrer.classList.add('filter_travaux')
document.querySelector('#portfolio').appendChild(travauxFiltrer);



for (let i = 0; i < 4; i++) {
    const categorie = document.createElement('div');
    categorie.className = 'select';
    categorie.id = 'select' +i;
    document.querySelector('.filter_travaux').appendChild(categorie);
}


let texte = document.createElement('p');
texte.classList.add('texte');                                                   
texte.id = 'texte';
document.querySelectorAll('.select').appendChild(texte);      



// for (let i = 0; i < 4; i++) {
//     const categorie = document.createElement('div');
//     categorie.className = 'select';
//     categorie.id = 'select' +i;
//     document.querySelector('.filter_travaux').appendChild(categorie);
// }

//     let texte = document.createElement('p');
//     texte.classList.add('texte');
// document.querySelectorAll('.select').appendChild(texte);



// document.querySelector('texte').innerText = 'Tous';
// document.querySelector('texte').innerText = 'Objets';
// document.querySelector('texte').innerText = 'Appartements';
// document.querySelector('texte').innerText = 'Hôtels & restaurants';








    
// fetch('http://localhost:5678/api/works')
//     .then((res => res.json()))
//     .then((data => data.filter()))