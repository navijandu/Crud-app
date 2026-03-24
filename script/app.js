let serialNo = 1;
let queueNo = 1001;

const registrationForm = document.getElementById("registrationForm");
const tableBody = document.getElementById("tableBody");

registrationForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const firstName = document.getElementById("fname").value.trim();
    const lastName = document.getElementById("lname").value.trim();
    const ageInput = document.getElementById("age");
    const age = parseInt(ageInput.value, 10);
    const genderElement = document.querySelector('input[name="gender"]:checked');

    if (!firstName) {
        showErrorPopup("First name is required.");
        document.getElementById("fname").focus();
        return;
    }

    if (!lastName) {
        showErrorPopup("Last name is required.");
        document.getElementById("lname").focus();
        return;
    }

    if (Number.isNaN(age)) {
        showErrorPopup("Please enter a valid age.");
        ageInput.focus();
        return;
    }

    if (age < 1 || age > 150) {
        showErrorPopup("Age must be between 1 and 150.");
        ageInput.focus();
        return;
    }

    if (!genderElement) {
        showErrorPopup("Please select gender.");
        return;
    }

    removeEmptyRow();

    const currentQueueNo = queueNo;

    const row = document.createElement("tr");

    row.innerHTML = `
        <td></td>
        <td><span class="queue-badge">Q-${currentQueueNo}</span></td>
        <td>${firstName}</td>
        <td>${lastName}</td>
        <td>${age}</td>
        <td>${genderElement.value}</td>
        <td><span class="badge-status">Registered</span></td>
        <td>
            <button type="button" class="btn btn-danger btn-sm btn-delete delete-btn">
                Delete
            </button>
        </td>
    `;

    row.setAttribute("data-queue", currentQueueNo);
    tableBody.appendChild(row);

    queueNo++;
    registrationForm.reset();
    updateSerialNumbers();

    showSuccessPopup(currentQueueNo, firstName, lastName);
});

tableBody.addEventListener("click", function (e) {
    if (e.target.classList.contains("delete-btn")) {
        const row = e.target.closest("tr");
        if (!row) return;

        const queueValue = row.getAttribute("data-queue");

        Swal.fire({
            title: "Delete record?",
            text: `Queue Number Q-${queueValue} will be removed.`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete",
            cancelButtonText: "Cancel",
            reverseButtons: true,
            backdrop: true,
            allowOutsideClick: false,
            showClass: {
                popup: "animate__animated animate__fadeInDown"
            },
            hideClass: {
                popup: "animate__animated animate__fadeOutUp"
            }
        }).then((result) => {
            if (result.isConfirmed) {
                row.remove();
                updateSerialNumbers();
                showEmptyRowIfNeeded();

                Swal.fire({
                    icon: "success",
                    title: "Deleted",
                    text: `Queue Number Q-${queueValue} has been removed.`,
                    timer: 1800,
                    showConfirmButton: false,
                    showClass: {
                        popup: "animate__animated animate__zoomIn"
                    },
                    hideClass: {
                        popup: "animate__animated animate__zoomOut"
                    }
                });
            }
        });
    }
});

function updateSerialNumbers() {
    const rows = tableBody.querySelectorAll("tr:not(#emptyRow)");
    serialNo = 1;

    rows.forEach((row) => {
        row.cells[0].textContent = serialNo++;
    });
}

function removeEmptyRow() {
    const emptyRow = document.getElementById("emptyRow");
    if (emptyRow) {
        emptyRow.remove();
    }
}

function showEmptyRowIfNeeded() {
    const rows = tableBody.querySelectorAll("tr:not(#emptyRow)");
    if (rows.length === 0) {
        const emptyRow = document.createElement("tr");
        emptyRow.id = "emptyRow";
        emptyRow.innerHTML = `
            <td colspan="8" class="empty-state">No registrations yet.</td>
        `;
        tableBody.appendChild(emptyRow);
    }
}

function showSuccessPopup(queueNumber, firstName, lastName) {
    Swal.fire({
        icon: "success",
        title: "Added to Queue",
        html: `
            <strong>${firstName} ${lastName}</strong><br>
            You have been added to the queue.<br><br>
            <span style="font-size: 1.1rem; font-weight: 700; color: #2563eb;">
                Queue Number: Q-${queueNumber}
            </span>
        `,
        confirmButtonText: "OK",
        allowOutsideClick: false,
        showClass: {
            popup: "animate__animated animate__bounceIn"
        },
        hideClass: {
            popup: "animate__animated animate__fadeOut"
        }
    });
}

function showErrorPopup(message) {
    Swal.fire({
        icon: "error",
        title: "Oops...",
        text: message,
        confirmButtonText: "Try Again",
        allowOutsideClick: false,
        showClass: {
            popup: "animate__animated animate__shakeX"
        },
        hideClass: {
            popup: "animate__animated animate__fadeOut"
        }
    });
}