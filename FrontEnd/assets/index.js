let projects = [];

fetch("http://localhost:5678/api/works")
  .then((res) => res.json())
  .then((data) => {
    projects = data;
    console.log("je suis 1er");
    displayGallery(projects);
  });

  
// Création de la galerry
function displayGallery(datas) {
  document.querySelector(".gallery").innerHTML = "";
  datas.forEach((projet) => {
    let fig = document.createElement("figure");
    let img = document.createElement("img");
    img.src = projet.imageUrl;
    img.alt = projet.title;
    let description = document.createElement("figcaption");
    description.innerText = projet.title;
    fig.appendChild(img);
    fig.appendChild(description);
    document.querySelector(".gallery").appendChild(fig);

  });
}

console.log("je suis 2ème");





//Création des categories
let travauxFiltrer = document.createElement("div");
travauxFiltrer.classList.add("filter_travaux");
document.querySelector("#portfolio").appendChild(travauxFiltrer);





// Filtrer les travaux
function filtreCategory(id, datas) {
  if (id == 0) {
    return datas;
  }
  return datas.filter((data) => data.categoryId == id);
}


let Categories = {
  0: "Tous",
  1: "Objets",
  2: "Appartements",
  3: "Hôtel & restaurants",
};

// let Categories = fetch("http://localhost:5678/api/categories")
//     .then((res) => res.json()
//     .then((data) => {

//     } )
// );

// console.log(Categories);

for (category in Categories) {
  const categorie = document.createElement("button");
  categorie.innerText = Categories[category];
  categorie.className = "select fliter";
  categorie.dataset.id = category;
  categorie.addEventListener("click", function () {
    displayGallery(filtreCategory(this.dataset.id, projects));
  });
  document.querySelector(".filter_travaux").appendChild(categorie);
}







//Création de la gallery
let gallery = document.createElement("div");
gallery.classList.add("gallery");
document.getElementById("portfolio").appendChild(gallery);







//Ajout des balise <a> pour les liens de la <nav>
for (let i = 0; i < 4; i++) {
  const lien = document.createElement("a");
  document.querySelector("ul").appendChild(lien);
  const li = document.querySelector("li");
  lien.appendChild(li);
}





//Affichage de la modale---------------------------
let modale = null;

const openModale = function (e) {
  e.preventDefault();
  const target = document.querySelector(e.target.getAttribute("href"));
  target.style.display = null;
  target.removeAttribute("aria-hidden");
  target.setAttribute("aria-modale", "true");
  modale = target;
  modale.addEventListener("click", closeModale);
  modale
    .querySelector(".js-close-modale")
    .addEventListener("click", closeModale);
  modale
    .querySelector(".js-stop-modale")
    .addEventListener("click", stopPropagation);
};



// Fermeture de la modale---------------------------
const closeModale = function (e) {
  if (modale === null) return;
  e.preventDefault();
  modale.style.display = "none";
  modale.setAttribute("aria-hidden", "true");
  modale.removeAttribute("aria-modale");
  // modale.removeEventListener('click', closeModale);
  modale
    .querySelector(".js-close-modale")
    .removeEventListener("click", closeModale);
  modale
    .querySelector(".js-stop-modale")
    .removeEventListener("click", stopPropagation);
  modale = null;
};





// //Ne ferme pas la modale quand on click dessus
const stopPropagation = function (e) {
  e.stopPropagation();
};


//Lien qui ouvre la boîte modale
document.querySelectorAll(".js-modale").forEach((a) => {
  a.addEventListener("click", openModale);
});


//Fermer la modale en appuyant sur Echap
window.addEventListener("keydown", function (e) {
  if (e.key === "Escape" || e.key === "Esc") {
    closeModale(e);
  }
});




//Création de la gallery modal en recupérant les img de l'API
let imgProjects = [];

fetch("http://localhost:5678/api/works")
.then((res) => res.json())
  .then((data) => {
    imgProjects = data;
    imgModalGalerry(imgProjects);
  })


function imgModalGalerry(datas) {
  datas.forEach((imgProjet) => {
    let img = document.createElement('img');
    img.src = imgProjet.imageUrl;
    img.alt = imgProjet.title;
    document.querySelector('.modal_galerry').appendChild(img);
  })
}

// Ajout des img des travaux dans la modale
let modalWrapper = document.querySelector('.modal_wrapper');
let modalGalerry = document.createElement("div");

modalWrapper.appendChild(modalGalerry);
modalGalerry.classList.add("modal_galerry");


// Création du bouton de la modal 
// let btnModal = document.createElement('button');
// btnModal.classList.add('btn_modal');
// modalWrapper.appendChild(btnModal).innerText = "Ajouter une photo";





