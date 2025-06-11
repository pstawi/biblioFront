document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formType");

  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Empêche le rechargement de la page
    addType();
  });

  loadType();

  async function addType() {
    const newType = {
      libelle: form.libelle.value,
    };

    console.log(newType);

    try {
      const urlAddType = await fetch("http://localhost:3000/api/addType", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newType),
      });

      const data = await urlAddType.json();
      console.log("type ajouté", data);
    } catch (error) {
      console.error("Erreur lors de l'ajout du type:", error);
    }
  }

  async function loadType() {
    try {
      const urlGetType = await fetch("http://localhost:3000/api/type");
      console.log("urlGetType", urlGetType);

      const data = await urlGetType.json();

      //  console.log(data);
      const typeList = document.getElementById("typeList");

      data.forEach((key) => {
        const li = document.createElement("li");
        li.innerHTML = `${key.idType} ${key.libelle} 
                <button class="btn btn-danger" onclick="deleteType(${key.idType})">Supprimer</button>
                <button class="btn btn-primary" onclick="updateType(${key.idType})">Modifier</button>`;
        typeList.appendChild(li);

        //  console.log(key.prenom);
      });

      // console.log(data.clients);
    } catch (error) {
      console.error("erreur de chargement des types:", error);
    }
  }

  window.deleteType = async function(idType) {

      // Confirmation de la suppression
      let confirmation = confirm(`Êtes-vous sûr de vouloir supprimer ce type ?`);
      if(confirmation == true){

         try {
            // requete selection type par id
            // requete  de suppression du type
            await fetch("http://localhost:3000/api/deleteType/" + idType,{
               method: "DELETE",
               header: {
                  'Content-Type': 'application/json'
               }
            });
            alert("Type supprimé avec succès");

           location.reload(); // Recharge la page pour mettre à jour la liste des clients
            
         } catch (error) {
            console.error('Erreur lors de la suppression du type:', error);
            
         }
      }
      
    }

  window.updateType = async function(idType) {

    const libelle = prompt("nouveau type ?");

    console.log(JSON.stringify({libelle}))

    try {

      await fetch("http://localhost:3000/api/updateType/" + idType,{
        method: "PUT",
        headers: {
                  'Content-Type': 'application/json'
               },
        body: JSON.stringify({libelle}),
              }              
      );

      location.reload();
      
    } catch (error) {
      console.error(error);
      
    }

  }
    
});