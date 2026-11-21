document.getElementById("loginForm").addEventListener("submit", function(e){
    e.preventDefault();

    let email = document.getElementById("logEmail").value.trim();
    let password = document.getElementById("logPassword").value.trim();

    let emailError = document.getElementById("emailError");
    let passError = document.getElementById("passError");

    emailError.innerText = "";
    passError.innerText = "";

    let users = JSON.parse(localStorage.getItem("users")) || [];

    let user = users.find(u => u.email === email);

    if(!user){
        emailError.innerText = "Email not registered!";
        return;
    }

    if(user.password !== password){
        passError.innerText = "Incorrect password!";
        return;
    }

    // 🔥 هنا الحل
    localStorage.setItem("loggedUser", JSON.stringify(user));

    alert("Login Successful 🎉");
    window.location.href = "index.html";
});
