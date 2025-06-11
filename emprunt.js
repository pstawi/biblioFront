document.addEventListener('DOMContentLoaded', () => {

    const form = document.getElementById('formEmprunt');

    // fonction tableau emprunt

    async function loadEmprunt() {

        try {

            const urlGetEmprunt = await fetch("http://localhost:3000/api/emprunt");

            const data = await urlGetEmprunt.json();

            const tableauEmprunt = document.getElementById('tableauEmprunt');

            console.log("Emprunt chargés:", data);

            data.emprunts.forEach(element => {

                const tr = document.createElement('tr');

                tr.innerHTML = `
                <td>${element.nom}</td>
                <td>${element.prenom}</td>
                <td>${element.libelle}</td>
                <td>${element.dateEmprunt}</td>
                <td>${element.dateRetour}</td>
                `;

                tableauEmprunt.appendChild(tr);

            });

        } catch (error) {

            console.error('Erreur de chargement des documents:', error);

        }

    }

    // fonction remplissage select type modal
    // async function loadType() {

    //     try {

    //         const urlGetType = await fetch("http://localhost:3000/api/type");

    //         console.log("urlGetType", urlGetType);

    //         const data = await urlGetType.json();

    //         //  console.log(data);
    //         const typeList = document.getElementById("selectType");

    //         data.forEach((key) => {

    //             const option = document.createElement("option");

    //             option.textContent = key.libelle;
    //             option.value = key.idType
    //             typeList.appendChild(option);

    //         });

    //         const urlGetclient = await fetch("http://localhost:3000/api/client);

    //         console.log("urlGetType", urlGetType);

    //         const data = await urlGetType.json();

    //         //  console.log(data);
    //         const typeList = document.getElementById("selectType");

    //         data.forEach((key) => {

    //             const option = document.createElement("option");

    //             option.textContent = key.libelle;
    //             option.value = key.idType
    //             typeList.appendChild(option);

    //             //  console.log(key.prenom);
    //         });

    //         // console.log(data.clients);

    //     } catch (error) {

    //         console.error("erreur de chargement des types:", error);
    //     }
    // }

    // form.addEventListener('submit', async function (event) {

    //     event.preventDefault(); // Empêche le rechargement de la page
    //     await addDocument();

    // });

    async function addDocument() {

        const titre = document.getElementById('titre').value;
        const resume = document.getElementById('resume').value;
        const date = document.getElementById('date').value;
        const idType = document.getElementById('selectType').value;

        console.log(titre, resume, date, idType);

        try {

            const urlAddDocument = await fetch('http://localhost:3000/api/addDocument', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ titre, resume, date, idType })
            });

            loadDocuments();

        } catch (error) {
            console.error(error);


        }
    }

    loadEmprunt();
});
