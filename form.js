const form = document.getElementById("regForm");
const inputs = form.querySelectorAll("input, select");
const submitBtn = document.getElementById("submitBtn");

submitBtn.addEventListener("click", (e) => {
    let valid = true;

    inputs.forEach(input => {
        const feedback = input.nextElementSibling; // get invalid-feedback div
        if (!input.checkValidity()) {
            input.classList.add("is-invalid");
            input.classList.remove("is-valid");
            if (feedback) feedback.classList.add("show-feedback");
            valid = false;
        } else {
            input.classList.add("is-valid");
            input.classList.remove("is-invalid");
            if (feedback) feedback.classList.remove("show-feedback");
        }
    });

    if (valid) {
        e.preventDefault(); // stop default submit
        Swal.fire({
            icon: "success",
            title: "Good job!",
            text: "All fields are valid ",
            confirmButtonColor: '#b84214'
        }).then(() => {
            // ✅ Redirect if valid
            form.action = "../../ADMIN/INTERFACE/confirm.php";
            form.submit();
        });
    } else {
        e.preventDefault();
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Please fill all required fields!",
            confirmButtonColor: '#b84214'
        });
    }
});

// 🔹 Handle URL error message from PHP redirect
const error = new URLSearchParams(window.location.search);
if (error.get("error") === "booked") {
    Swal.fire({
        icon: "error",
        title: "Booking Failed",
        text: "Someone already booked the same Time at the same Date.",
        confirmButtonColor: '#b84214'
    });
    error.delete("error");
    const newUrl = window.location.pathname + (error.toString() ? "?" + error.toString() : "");
    window.history.replaceState({}, document.title, newUrl);
}

$(document).ready(function() {
    $("#regForm").submit(function(e) {
        e.preventDefault();
        $.ajax({
            url: "../../ADMIN/BACKEND/SERVER/client_server.php",
            method: "POST",
            data: $(this).serialize(),

            error: function() {
                alert("AJAX error.");
            }
        });
    });
});