let projects = [];

fetch("http://localhost:5678/api/works")
  .then((res) => res.json())
  .then((data) => {
    projects = data;
    displayGallery(projects);
  });

  

// Création de la galerry-------------------------------------------------------
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







//Création des categories-------------------------------------------------
let travauxFiltrer = document.createElement("div");
travauxFiltrer.classList.add("filter_travaux");
document.querySelector("#portfolio").appendChild(travauxFiltrer);






// Filtrer les travaux------------------------------------------------------
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
  categorie.className = "select filter";
  categorie.dataset.id = category;
  categorie.addEventListener("click", function () {
    displayGallery(filtreCategory(this.dataset.id, projects));
  });
  document.querySelector(".filter_travaux").appendChild(categorie);
  categorie.style.cursor = "pointer";

}







//Création de la gallery--------------------------------------------------------
let gallery = document.createElement("div");
gallery.classList.add("gallery");
document.getElementById("portfolio").appendChild(gallery);








//Ajout des balise <a> pour les liens de la <nav>-------------------------------
for (let i = 0; i < 4; i++) {
  const lien = document.createElement("a");
  document.querySelector("ul").appendChild(lien);
  const li = document.querySelector("li");
  lien.appendChild(li);
}





//-------------------------------------------------------------------





//Affichage de la modale----------------------------------------------------
let modale = null;

const openModale = function (e) {
  e.preventDefault();
  const target = document.querySelector(e.target.getAttribute("href"));
  target.style.display = null;
  target.removeAttribute("aria-hidden");
  target.setAttribute("aria-modale", "true");
  modale = target;
  modale.addEventListener("mousedown", closeModale);
  modale
    .querySelector(".js-close-modale")
    .addEventListener("mousedown", closeModale);
  modale
    .querySelector(".js-stop-modale")
    .addEventListener("mousedown", stopPropagation);
  imgModalGalerry(projects);

};



// Fermeture de la modale-----------------------------------------------------
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




// //Ne ferme pas la modale quand on click dessus-------------------------------
const stopPropagation = function (e) {
  e.stopPropagation();

};


//Lien qui ouvre la boîte modale------------------------------------------------
document.querySelectorAll(".js-modale").forEach((a) => {
  a.addEventListener("click", openModale);
});


//Fermer les modales en appuyant sur Echap--------------------------------------
window.addEventListener("keydown", function (e) {
  if (e.key === "Escape" || e.key === "Esc") {
    closeModale(e);
    closeModale2(e);
  }
});



// Ajout des img des travaux dans la modale-------------------------------------
let modalWrapper = document.querySelector('.modal_wrapper');
let modalGalerry = document.createElement("div");

modalWrapper.appendChild(modalGalerry);
modalGalerry.classList.add("modal_galerry");





//Modale numéro 2 pour ajout de photo-------------------------------------------
let modale2 = null;
document.querySelector('.hidd').style.display = "none"; 

const openModale2 = function (e) {
  e.preventDefault();
  const target2 = document.querySelector(e.target.getAttribute("href"));
  target2.style.display = null;
  target2.removeAttribute("aria-hidden");
  target2.setAttribute("aria-modale", "true");
  modale2 = target2;
  modale2.addEventListener("mousedown", closeModale2);
  modale2
  .querySelector(".js-close-modale_2")
  .addEventListener("mousedown", closeModale2);
  modale2
  .querySelector(".js-stop-modale_2")
  .addEventListener("mousedown", stopPropagation);
};



// Fermeture de la modale------------------------------------------------------
const closeModale2 = function (e) {
  if (modale2 === null) return;
  e.preventDefault();
  modale2.style.display = "none";
  modale2.setAttribute("aria-hidden", "true");
  modale2.removeAttribute("aria-modale");
  // modale.removeEventListener('click', closeModale);
  modale2
  .querySelector(".js-close-modale_2")
  .removeEventListener("click", closeModale2);
  modale2
  .querySelector(".js-stop-modale_2")
  .removeEventListener("click", stopPropagation2);
  modale2 = null;
};


// //Ne ferme pas la modale quand on click dessus-------------------------------
const stopPropagation2 = function (e) {
  e.stopPropagation2();
};


//Lien qui ouvre la boîte modale  2---------------------------------------
document.querySelectorAll(".js-modale2").forEach((a) => {
  a.addEventListener("click", openModale2 /*function() {
    // document.querySelector('.modal').style.display = "none";
  }*/);
});





// -----------------------------------------------------------------------------

//Appartition des élément lors de la connexion-------------------------------
let modEdit = document.querySelector('.mode_edition');
if (localStorage.getItem('token')) {
  modEdit.style.display = "flex";
  document.querySelector('.js-modale').style.display = "block";

}



//Création de la gallery modal en recupérant les img de l'API & insertion des corbeilles
function imgModalGalerry(datas) {
  modalGalerry.innerHTML = "";
  datas.forEach((imgProjet) => {
    let parent_img = document.createElement('div');
    parent_img.classList.add('parent_img');
    parent_img.dataset.id = imgProjet.id;
    modalGalerry.appendChild(parent_img);
    let imgModal = document.createElement('img');
    imgModal.classList.add('img_modal_1');
    imgModal.src = imgProjet.imageUrl;
    imgModal.alt = imgProjet.title;
    parent_img.appendChild(imgModal);
    modalGalerry.appendChild(parent_img);
    let fondNoir = document.createElement('button');
    fondNoir.classList.add('fond_noir');
    parent_img.appendChild(fondNoir);
    fondNoir.style.border = "none";
    fondNoir.style.cursor = "pointer";
    let iconCorbeille = document.createElement('i');
    iconCorbeille.classList.add('fa-solid', 'fa-trash-can');
    fondNoir.appendChild(iconCorbeille);
   
  })

};




// suprimer une photo-----------------------------------------------------------
modalGalerry.addEventListener('click', function(event){
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  myHeaders.append("Authorization", "Bearer " + localStorage.getItem('token'));


  const requestOption = {
    method: 'DELETE',
    headers: myHeaders,
    redirect: 'follow',
  }

  if(event.target.classList.contains('fa-solid', 'fa-trash-can')) {
    const parent = event.target.closest('div');
    const imgId = parent.dataset.id; 
    fetch(`http://localhost:5678/api/works/${imgId}`, requestOption)
    .then(function(response) {
      if(response.ok){
        imgModalGalerry(projects);
      }else{
        console.error('erreur supression');
      }
    })
    .catch(function(error){
      console.error('erreur surpression', error);
    });
  }
});



// ==========================================================================






// Ajout photos
// let btnValider = document.querySelector('.btn_valider');

// btnValider.addEventListener('click', function(event){
//   event.preventDefault();
// const myHeaders = new Headers();
// myHeaders.append("Content-Type", "application/json");
// myHeaders.append("Authorization", "Bearer" + localStorage.getItem('token'));



// const requestOptions = {
//   method: 'POST',
//   headers: myHeaders,
  // body: JSON.stringify({
  //   title: document.querySelector('#title').value,
  //   id: document.querySelector('#categories').value,
  // }),
//   redirect: 'follow',
// };

//  fetch("http://localhost:5678/api/works", requestOptions, {
//   body: JSON.stringify({
//     imageUrl: document.querySelector('#file').value,
//     title: document.querySelector('#title').value,
//     id: document.querySelector('#categories').value,
//   })
//  })

// // .then((response) => response.json())
// // .then((json) => console.log(json)) 
// .then(function(response){
//     if(response.ok){
//       imgModalGalerry(projects);
//     }else{
//       console.error("erreur lors de l'ajout");
//     }
//   })
// })
  

  // .then(result => console.log(result))
  // .catch(error => console.log('error', error));
// })


//Essaie n°2 ajout photo
function listenerAjoutPhoto(){
  const formModal = document.querySelector('.form_modale_2');
    formModal.addEventListener('submit', function(event){
      event.preventDefault();

      const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Bearer" + localStorage.getItem('token'));

      const newPhoto = {
        imageUrl: parseInt(event.target.querySelector('#file').value),
        title: event.target.querySelector('#title').value,
        id: event.target.querySelector('#categories').value,
      };

    //Création de la charge utile au format JSON
    const chargeUtile = JSON.stringify(newPhoto);
    //Appel de la fonction fetch avec toutes les informations nécessaire
    fetch('http://localhost:5678/api/works',  {
      method: "POST",
      Headers: myHeaders,
      body: chargeUtile,
    });

  })
};

listenerAjoutPhoto();








