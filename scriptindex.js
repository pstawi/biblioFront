document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById('forClient');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); //EMPECHE LE RECHARGEMENT DE LA PAGE
        addClient();
    });
       



  async function addClient() {
    const newClient ={
        nom: form.nom.value,
        prenom: form.prenom.value,
        mail: form.mail.value,
    }

    console.log(newClient);
try{
const urlAddClient = await fetch("https://localhost:3000/api/ajoutClient",
{method:"POST",
 body: JSON.stringify(newClient)
    
});

const data = await urlAddClient.json()
console.log("client ajout",data);

}catch (error) {
    console.error('Erreur lors de l\'ajout du client:', error);
}
  }

  });