document.addEventListener('DOMContentLoaded', () => {


       async function loadType() {
         try {
            const urlGetType = await fetch("http://localhost:3000/api/type");
            console.log("urlGetType", urlGetType);
            
            const data = await urlGetType.json();

            //  console.log(data);
            const typeList = document.getElementById('typeList');

            data.forEach(key => {

                const li = document.createElement('li');
                li.innerHTML = `${key.idType} ${key.libelle} 
                <button class="btn btn-primary" onclick="updateType(${key.idType})">Modifier</button>`;
                typeList.appendChild(li);
 
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

});