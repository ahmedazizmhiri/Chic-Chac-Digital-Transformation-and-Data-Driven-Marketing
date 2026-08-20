document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');

    if (!form) {
        return;
    }

    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const submitButton = form.querySelector('button[type="submit"]');

    function clearError(input) {
        input.classList.remove('is-invalid');

        const existingError =
            input.parentNode.querySelector('.error-message');

        if (existingError) {
            existingError.remove();
        }
    }

    function showError(input, message) {
        clearError(input);

        const error = document.createElement('div');
        error.className = 'error-message text-danger';
        error.textContent = message;

        input.classList.add('is-invalid');
        input.parentNode.appendChild(error);
    }

    function validate() {
        let valid = true;

        if (!nameInput.value.trim()) {
            showError(nameInput, 'Le nom est obligatoire.');
            valid = false;
        } else {
            clearError(nameInput);
        }

        const email = emailInput.value.trim();

        if (!email) {
            showError(emailInput, "L'adresse e-mail est obligatoire.");
            valid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            showError(emailInput, 'Veuillez saisir une adresse e-mail valide.');
            valid = false;
        } else {
            clearError(emailInput);
        }

        if (!messageInput.value.trim()) {
            showError(messageInput, 'Le message est obligatoire.');
            valid = false;
        } else {
            clearError(messageInput);
        }

        return valid;
    }

    form.addEventListener('submit', event => {
        event.preventDefault();

        if (!validate()) {
            return;
        }

        const subject =
            encodeURIComponent(
                `Contact Chic Chac - ${nameInput.value.trim()}`
            );

        const body =
            encodeURIComponent(
                `Nom : ${nameInput.value.trim()}\n` +
                `Email : ${emailInput.value.trim()}\n\n` +
                `${messageInput.value.trim()}`
            );

        window.location.href =
            `mailto:contact@chic-chac.net?subject=${subject}&body=${body}`;
    });

    if (submitButton) {
        submitButton.textContent = "Préparer l'e-mail";
    }
});