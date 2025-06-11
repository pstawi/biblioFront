document.addEventListener('DOMContentLoaded', () => {

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

    loadDocuments(); // Appel initial pour charger les documents
});