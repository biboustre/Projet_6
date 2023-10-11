// //logique de connexion avec stockage du token dans local strorage
document.querySelector("#submit_JS").addEventListener("click", function (event) {
  event.preventDefault();
  //soumetre le formulaire en js a l'api avec fetch.
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      email: document.querySelector("#email_JS").value,
      password: document.querySelector("#password_JS").value,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

  let submitJs = document.querySelector('#submit_JS');
  let modEdit = document.querySelector('.mode_edition');
    
  submitJs.addEventListener('click', () => {
    if(getComputedStyle(modEdit).display != "none"){
      modEdit.style.display = "none";
    }else{
      modEdit.style.display = "block";
    }
  });

    
    

    fetch("http://localhost:5678/api/users/login", requestOptions)
      .then((response) => {
        if(response.status == 200){
          return response.json();
        }
        // Afficher l'erreur dans le html

      } )
      .then((result) => {
        //stockage du token dans le local storage
          localStorage.setItem(
           "token",
            result.token
          );
          
          //redirect vers la page d'accueil
          document.location.href = "index.html";
          console.log(result);
      })
      .catch((error) => {
        //styliser dans le html le message d'erreur
         console.log("error", error);
      });
      
    });





    
    
