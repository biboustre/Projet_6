let projects = [];

fetch("http://localhost:5678/api/works")
  .then((res) => res.json())
  .then((data) => {
    projects = data;
    console.log("je suis 1er");
    displayGallery(projects);
  });

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

//boucle pour crre les bouttons
// for (let i = 0; i < 4; i++) {
//     const categorie = document.createElement('button');
//     categorie.className = 'select';
//     categorie.id = 'select' +i;
//     document.querySelector('.filter_travaux').appendChild(categorie);

// }

//Filtrer les travaux
function filtreCategory(id, datas) {
  if (id == 0) {
    return datas;
  }
  return datas.filter((data) => data.categoryId == id);
}

// mettre dynamique
let Categories = {
  0: "Tous",
  1: "Objets",
  2: "Appartements",
  3: "Hôtel & restaurants",
};

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

// for (let i = 0; i < lesCategorys.length; i++) {
//     const category = lesCategorys[i];
//     document.querySelector('#select').innerText = category;
//     console.log(category);
// }

// // nom des cat dans les  boutons
// document.querySelector("#select0").innerText = "Tous";
// document.querySelector("#select1").innerText = "Objets";
// document.querySelector("#select2").innerText = "Appartements";
// document.querySelector("#select3").innerText = "Hôtels & restaurants";

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

// envoi des données saisie dans la page de connexion
fetch("http://localhost:5678/users/login", {
  method: "POST",
  headers: { "Content-Type": "application/json", Authorization: "token" },
  body: {
    userId: 1,
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY5NTY1MDIzOCwiZXhwIjoxNjk1NzM2NjM4fQ.OxMUB8ctuWaJr-Q9T28pvtBdheG20jtuFR2vSaTsDic",
  },
});

const btnConnexion = document.querySelector("form");

btnConnexion.addEventListener("submit", function (event) {
  event.preventDefault();

  const connexion = {
    adresseMail: event.target.querySelector("[name=email]").value,
    password: event.target.querySelector("[name=mot_de_passe]").value,
  };

  const chargeUtile = JSON.stringify(connexion);

  fetch("http://localhost:5678/users/login", {
    method: "POST",
    headers: { "content-Type": "application/json" },
    body: chargeUtile,
  });
});

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

const closeModale = function (e) {
  if (modale === null) return;
  e.preventDefault();
  modale.style.display = "none";
  modale.setAttribute("aria-hidden", "true");
  modale.removeAttribute("aria-modale");
  // modale.removeEventListener('click', closeModale);é
  modale
    .querySelector(".js-close-modale")
    .removeEventListener("click", closeModale);
  modale
    .querySelector(".js-stop-modale")
    .removeEventListener("click", stopPropagation);
  modale = null;
};

//Ne ferme pas la modale quand on click dessus
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
