document.getElementById("registerForm").addEventListener("submit", function(e){
    e.preventDefault(); // منع الفورم من الريفريش

    // 1️⃣ قراءة القيم من الفورم
    let username = document.getElementById("username").value.trim();
    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value.trim();
    let confirmPassword = document.getElementById("confirmPassword").value.trim();

    // 2️⃣ العناصر الخاصة بالرسائل
    let userError = document.getElementById("userError");
    let emailError = document.getElementById("emailError");
    let passError = document.getElementById("passError");
    let confirmError = document.getElementById("confirmError");

    let valid = true;

    // 3️⃣ Validation

    // Username validation
    let userPattern = /^[a-zA-Z0-9]{3,}$/;
    if(!username.match(userPattern)){
        userError.innerText = "Username must be at least 3 letters with no spaces!";
        valid = false;
    } else userError.innerText = "";

    // Email validation
    let emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if(!email.match(emailPattern)){
        emailError.innerText = "Enter a valid email!";
        valid = false;
    } else emailError.innerText = "";

    // Password validation
    let passPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if(!password.match(passPattern)){
        passError.innerText = "Password must be 8 chars and include capital, small & number!";
        valid = false;
    } else passError.innerText = "";

    // Confirm password
    if(password !== confirmPassword){
        confirmError.innerText = "Passwords do not match!";
        valid = false;
    } else confirmError.innerText = "";

    // 4️⃣ لو في أي خطأ نوقف الفورم
    if(!valid) return;

    // ------------------ التخزين والتحقق من الإيميل ------------------
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // التحقق إذا الإيميل موجود
    let emailExists = users.some(user => user.email === email);

    if(emailExists){
        emailError.innerText = "Email already registered!";
        return;
    }

    // إضافة المستخدم الجديد
    let newUser = {
        username: username,
        email: email,
        password: password
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    alert("Registered Successfully 🎉");
    window.location.href = "login.html";
    document.getElementById("registerForm").reset();

});
