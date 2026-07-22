// ---------- LOGIN ---------- //
document.querySelector("#btnLogin").addEventListener("click", preLogin);

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