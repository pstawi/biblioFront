document.addEventListener('DOMContentLoaded', () => {

const form = document.getElementById('formClient');
const formType = document.getElementById('formType')

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
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newCLient)
            });

            const data = await urlAddClient.json();
            console.log("client ajouté", data);
            
        } catch (error) {
            console.error('Erreur lors de l\'ajout du client:', error);
            
        }
        
    };

    formType.addEventListener('submit',  function(event) {
    event.preventDefault(); // Empêche le rechargement de la page
    addType();
});

    async function addType() {

        const newType = {
            libelle:formType.libelle.value,
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

            const dataType = await urlAddType.json();
            console.log("type ajouté", dataType);
            
        } catch (error) {
            console.error('Erreur lors de l\'ajout du type:', error);
            
        }
        
    }
});