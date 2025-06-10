
document.addEventListener("DOMContentLoaded", () => {
  async function loadClients() {
    try {
      const urlGetClients = await fetch("http://localhost:3000/api/clients");
      const data = await urlGetClients.json();
       console.log("Données reçues :", data);

      const clientsList = document.getElementById('clientsList');

      data.clients.forEach((key) => {
        const li = document.createElement('li');
        li.innerHTML = `${key.prenom} ${key.nom}`; // Utiliser backticks `...` et ${}
        clientsList.appendChild(li);
      });

    } catch (error) {
      console.error("Erreur chargement client :", error);
    }
  }

  // N'oublie pas d'appeler la fonction !
  loadClients();
});
