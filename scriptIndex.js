document.addEventListener('DOMContentLoaded', () => {

const form = document.getElementById('formClient');

form.addEventListener('submit',  function(event) {
    event.preventDefault(); // Empêche le rechargement de la page
    addCLient();
});

    async function addCLient() {

        const newCLient = {
            nom:form.nom.value,
            prenom:form.prenom.value,
            mail:form.mail.value
        };

        console.log(newCLient);


        try {
            const urlAddClient = await fetch("http://localhost:3000/api/ajoutClient", {
                method:"POST",
                body: JSON.stringify(newCLient)
            });

            const data = await urlAddClient.json();
            console.log("client ajouté", data);
            
        } catch (error) {
            console.error('Erreur lors de l\'ajout du client:', error);
            
        }
        
    }
});