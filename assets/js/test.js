document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('reservation-form');
    const submitBtn = form.querySelector('button[type="submit"]');
    const dateInput = document.getElementById('date');
    const hourInput = document.getElementById('hour');
    const minuteInput = document.getElementById('minute');
    const phoneInput = document.getElementById('phone');

    // Time restrictions for different days of the week
    const timeRestrictions = {
        1: { // Monday
            start: '09:30',
            end: '19:00'
        },
        2: { // Tuesday
            start: '09:30',
            end: '19:00'
        },
        3: { // Wednesday
            start: '09:30',
            end: '19:00'
        },
        4: { // Thursday
            start: '09:30',
            end: '19:00'
        },
        5: { // Friday
            morning: { start: '09:30', end: '13:00' },
            afternoon: { start: '14:00', end: '19:00' }
        },
        6: { // Saturday
            start: '09:30',
            end: '19:00'
        },
        0: { // Sunday
            start: '09:30',
            end: '16:00'
        }
    };

    // Set minimum and maximum date restrictions
    function setDateRestrictions() {
        const today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const yyyy = today.getFullYear();

        // Set minimum date to today
        const minDate = `${yyyy}-${mm}-${dd}`;
        dateInput.setAttribute('min', minDate);

        // Set maximum date to 3 months from now
        const maxDate = new Date(today.getFullYear(), today.getMonth() + 3, today.getDate());
        const maxDd = String(maxDate.getDate()).padStart(2, '0');
        const maxMm = String(maxDate.getMonth() + 1).padStart(2, '0');
        const maxYyyy = maxDate.getFullYear();
        
        const maxDateString = `${maxYyyy}-${maxMm}-${maxDd}`;
        dateInput.setAttribute('max', maxDateString);
    }

    // Create modal if it doesn't exist
    function createModal() {
        if (document.getElementById('reservationModal')) {
            return;
        }

        const modalHtml = `
            <div class="modal fade" id="reservationModal" tabindex="-1" role="dialog" aria-labelledby="reservationModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="reservationModalLabel">Notification</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body" id="reservationModalBody">
                            <!-- Modal content will be dynamically inserted here -->
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Fermer</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        const modalContainer = document.createElement('div');
        modalContainer.innerHTML = modalHtml;
        document.body.appendChild(modalContainer.firstChild);
    }

    // Show modal function with improved error handling
    function showModal(type, message) {
        createModal();

        const modalBody = document.getElementById('reservationModalBody');
        const modalTitle = document.getElementById('reservationModalLabel');

        if (!modalBody || !modalTitle) {
            alert(message);
            return;
        }

        modalTitle.textContent = type === 'success' ? 'Réservation Confirmée' : 'Erreur';
        modalBody.innerHTML = `
            <div class="text-center">
                <i class="fas fa-${type === 'success' ? 'check' : 'times'}-circle text-${type === 'success' ? 'success' : 'danger'} mb-3" style="font-size: 3rem;"></i>
                <p>${message}</p>
            </div>
        `;

        // Fallback modal display
        const modal = document.getElementById('reservationModal');
        if (window.jQuery && $('#reservationModal').modal) {
            $('#reservationModal').modal('show');
        } else if (modal) {
            modal.style.display = 'block';
            modal.classList.add('show');
        } else {
            alert(message);
        }
    }

    // Validate selected date
    function validateDate() {
        const selectedDate = new Date(dateInput.value);
        const today = new Date();
        
        // Remove time component for accurate comparison
        today.setHours(0, 0, 0, 0);
        selectedDate.setHours(0, 0, 0, 0);

        // Check if selected date is before today
        if (selectedDate < today) {
            dateInput.value = ''; // Clear invalid date
            showModal('error', 'Veuillez sélectionner une date valide à partir d\'aujourd\'hui.');
            return false;
        }

        return true;
    }

    // Validate time based on day-specific restrictions
    function validateTime() {
        const selectedDate = new Date(dateInput.value);
        const dayOfWeek = selectedDate.getDay(); // 0 (Sunday) to 6 (Saturday)
        const hour = hourInput.value;
        const minute = minuteInput.value;
        const timeString = formatTime(hour, minute);

        const restrictions = timeRestrictions[dayOfWeek];

        // Special handling for Friday
        if (dayOfWeek === 5) { // Friday
            const isMorningValid = timeString >= restrictions.morning.start && timeString <= restrictions.morning.end;
            const isAfternoonValid = timeString >= restrictions.afternoon.start && timeString <= restrictions.afternoon.end;

            if (!isMorningValid && !isAfternoonValid) {
                hourInput.value = '';
                minuteInput.value = '';
                showModal('error', 'Vendredi : réservations possibles de 9h30 à 13h ou de 14h à 19h.');
                return false;
            }
        } else {
            // For other days
            if (timeString < restrictions.start || timeString > restrictions.end) {
                hourInput.value = '';
                minuteInput.value = '';
                showModal('error', `Les réservations sont possibles de ${restrictions.start} à ${restrictions.end} ce jour.`);
                return false;
            }
        }

        // Additional existing time validation
        const today = new Date();
        if (selectedDate.toDateString() === today.toDateString()) {
            const currentTime = new Date();
            const selectedDateTime = new Date(selectedDate);
            selectedDateTime.setHours(parseInt(hour), parseInt(minute), 0, 0);

            if (selectedDateTime <= currentTime) {
                hourInput.value = '';
                minuteInput.value = '';
                showModal('error', 'Veuillez sélectionner une heure future.');
                return false;
            }
        }

        return true;
    }

    // Dynamically populate hour and minute options based on day restrictions
    function populateTimeOptions() {
        const selectedDate = new Date(dateInput.value);
        const dayOfWeek = selectedDate.getDay();
        const restrictions = timeRestrictions[dayOfWeek];

        hourInput.innerHTML = ''; // Clear existing options
        minuteInput.innerHTML = ''; // Clear existing options

        // Add default placeholder
        const defaultHourOption = document.createElement('option');
        defaultHourOption.value = '';
        defaultHourOption.textContent = 'Heure';
        hourInput.appendChild(defaultHourOption);

        // Special handling for Friday
        if (dayOfWeek === 5) { // Friday
            addTimeOptionsForPeriod(restrictions.morning.start, restrictions.morning.end);
            addTimeOptionsForPeriod(restrictions.afternoon.start, restrictions.afternoon.end);
        } else {
            addTimeOptionsForPeriod(restrictions.start, restrictions.end);
        }
    }

    // Helper function to add time options for a specific period
    function addTimeOptionsForPeriod(startTime, endTime) {
        const [startHour, startMinute] = startTime.split(':').map(Number);
        const [endHour, endMinute] = endTime.split(':').map(Number);

        for (let hour = startHour; hour <= endHour; hour++) {
            const hourStr = hour.toString().padStart(2, '0');
            
            // Determine minute range
            const minStart = (hour === startHour) ? startMinute : 0;
            const minEnd = (hour === endHour) ? endMinute : 59;

            for (let minute = minStart; minute <= minEnd; minute += 30) {
                const minuteStr = minute.toString().padStart(2, '0');
                
                const option = document.createElement('option');
                option.value = minuteStr;
                option.textContent = minuteStr;
                minuteInput.appendChild(option);
            }
        }
    }

    // Validate inputs before submission
    function validateInputs() {
        const fullName = document.getElementById('full-name').value.trim();
        const phone = phoneInput.value.trim();
        const service = document.getElementById('service').value;
        const date = dateInput.value;
        const hour = hourInput.value;
        const minute = minuteInput.value;

        if (fullName.length < 2) {
            throw new Error('Veuillez entrer un nom valide.');
        }

        if (!/^\d{10}$/.test(phone)) {
            throw new Error('Numéro de téléphone invalide. Utilisez 10 chiffres.');
        }

        if (!service) {
            throw new Error('Veuillez sélectionner un service.');
        }

        if (!date) {
            throw new Error('Veuillez sélectionner une date.');
        }

        if (!hour || !minute) {
            throw new Error('Veuillez sélectionner une heure et des minutes.');
        }

        return { fullName, phone, service, date, hour, minute };
    }

    // Format time consistently
    function formatTime(hour, minute) {
        return `${hour.padStart(2, '0')}:${minute.padStart(2, '0')}`;
    }

    // Check reservation availability
    async function checkAvailability(date, time) {
        try {
            const response = await fetch('http://localhost:5000/api/reservations');
            
            if (!response.ok) {
                throw new Error('Impossible de vérifier les disponibilités');
            }

            const existingReservations = await response.json();
            
            return !existingReservations.some(reservation => 
                reservation.date === date && reservation.time === time
            );
        } catch (error) {
            console.error('Error checking availability:', error);
            throw new Error('Erreur de vérification de disponibilité');
        }
    }

    // Submit reservation
    async function submitReservation(reservationData) {
        const response = await fetch('http://localhost:5000/api/reservations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(reservationData)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Erreur lors de la réservation');
        }

        return await response.json();
    }

    // Create modal on page load
    createModal();

    // Phone input validation
    phoneInput.addEventListener('input', function(e) {
        this.value = this.value.replace(/\D/g, '').slice(0, 10);
    });

    // Add event listeners for date and time validation
    dateInput.addEventListener('change', function() {
        validateDate();
        
        // Reset time inputs and populate options when date changes
        hourInput.value = '';
        minuteInput.value = '';
        populateTimeOptions();
    });

    hourInput.addEventListener('change', function() {
        if (dateInput.value) {
            validateTime();
        }
    });

    minuteInput.addEventListener('change', function() {
        if (dateInput.value) {
            validateTime();
        }
    });

    // Form submission event listener
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
            <div class="loader-container">
                <div class="loader"></div>
                Vérification en cours...
            </div>
        `;

        try {
            // Validate inputs
            const { fullName, phone, service, date, hour, minute } = validateInputs();
            
            // Additional date and time validation
            if (!validateDate() || !validateTime()) {
                throw new Error('Veuillez vérifier la date et l\'heure sélectionnées.');
            }

            const time = formatTime(hour, minute);

            // Check availability
            const isAvailable = await checkAvailability(date, time);
            if (!isAvailable) {
                throw new Error('Ce créneau est déjà réservé. Veuillez choisir un autre horaire.');
            }

            // Prepare and submit reservation
            const reservationData = {
                name: fullName,
                phone: phone,
                date: date,
                time: time,
                service: service
            };

            const result = await submitReservation(reservationData);

            // Success handling
            showModal('success', `Votre réservation a été confirmée !<br>Détails :<br>Date : ${date}<br>Heure : ${time}`);
            form.reset();

        } catch (error) {
            // Error handling
            showModal('error', error.message);
        } finally {
            // Restore submit button
            submitBtn.disabled = false;
            submitBtn.innerHTML = `
                <i class="fas fa-calendar-check"></i> Confirmer ma réservation
            `;
        }
    });

    // Set date restrictions on page load
    setDateRestrictions();

    // Optional: Add CSS for loader
    const loaderStyle = document.createElement('style');
    loaderStyle.textContent = `
        .loader-container {
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .loader {
            border: 4px solid #f3f3f3;
            border-top: 4px solid #3D2B1F;
            border-radius: 50%;
            width: 20px;
            height: 20px;
            animation: spin 1s linear infinite;
            margin-right: 10px;
        }
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(loaderStyle);
});