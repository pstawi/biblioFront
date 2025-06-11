document.addEventListener('DOMContentLoaded', () => {


       async function loadType() {
         try {
            const urlGetType = await fetch("http://localhost:3000/api/type");
            // console.log("urlGetType", urlGetType);
            
            const data = await urlGetType.json();

            //  console.log(data);
            const typeList = document.getElementById('typeList');

            data.forEach(key => {

                const tr = document.createElement('tr');

                tr.innerHTML = `
                <td>${key.idType}</td>
                <td>${key.libelle}</td>
                <td><a style="cursor: pointer;" onclick="updateType(${key.idType})">✏️</a></td>`;

                typeList.appendChild(tr);
 
               //  console.log(key.libelle);

            });

            // console.log(data);
               
         } catch (error) {

            console.error('erreur de chargement des types:', error);

         }

    }

    loadType(); // Appel initial pour charger les libelles


    window.updateType = async function(idType) {
      // Fonction pour mettre à jour un libelle
      const libelle = prompt("Entrez le nouveau libelle :");

      try {

         await fetch("http://localhost:3000/api/updateType/" + idType, {
            method:"PUT",
            headers: {

               'Content-Type': 'application/json'

            },

            body:JSON.stringify({ libelle })

         });

            location.reload(); // Recharge la page pour mettre à jour la liste des clients
         
        } catch (error) {
         
        }
    }

    const form = document.getElementById('formType');

    form.addEventListener('submit',  function(event) {
    event.preventDefault(); // Empêche le rechargement de la page
    addType();
});

    async function addType() {

        const newType = {

         libelle:form.libelle.value,

        };

        console.log(newType);

        try {

            const urlAddType = await fetch("http://localhost:3000/api/addType", {
                method:"POST",
                headers: {

                  'Content-Type': 'application/json'
                },

                body: JSON.stringify(newType)

               });
               
               console.log(urlAddType)
            const data = await urlAddType.json();

            console.log("add Type", data);
            
            location.reload()

        } catch (error) {
            console.error('Erreur lors de l\'ajout du Type:', error);
            
        }
        
    }
});
