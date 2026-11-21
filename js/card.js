// 1️⃣ جلب المستخدم الحالي
let loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
if(!loggedUser) {
  alert("Please log in first!");
}

// 2️⃣ مفتاح cart الخاص بالمستخدم
let cartKey = loggedUser ? `cart_${loggedUser.username}` : "cart_guest";

// 3️⃣ عناصر الصفحة
const content = document.getElementById("cartContent");
const sidebarTrips = document.querySelector(".sidebar p:first-of-type");
const sidebarTotal = document.querySelector(".sidebar strong");

// 4️⃣ دالة عرض الكارد
function renderCart() {
  let cart = JSON.parse(localStorage.getItem(cartKey)) || [];
  let totalAll = 0;

  content.innerHTML = ""; // 🛑 امسح المحتوى القديم قبل العرض

  cart.forEach((item, index) => {
    totalAll += Number(item.total || item.price);

    content.innerHTML += `
    <div class="tour-card">
        <img src="${item.image}">
        <div class="tour-info">
            <span class="tag">Booked</span>
            <h2>${item.title}</h2>
            <p>📅 التاريخ: ${item.date || "-"}</p>
            <p>👤 الأشخاص: ${item.people || "-"}</p>
            <p>📍 ${item.location}</p>
            <button onclick="removeItem(${index})" class="btn-remove">حذف</button>
        </div>
        <div class="tour-price">
            <p class="price"><span>$${item.total || item.price}</span></p>
        </div>
    </div>
    `;
  });

  // 5️⃣ تحديث sidebar
  sidebarTrips.innerText = "عدد الرحلات: " + cart.length;
  sidebarTotal.innerText = "$" + totalAll;

  // 6️⃣ تحديث عداد السلة في navbar
  if(typeof updateCartCount === "function") {
    updateCartCount();
  }
}

// 7️⃣ حذف رحلة
function removeItem(index) {
  let cart = JSON.parse(localStorage.getItem(cartKey)) || [];
  cart.splice(index, 1); // حذف العنصر
  localStorage.setItem(cartKey, JSON.stringify(cart));
  renderCart(); // تحديث العرض بعد الحذف
}

// 8️⃣ استدعاء الدالة لأول مرة
renderCart();

//الدفع
function goToPayment(){

let loggedUser = JSON.parse(localStorage.getItem("loggedUser"));

if(!loggedUser){

 alert("Please login first");

 return;

}

let cartKey = `cart_${loggedUser.username}`;

let cart = JSON.parse(localStorage.getItem(cartKey)) || [];

if(cart.length === 0){

 alert("Cart is empty");

 return;

}

// يروح لصفحة الدفع
window.location.href = "payment.html";

}
