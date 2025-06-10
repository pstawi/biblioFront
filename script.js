document.addEventListener('DOMContentLoaded', () => {

   async function loadClients() {
         try {
            const urlGetClients = await fetch("http://localhost:3000/api/client");
            const data = await urlGetClients.json();
            const clientList = document.getElementById('clientList');

            data.clients.forEach(key => {
                const li = document.createElement('li');
                li.innerHTML = `${key.prenom} ${key.nom}`;
                clientList.appendChild(li);

                
                console.log(key.prenom);
            });

            // console.log(data.clients);
            
            
         } catch (error) {
            console.error('erreur de chargement des clients:', error);
         }

    }

    loadClients();


});