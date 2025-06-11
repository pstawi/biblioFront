
document.addEventListener("DOMContentLoaded", () => {
  async function loadClients() {
    try {
      const urlGetClients = await fetch("http://localhost:3000/api/clients");
      const data = await urlGetClients.json();
       console.log("Données reçues :", data);

      const clientsList = document.getElementById('clientsList');

      data.clients.forEach((key) => {
        const li = document.createElement('li');
        li.innerHTML = `${key.prenom} ${key.id} ${key.nom} 
                <a onclick="deleteClient(${key.id})">🗑️</a>
                <button class="btn btn-primary" onclick="updateClient(${key.id})">Modifier</button>`; // Utiliser backticks `...` et ${}
        clientsList.appendChild(li);
      });

    } catch (error) {
      console.error("Erreur chargement client :", error);
    }
  }
  

  // N'oublie pas d'appeler la fonction !
  loadClients();

 window.deleteClient = async function(idClient) {
      // Fonction pour supprimer un client
      const urlGetClientById = await fetch("http://localhost:3000/api/clients" + idClient);

      const clientData = await urlGetClientById.json();
      console.log("Client à supprimer:", clientData.client[0].prenom);
      // Confirmation de la suppression
      let confirmation = confirm(`Êtes-vous sûr de vouloir supprimer ce client (${clientData.client[0].prenom}) ?`);
      if(confirmation == true) {

         try {
            // requete selection client par id
            // requete  de suppression du client
            await fetch("http://localhost:3000/api/deleteClients/:id" + idClient,{
               method: "DELETE",
               headers: {
                  'Content-Type': 'application/json'
               }
            });
            alert("Client supprimé avec succès");

           location.reload(); // Recharge la page pour mettre à jour la liste des clients
            
         } catch (error) {
            console.error('Erreur lors de la suppression du client:', error);
            
         }
      }
      
    }

    window.updateClient = async function(idClient) {
      // Fonction pour mettre à jour un client
      const prenom = prompt("Entrez le nouveau prénom du client :");
      const nom = prompt("Entrez le nouveau nom du client :");
      const mail = prompt("Entrez le nouveau mail du client :");
      try {
         await fetch("http://localhost:3000/api/updateClients/:id" + idClient, {
            method:"PUT",
            headers: {
               'Content-Type': 'application/json'
            },
            body:JSON.stringify({ prenom, nom, mail })
         }
         );

         location.reload(); // Recharge la page pour mettre à jour la liste des clients
         
      } catch (error) {
         
      }
    }

});