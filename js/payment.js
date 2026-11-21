document.addEventListener("DOMContentLoaded", function(){

console.log("payment working");

let loggedUser = JSON.parse(localStorage.getItem("loggedUser"));

if(!loggedUser){
  alert("Please login first");
  location.href = "login.html";
  return;
}


// عرض الرحلات

let cartKey = `cart_${loggedUser.username}`;

let cart = JSON.parse(localStorage.getItem(cartKey)) || [];

let paymentTrips = document.getElementById("paymentTrips");

let finalTotal = document.getElementById("finalTotal");

let total = 0;


cart.forEach(item => {

 total += Number(item.total);

 paymentTrips.innerHTML += `

   <div class="trip">

     <h3>${item.title}</h3>

     <p>People: ${item.people}</p>

     <p>Total: $${item.total}</p>

   </div>

 `;

});

document.getElementById("tripCount").innerText =
"Trips: " + cart.length;
totalPrice.innerText = "Final Total: $" + total;



// تاكيد الدفع

window.confirmPayment = function() {
    let name = document.getElementById("cardName").value;
    let number = document.getElementById("cardNumber").value;
    let expiry = document.getElementById("expiry").value;
    let cvv = document.getElementById("cvv").value;

    // التحقق من البيانات
    if(name.length < 3){ alert("Enter valid name"); return; }
    if(!/^[0-9]{16}$/.test(number.replace(/\s/g,''))){ alert("Card number must be 16 digits"); return; }
    if(!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry)){ alert("Enter valid expiry date MM/YY"); return; }
    if(!/^[0-9]{3}$/.test(cvv)){ alert("CVV must be 3 digits"); return; }

    alert("Payment Successful ✅");

    // حفظ الطلب
    localStorage.setItem(`orders_${loggedUser.username}`, JSON.stringify(cart));

    // مسح السلة
    localStorage.removeItem(cartKey);
    cart = []; // امسح المتغير محليًا

    // تحديث واجهة المستخدم قبل التحويل
    paymentTrips.innerHTML = "";
    totalPrice.innerText = "Final Total: $0";
    document.getElementById("tripCount").innerText = "Trips: 0";

    // إعطاء وقت قصير قبل التحويل عشان يظهر التحديث (اختياري 100ms)
    setTimeout(() => {
        location.href = "index.html";
    }, 100);
}



});
