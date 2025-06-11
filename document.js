document.addEventListener('DOMContentLoaded', () => {

    const form = document.getElementById('formDocument');



    // fonction tableau document
    async function loadDocuments(){
        try {
            const urlGetDocuments = await fetch("http://localhost:3000/api/documents");
            const data = await urlGetDocuments.json();
            const documentList = document.getElementById('documentList');
            console.log("Documents chargés:", data);

            data.documents.forEach(element => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                <td>${element.titre}</td>
                <td>${element.resume}</td>
                <td>${element.libelle}</td>
                <td>${element.annee}</td>
                <td>${element.dispo ? 'dispo' : 'indisponible'}</td>
                `;

                documentList.appendChild(tr);
                
            });

        } catch (error) {
            console.error('Erreur de chargement des documents:', error);
            
        }
    }

    // fonction remplissage select type modal
    async function loadType() {
    try {
      const urlGetType = await fetch("http://localhost:3000/api/type");
      console.log("urlGetType", urlGetType);

      const data = await urlGetType.json();

      //  console.log(data);
      const typeList = document.getElementById("selectType");

      data.forEach((key) => {
        const option = document.createElement("option");
        option.textContent = key.libelle;
        option.value = key.idType
        typeList.appendChild(option);

        //  console.log(key.prenom);
      });

      // console.log(data.clients);
    } catch (error) {
      console.error("erreur de chargement des types:", error);
    }
  }

  form.addEventListener('submit', async function(event) {
    event.preventDefault(); // Empêche le rechargement de la page
    await addDocument();
});

  async function addDocument(){
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
                body: JSON.stringify({titre, resume, date, idType})
        });

        loadDocuments();
        
    } catch (error) {
        console.error(error);
        
        
    }
  }
    loadDocuments(); // Appel initial pour charger les documents
    loadType();
});