console.log("JS working");

function loadComponent(id, file) {
  fetch(file)
    .then(res => res.text())
    .then(data => {
      const el = document.getElementById(id);
      if (el) {
        el.innerHTML = data;

        // 🔥 مهم جدًا
        if (id === "nafbar") {
          // استدعاء كل تحديثات النافبار بعد التحميل
          setTimeout(() => {
            updateNavbar();
            updateCartCount();  // ✅ عداد السلة
          }, 100);
        }

      } else {
        console.error("Element not found:", id);
      }
    });
}

loadComponent("nafbar", "nafbar.html");
loadComponent("footer", "footer.html");

function updateNavbar() {
  let loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
  console.log("Logged User:", loggedUser);

  if (!loggedUser) return;

  let authLinks = document.getElementById("authLinks");
  let userSection = document.getElementById("userSection");
  let userCircle = document.getElementById("userCircle");
  let logoutBtn = document.getElementById("logoutBtn");

  if (!authLinks || !userSection) {
    console.log("Navbar elements not found");
    return;
  }

  authLinks.style.display = "none";
  userSection.style.display = "flex";

  userCircle.textContent = loggedUser.username.charAt(0).toUpperCase();

  logoutBtn.addEventListener("click", function (e) {
    e.preventDefault();
    localStorage.removeItem("loggedUser");
    location.reload();
  });
}

// ✅ دالة تحديث عداد السلة
function updateCartCount() {
  let loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
  if(!loggedUser) return;

  let cartKey = `cart_${loggedUser.username}`;
  let cart = JSON.parse(localStorage.getItem(cartKey)) || [];
  let count = document.getElementById("cart-count");

  if(count){
    count.innerText = cart.length;
  }
}
