document.addEventListener('DOMContentLoaded', () => {
    const productsContainer =
        document.getElementById('products-container');

    if (!productsContainer) {
        return;
    }

    const wrapper = document.createElement('div');
    wrapper.className = 'col-12 text-center';

    const message = document.createElement('div');
    message.className = 'product-demo-status';

    const title = document.createElement('h3');
    title.textContent = 'Catalogue frontend de démonstration';

    const description = document.createElement('p');
    description.textContent =
        'Le catalogue dynamique historique utilisait un backend qui ' +
        "n'est plus connecté à cette version du projet. " +
        "Aucune requête produit et aucune transaction ne sont effectuées.";

    message.appendChild(title);
    message.appendChild(description);
    wrapper.appendChild(message);
    productsContainer.appendChild(wrapper);
});