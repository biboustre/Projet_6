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

//Boucle for pour créer les bouttons des differente categories
for (category in Categories) {
  const categorie = document.createElement("button");
  categorie.innerText = Categories[category];
  categorie.className = "select filter";
  categorie.dataset.id = category;
  categorie.addEventListener("click", function () {
    displayGallery(filtreCategory(this.dataset.id, projects));
  });

  travauxFiltrer.appendChild(categorie);
  categorie.style.cursor = "pointer";
};


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
}

//-------------------------------------------------------------------

//Affichage de la modale----------------------------------------------------
function openModale() {
  const target = document.querySelector("#modale");
  target.classList.remove("hidden");
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
}

// Fermeture de la modale-----------------------------------------------------
const closeModale = function () {
  const target = document.querySelector("#modale");
  target.classList.add("hidden");
  target.setAttribute("aria-hidden", "true");
  target.removeAttribute("aria-modale");
  // modale.removeEventListener('click', closeModale);
  target
    .querySelector(".js-close-modale")
    .removeEventListener("click", closeModale);
  target
    .querySelector(".js-stop-modale")
    .removeEventListener("click", stopPropagation);
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
let modale2 = null;

const openModale2 = function () {
  closeModale();
  const target = document.querySelector("#modale_2");
  target.classList.remove("hidden");
  target.removeAttribute("aria-hidden");
  target.setAttribute("aria-modale", "true");
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

// Fermeture de la modale------------------------------------------------------
const closeModale2 = function (e) {
  const target = document.querySelector("#modale_2");
  target.classList.add("hidden");
  target.setAttribute("aria-hidden", "true");
  target.removeAttribute("aria-modale");
  // modale.removeEventListener('click', closeModale);
  target
    .querySelector(".js-close-modale_2")
    .removeEventListener("click", closeModale);
  target
    .querySelector(".js-stop-modale_2")
    .removeEventListener("click", stopPropagation);
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
  //btnReturnModal1.innerHTML = openModale;
  closeModale2();
  openModale();
});

// -----------------------------------------------------------------------------

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

//Création de la gallery modal en recupérant les img de l'API & insertion des corbeilles---------------------------------
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
}

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
    const parent = event.target.closest("div");
    const imgId = parent.dataset.id;

    fetch(`http://localhost:5678/api/works/${imgId}`, requestOption)
      .then(function (response) {
        if (response.ok) {
          imgModalGalerry(projects);
        } else {
          console.error("erreur supression");
        }
      })
      .catch(function (error) {
        console.error("erreur surpression", error);
      });
  }
});

// ==========================================================================


//Essaie n°2 ajout photo
// function listenerAjoutPhoto() {
//   const formModal = document.querySelector(".form_modale_2");
//   formModal.addEventListener("submit", function (event) {
//     event.preventDefault();

//     const myHeaders = new Headers();
//     myHeaders.append("Content-Type", "multipart/form-data");
//     myHeaders.append("accept", "application/json");
//     myHeaders.append(
//       "Authorization",
//       "Bearer " + localStorage.getItem("token")
//     );
//     // console.log(localStorage.getItem("token"));

//     const newPhoto = {
//       image: event.target.querySelector("#file").value,
//       title: event.target.querySelector("#title").value,
//       category: parseInt(event.target.querySelector("#categories").value),
//     };

   
//     const requestOptions = {
//       method: "POST",
//       headers: myHeaders,
//       body: newPhoto,
//     };

//     //Appel de la fonction fetch avec toutes les informations nécessaire
//     fetch("http://localhost:5678/api/works", requestOptions).then((res) => {
//       if (res.status == 201) {
//         return res.json();
//       }
//       //Affichage de l'erreur dans html
//       else {
//         document.querySelector("#erreur2").style.display = "block";
         
//       }
//     });
//   });
// };


function listenerAjoutPhoto() {
  const formModal = document.querySelector(".form_modale_2");
  formModal.addEventListener("submit", function (event) {
    event.preventDefault();

    const formData = new formData();
    formData.append({
      image: event.target.querySelector("#file").file[0],
      title: event.target.querySelector("#title").value,
      category: parseInt(event.target.querySelector("#categories").value),
    });
    formData.append( "multipart/form-data");
    // formData.append("accept", "application/json");
    // formData.append();
    // console.log(localStorage.getItem("token"));

    // const newPhoto = {
      // image: event.target.querySelector("#file").value,
      // title: event.target.querySelector("#title").value,
      // category: parseInt(event.target.querySelector("#categories").value),
    // };

   
    const requestOptions = {
      method: "POST",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      },
      body: formData,
    };

    //Appel de la fonction fetch avec toutes les informations nécessaire
    fetch("http://localhost:5678/api/works", requestOptions).then((res) => {
      if (res.status == 201) {
        return res.json();
      }
      //Affichage de l'erreur dans html
      else {
        document.querySelector("#erreur2").style.display = "block";
         
      }
    });
  });
}


listenerAjoutPhoto();


//NE PAS OUBLIER CHANGEMENT DE COULEUR BTN VALIDER AVEC DISABLED 

//------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------


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
  

  