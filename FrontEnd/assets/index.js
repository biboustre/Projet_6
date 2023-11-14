let projects = []; //Création d'un tableau vide qui recevra les données 

fetch("http://localhost:5678/api/works") //Requette GET à l'API pour récuperer les travaux 
  .then((res) => res.json()) //Récupération de la réponse transformé au format JSON
  .then((data) => {
    projects = data; //Insertion des données récupérer dans le tableau creer précèdement
    displayGallery(projects); //Affichage des travaux via la function "displayGallery"
  });


// Création de la galerry-------------------------------------------------------
function displayGallery(datas) {  //Création d'une function pour la création de la gallery
  document.querySelector(".gallery").innerHTML = "";  //Vider le bloc "gallert"
  datas.forEach((projet) => {   //Utilisation de la boucle forEach pour la création des élements de la gallerry
    let fig = document.createElement("figure"); 
    let img = document.createElement("img");
    img.src = projet.imageUrl;  //Récuperation de la source pour chaque images
    img.alt = projet.title;  
    let description = document.createElement("figcaption");
    description.innerText = projet.title; //Récuperation et insertion du titre de chacunes des image
    fig.appendChild(img);
    fig.appendChild(description);
    document.querySelector(".gallery").appendChild(fig);
  });
};











//Création des categories-------------------------------------------------
//Parent des differente categorys
let travauxFiltrer = document.createElement("div");
travauxFiltrer.classList.add("filter_travaux");
document.querySelector("#portfolio").appendChild(travauxFiltrer);



// Filtrer les travaux------------------------------------------------------
function filtreCategory(id, datas) {  //Création de la function qui permet de filtrer les travaux
  if (id == 0) {  //Condition qui permet d'afficher tout les travaux si l'id est égale à 0  DEMANDER CONFIRMATION à JULIEN--!!!----
    return datas;
  }
  return datas.filter((data) => data.categoryId == id); //les travaux s'affiche selon l'id inserer dans les boutons des filtres exemple : si je clique sur un btn qui représente l'id 1 les travaux comportant la categoryId 1 seront affiché
};


//Récuperer les categories dynamiquement-------------------------------------- 
let Categories = [];

fetch('http://localhost:5678/api/categories')
.then((res) => res.json())
.then((datas) => {
  Categories = datas;
  displayCategory(Categories);
});


//Création des button filtres
function displayCategory(datas) {
  datas.forEach((category) => {
    let cats = document.createElement('button');
    cats.classList.add('select');
    travauxFiltrer.appendChild(cats);
    cats.innerText = category.name;
    cats.dataset.id = category.id;    
    cats.addEventListener("click", function () {
      displayGallery(filtreCategory(this.dataset.id, projects)); 
    });
  });
};


// Creation du btn "TOUS"
let tous = document.createElement('button');
tous.classList.add('select');
travauxFiltrer.appendChild(tous);
tous.innerText = "Tous";

tous.addEventListener('click', () => {
  displayGallery(projects);
});














//Création de la gallery--------------------------------------------------------
let gallery = document.createElement("div");
gallery.classList.add("gallery");
document.getElementById("portfolio").appendChild(gallery);








//Ajout des balises <a> pour les liens de la <nav>-------------------------------
for (let i = 0; i < 4; i++) {
  const lien = document.createElement("a");
  document.querySelector("ul").appendChild(lien);
  const li = document.querySelector("li");
  lien.appendChild(li);
};













// //Affichage de la modale 1----------------------------------------------------
function openModale() {     //DEMANDER A JULIEN!!!!!!!!
  const target = document.querySelector("#modale");
  target.classList.remove("hidden");  //Suprime le hidden pour faire apparaitre la modale
  modale = target;
  modale.addEventListener("mousedown", closeModale); //Ferme la modale au click à l'éxtèrieur
  modale
    .querySelector(".js-close-modale")
    .addEventListener("click", closeModale); //Ferme la modale au click sur l'icon x
  modale
    .querySelector(".js-stop-modale")
    .addEventListener("mousedown", stopPropagation); //Empeche fermeture modale au click dessus
  imgModalGalerry(projects); //Affiche les img dans la modale
};




// Fermeture de la modale 1-----------------------------------------------------
const closeModale = function () {         //DEMANDER A JULIEN!!!!!!!!
  const target = document.querySelector("#modale");
  target.classList.add("hidden"); //Ajout du hidden pour faire disparaitre la modale
  modale.removeEventListener('click', closeModale);
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
let modalWrapper = document.querySelector(".modal_wrapper");
let modalGalerry = document.createElement("div");

modalWrapper.appendChild(modalGalerry);
modalGalerry.classList.add("modal_galerry");





//Modale numéro 2 pour ajout de photo-------------------------------------------
const openModale2 = function () {         
  closeModale();
  const target = document.querySelector("#modale_2");
  target.classList.remove("hidden");
  modale = target;
  modale.addEventListener("mousedown", closeModale2);
  modale
    .querySelector(".js-close-modale_2")
    .addEventListener("mousedown", closeModale2);
  modale
    .querySelector(".js-stop-modale_2")
    .addEventListener("mousedown", stopPropagation);
  imgModalGalerry(projects);
};




// Fermeture de la modale 2------------------------------------------------------
const closeModale2 = function (e) {       //DEMANDER A JULIEN!!!!!!!!
  const target = document.querySelector("#modale_2");
  target.classList.add("hidden");
  modale.removeEventListener('click', closeModale);
};



// //Ne ferme pas la modale quand on click dessus-------------------------------
const stopPropagation2 = function (e) {
  e.stopPropagation2();
};



//Lien qui ouvre la boîte modale  2---------------------------------------
document.querySelectorAll(".js-modale2").forEach((a) => {
  a.addEventListener("click", openModale2);
});

let btnReturnModal1 = document.querySelector(".return-modal-1");

btnReturnModal1.addEventListener("click", (e) => {
  closeModale2();
  openModale();
});





















// //Création des categories dans le formulaire d'envoie
let catsForm = [];

fetch('http://localhost:5678/api/categories')
.then((res) => res.json()) 
  .then((data) => {
    catsForm = data; 
    formCategory(catsForm); 
  });

let select = document.createElement('select');
select.classList.add('cat_js_modale');
document.querySelector('.form_modale_2').appendChild(select); 

// select.required;

  function formCategory(datas) {
    // let optionsDefault = document.createElement('option');
    //   select.appendChild(optionsDefault);
    //   optionsDefault.innerText = "Sélectionner une catégorie";
    datas.forEach((category) => {
      let options = document.createElement('option');
      select.appendChild(options);
      options.innerText = category.name;
      options.value = category.id;
      });
  };


  //Coloration du bouton "envoyer" dans le formulaire d'envoie de nouveau travaux
  document.querySelector('.form_modale_2').addEventListener('change', ()=>{
    if (document.querySelector('#title').value != "" & document.querySelector('#file').value != "") {
    document.querySelector('.btn_valider').style.backgroundColor = "blue";
  };
  });
  

















//Appartition et disparition des élément lors de la connexion-------------------------------
let modEdit = document.querySelector(".mode_edition");
let logoModif = document.querySelector("#logo_modif");

if (localStorage.getItem("token")) {
  modEdit.style.display = "flex";
  document.querySelector(".js-modale").style.display = "block";
  logoModif.style.display = "block";
}

let logout = document.querySelector(".logout");
let login = document.querySelector(".login");

if (localStorage.getItem("token")) {
  logout.style.display = "block";
  login.style.display = "none";
}




//Function pour se deconnecter du compte et effacer le contenu qui apparait seulement lors de la connexion--------------------
logout.addEventListener("click", function () {
  localStorage.removeItem("token");
  logout.style.display = "none";
  login.style.display = "block";
  modEdit.style.display = "none";
  document.querySelector(".js-modale").style.display = "none";
  logoModif.style.display = "none";
});




//Création de la gallery ds la modal en recupérant les img via l'API fetch, plus insertion des corbeilles pour la suppression des travaux
function imgModalGalerry(datas) {
  modalGalerry.innerHTML = "";
  datas.forEach((imgProjet) => {
    let parent_img = document.createElement("div");
    parent_img.classList.add("parent_img");
    parent_img.dataset.id = imgProjet.id;
    modalGalerry.appendChild(parent_img);
    let imgModal = document.createElement("img");
    imgModal.classList.add("img_modal_1");
    imgModal.src = imgProjet.imageUrl;
    imgModal.alt = imgProjet.title;
    parent_img.appendChild(imgModal);
    modalGalerry.appendChild(parent_img);
    let fondNoir = document.createElement("button");
    fondNoir.classList.add("fond_noir");
    parent_img.appendChild(fondNoir);
    fondNoir.style.border = "none";
    fondNoir.style.cursor = "pointer";
    let iconCorbeille = document.createElement("i");
    iconCorbeille.classList.add("fa-solid", "fa-trash-can");
    fondNoir.appendChild(iconCorbeille);
  });
};















// suprimer une photo-----------------------------------------------------------
modalGalerry.addEventListener("click", function (event) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));

  const requestOption = {
    method: "DELETE",
    headers: myHeaders,
    redirect: "follow",
  };

  if (event.target.classList.contains("fa-solid", "fa-trash-can")) { 
    const parent = event.target.parentElement.parentElement; 
    const imgId = parent.dataset.id;  

    fetch(`http://localhost:5678/api/works/${imgId}`, requestOption)
      .then(function (response) {
        if (response.ok) {
          for (let index = 0; index < projects.length; index++) {
           if (projects[index].id == imgId) {
            projects.splice(index, 1);
           }
          };
          displayGallery(projects);
          closeModale();
          
        } else {
          console.error("erreur supression");
        }
      })
      .catch(function (error) {
        console.error("erreur surpression", error);
      });
  };
});













function listenerAjoutPhoto() {
  const formModal = document.querySelector(".form_modale_2");
  formModal.addEventListener("submit", function (event) {
    event.preventDefault();

    const formData = new FormData();
    formData.append("image", document.querySelector("#file").files[0]);
    formData.append("title", document.querySelector("#title").value);
    formData.append("category", parseInt(document.querySelector(".cat_js_modale").value));
    formData.append("Content-Type", "multipart/form-data");
    
    const requestOptions = {
      method: "POST",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      },
      body: formData,
    };

    //Appel de la fonction fetch avec toutes les informations nécessaire
    fetch("http://localhost:5678/api/works", requestOptions)
    .then((res) => {
      if (res.status == 201) {
        return res.json();
      }
      //Affichage de l'erreur dans html
      else {
        document.querySelector("#erreur2").style.display = "block";
      }
    }).then((result) => {
      projects.push(result); 
      closeModale2(); 
      displayGallery(projects);
      
    });

  });
};
listenerAjoutPhoto();






//Function pour afficher l'image ajouter et effacer le contenu après l'ajout de l'image
function affichageImage() {
  const fileInput = document.getElementById('file'); 
  const file = fileInput.files[0];
  const imagePreviewContainer = document.getElementById('previewImageContainer');

  if (file.type.match('image.*')) {
    document.querySelector('#icon-photo').style.display = "none";
    document.querySelector('.label_file').style.display = "none";
    document.querySelector('.taille-img').style.display = "none";

    const reader = new FileReader(); 

    reader.addEventListener('load', function(event) { 
      const imageUrl = event.target.result;
      const image = new Image();

      image.addEventListener('load', function(){
        imagePreviewContainer.innerHTML = '';
        imagePreviewContainer.appendChild(image);
      });
      image.src = imageUrl;
      image.style.width = '129px'; 
      image.style.height = '169px';
    });
    reader.readAsDataURL(file); 
    }
  };
  

  