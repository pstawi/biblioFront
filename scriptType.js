document.addEventListener('DOMContentLoaded', () => {
       async function loadTypes() {
         try {
            const urlGetTypes = await fetch("http://localhost:3000/api/type");
            console.log("urlGetTypes", urlGetTypes);
            
             const data = await urlGetTypes.json();

             console.log(data);
            const tableauType = document.getElementById('tableauType');

            data.forEach(key => {
                const tr = document.createElement('tr');
                tr.innerHTML = `<td>${key.idType}</td> 
                <td>${key.libelle}</td>
                <td><a style="cursor: pointer;" onclick="updateType(${key.idType})">🖊️</a> </td>`;
                tableauType.appendChild(tr);

                
               //  console.log(key.prenom);
            });
                     } catch (error) {
            console.error('erreur de chargement des types:', error);
         }

    }

    loadTypes();

    window.updateType = async function(idType) {
      // Fonction pour mettre à jour un type
      const libelle = prompt("Entrez le libellé :");
 
      try {
         await fetch("http://localhost:3000/api/updateType/" + idType, {
            method:"PUT",
            headers: {
               'Content-Type': 'application/json'
            },
            body:JSON.stringify({libelle})
         }
         );

         location.reload(); // Recharge la page pour mettre à jour la liste des clients
         
      } catch (error) {
         
      }
    }
});