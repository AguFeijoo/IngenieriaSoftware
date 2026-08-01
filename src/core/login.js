// ---------- LOGIN ---------- //
function login(user, password){
    let result = true;

    if(user != "admin" || password != "admin123"){
        result = false;
    } else {
        result = true;
    }

    return result;
}

if (typeof module !== "undefined") { module.exports = { login }; }
// ---------- LOGIN ---------- //