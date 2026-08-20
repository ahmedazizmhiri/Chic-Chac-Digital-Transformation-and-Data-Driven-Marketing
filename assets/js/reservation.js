document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('reservation-form');
    const dateInput = document.getElementById('date');
    const hourInput = document.getElementById('hour');
    const minuteInput = document.getElementById('minute');
    const phoneInput = document.getElementById('phone');

    if (!form || !dateInput || !hourInput || !minuteInput || !phoneInput) {
        return;
    }

    function toLocalDate(value) {
        const [year, month, day] = value
            .split('-')
            .map(Number);

        return new Date(year, month - 1, day);
    }

    function formatDate(date) {
        return [
            date.getFullYear(),
            String(date.getMonth() + 1).padStart(2, '0'),
            String(date.getDate()).padStart(2, '0')
        ].join('-');
    }

    function showMessage(type, message) {
        const modal = document.getElementById('reservationModal');
        const title =
            document.getElementById('reservationModalLabel');
        const body =
            document.getElementById('reservationModalBody');

        if (!modal || !title || !body) {
            alert(message);
            return;
        }

        title.textContent =
            type === 'error'
                ? 'Erreur'
                : 'Démonstration frontend';

        body.textContent = message;

        if (
            window.jQuery &&
            typeof window.jQuery.fn.modal === 'function'
        ) {
            window.jQuery(modal).modal('show');
            return;
        }

        modal.style.display = 'block';
        modal.classList.add('show');
    }

    function validateDate() {
        if (!dateInput.value) {
            return false;
        }

        const selectedDate =
            toLocalDate(dateInput.value);

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (selectedDate < today) {
            dateInput.value = '';

            showMessage(
                'error',
                "Veuillez sélectionner une date à partir d'aujourd'hui."
            );

            return false;
        }

        return true;
    }

    function validateTime() {
        if (
            !dateInput.value ||
            !hourInput.value ||
            !minuteInput.value
        ) {
            return false;
        }

        const selectedDate =
            toLocalDate(dateInput.value);

        const now = new Date();

        if (
            selectedDate.getFullYear() === now.getFullYear() &&
            selectedDate.getMonth() === now.getMonth() &&
            selectedDate.getDate() === now.getDate()
        ) {
            const selectedDateTime =
                new Date(selectedDate);

            selectedDateTime.setHours(
                Number(hourInput.value),
                Number(minuteInput.value),
                0,
                0
            );

            if (selectedDateTime <= now) {
                hourInput.value = '';
                minuteInput.value = '';

                showMessage(
                    'error',
                    'Veuillez sélectionner une heure future.'
                );

                return false;
            }
        }

        return true;
    }

    function validateForm() {
        const fullName =
            document
                .getElementById('full-name')
                .value
                .trim();

        const phone =
            phoneInput.value.trim();

        const service =
            document.getElementById('service').value;

        if (fullName.length < 2) {
            throw new Error(
                'Veuillez entrer un nom valide.'
            );
        }

        if (!/^\d{10}$/.test(phone)) {
            throw new Error(
                'Numéro de téléphone invalide. Utilisez 10 chiffres.'
            );
        }

        if (!service) {
            throw new Error(
                'Veuillez sélectionner un service.'
            );
        }

        if (!dateInput.value) {
            throw new Error(
                'Veuillez sélectionner une date.'
            );
        }

        if (
            !hourInput.value ||
            !minuteInput.value
        ) {
            throw new Error(
                'Veuillez sélectionner une heure.'
            );
        }

        if (!validateDate() || !validateTime()) {
            throw new Error(
                "Veuillez vérifier la date et l'heure sélectionnées."
            );
        }
    }

    phoneInput.addEventListener('input', function () {
        this.value =
            this.value
                .replace(/\D/g, '')
                .slice(0, 10);
    });

    dateInput.addEventListener('change', () => {
        validateDate();

        hourInput.value = '';
        minuteInput.value = '';
    });

    hourInput.addEventListener('change', () => {
        if (dateInput.value && minuteInput.value) {
            validateTime();
        }
    });

    minuteInput.addEventListener('change', () => {
        if (dateInput.value && hourInput.value) {
            validateTime();
        }
    });

    form.addEventListener('submit', event => {
        event.preventDefault();

        try {
            validateForm();

            const time =
                `${hourInput.value.padStart(2, '0')}:` +
                `${minuteInput.value.padStart(2, '0')}`;

            showMessage(
                'info',
                `Parcours validé en mode démonstration pour le ` +
                `${dateInput.value} à ${time}. ` +
                `Aucune réservation n'a été envoyée et aucune donnée ` +
                `n'a été transmise à un backend.`
            );

            form.reset();
        } catch (error) {
            showMessage(
                'error',
                error.message
            );
        }
    });

    const today = new Date();

    dateInput.min =
        formatDate(today);

    const maxDate = new Date(
        today.getFullYear(),
        today.getMonth() + 3,
        today.getDate()
    );

    dateInput.max =
        formatDate(maxDate);

    const menuToggle =
        document.querySelector('.mobile-menu-toggle');

    const sidebar =
        document.querySelector('.mobile-sidebar');

    const overlay =
        document.querySelector('.mobile-menu-overlay');

    const closeButton =
        document.querySelector('.mobile-menu-close');

    if (menuToggle && sidebar && overlay) {
        menuToggle.addEventListener('click', event => {
            event.stopPropagation();

            sidebar.classList.add('active');
            overlay.style.display = 'block';
        });
    }

    if (closeButton && sidebar && overlay) {
        closeButton.addEventListener('click', event => {
            event.stopPropagation();

            sidebar.classList.remove('active');
            overlay.style.display = 'none';
        });
    }

    if (overlay && sidebar) {
        overlay.addEventListener('click', () => {
            sidebar.classList.remove('active');
            overlay.style.display = 'none';
        });
    }
});