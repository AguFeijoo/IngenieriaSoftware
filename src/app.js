// ---------- BOTONES ---------- //
let btnLogin = document.querySelector("#btnLogin");
let btnSendReview = document.querySelector("#btnSend");
// ---------- BOTONES ---------- //

// ---------- LOGIN ---------- //
if (btnLogin != null) {
    btnLogin.addEventListener("click", preLogin);
}

function preLogin(){
    let user = document.querySelector("#txtUser").value;
    let password = document.querySelector("#txtPassword").value;

    let result = login(user, password);

    if(!result){
        document.querySelector("#msgAlert").innerHTML = "Usuario o contraseña incorrectos";
    } else {
        localStorage.setItem("loggedIn", "true");
        window.location.href = "adminDashboard.html";
    }
}
// ---------- LOGIN ---------- //

// ---------- REVIEW ---------- //
if (btnSendReview != null) {
    btnSendReview.addEventListener("click", preReview);
}

function preReview() {
    let name = document.querySelector("#txtName").value;
    let rating = document.querySelector("#slcRating").value;
    let comment = document.querySelector("#txtComment").value;

    let review = addReview(name, rating, comment);

    if (review == null) {
        document.querySelector("#msgReviewAlert").innerHTML = "Complete los campos obligatorios";
    } else {
        let reviews = JSON.parse(localStorage.getItem("reviews"));

        if (reviews == null) {
            reviews = [];
        }

        reviews.push(review);

        localStorage.setItem("reviews", JSON.stringify(reviews));

        document.querySelector("#msgReviewAlert").innerHTML = "Opinión enviada correctamente";
    }
}
// ---------- REVIEW ---------- //